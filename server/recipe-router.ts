import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { Region, Season } from "../lib/recipes-database";

// Schema for AI recipe generation
const generateRecipeSchema = z.object({
  region: z.enum([
    "Bavaria",
    "Rhineland",
    "Northern",
    "Swabia",
    "Central",
  ] as const),
  season: z.enum(["Spring", "Summer", "Autumn", "Winter"] as const),
  dietaryRestrictions: z.string().optional(),
  cookingLevel: z.enum(["Easy", "Medium", "Hard"]).optional(),
});

// Helper function to create a prompt for recipe generation
function createRecipePrompt(
  region: Region,
  season: Season,
  dietaryRestrictions?: string,
  cookingLevel?: string
): string {
  const restrictions = dietaryRestrictions
    ? `\nDietary restrictions: ${dietaryRestrictions}`
    : "";
  const difficulty = cookingLevel
    ? `\nDifficulty level: ${cookingLevel}`
    : "Difficulty level: Medium";

  return `You are an expert German chef. Generate a unique, authentic ${season.toLowerCase()} recipe from the ${region} region of Germany.

${restrictions}${difficulty}

IMPORTANT: Return ONLY a valid JSON object (no markdown, no code blocks, no extra text) with this exact structure:
{
  "title": "Recipe Name in German",
  "description": "Brief description of the dish and its cultural significance",
  "servings": 4,
  "prepTime": 20,
  "cookTime": 45,
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": 2,
      "unit": "tbsp"
    }
  ],
  "instructions": [
    "Step 1",
    "Step 2"
  ]
}

Requirements:
- Use only seasonal ingredients available in ${season.toLowerCase()} in ${region}
- Include at least 8 ingredients
- Include at least 6 cooking steps
- Make it authentically ${region} German cuisine
- Include traditional cooking methods and flavors
- Ensure all measurements are realistic and practical
- The recipe should reflect ${season} traditions and available produce`;
}

// Helper function to parse and validate the LLM response
function parseRecipeResponse(content: string | (any)[]): {
  title: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: Array<{ name: string; quantity: number; unit: string }>;
  instructions: string[];
} {
  // Handle array content (shouldn't happen with json_object format)
  if (Array.isArray(content)) {
    throw new Error("Unexpected array content from LLM");
  }

  // Remove markdown code blocks if present
  let cleanContent = content.trim();
  if (cleanContent.startsWith("```json")) {
    cleanContent = cleanContent.replace(/^```json\n/, "").replace(/\n```$/, "");
  } else if (cleanContent.startsWith("```")) {
    cleanContent = cleanContent.replace(/^```\n/, "").replace(/\n```$/, "");
  }

  const parsed = JSON.parse(cleanContent);

  // Validate required fields
  if (
    !parsed.title ||
    !parsed.description ||
    !parsed.ingredients ||
    !parsed.instructions
  ) {
    throw new Error("Invalid recipe structure from LLM");
  }

  // Ensure ingredients and instructions are arrays
  if (!Array.isArray(parsed.ingredients)) {
    throw new Error("Ingredients must be an array");
  }
  if (!Array.isArray(parsed.instructions)) {
    throw new Error("Instructions must be an array");
  }

  // Validate ingredient structure
  for (const ingredient of parsed.ingredients) {
    if (
      !ingredient.name ||
      ingredient.quantity === undefined ||
      !ingredient.unit
    ) {
      throw new Error("Invalid ingredient structure");
    }
  }

  return {
    title: parsed.title,
    description: parsed.description,
    servings: parsed.servings || 4,
    prepTime: parsed.prepTime || 20,
    cookTime: parsed.cookTime || 45,
    ingredients: parsed.ingredients,
    instructions: parsed.instructions,
  };
}

export const recipeRouter = router({
  // Generate a new AI recipe
  generateAI: publicProcedure
    .input(generateRecipeSchema)
    .mutation(async ({ input }) => {
      try {
        const prompt = createRecipePrompt(
          input.region,
          input.season,
          input.dietaryRestrictions,
          input.cookingLevel
        );

        // Call the LLM with JSON schema for structured response
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are an expert German chef. Generate authentic German recipes in JSON format.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: { type: "json_object" },
        });

        // Extract content from response
        const content = response.choices?.[0]?.message?.content;

        if (!content) {
          throw new Error("No content in LLM response");
        }

        // Parse and validate the recipe
        const recipe = parseRecipeResponse(content);

        return {
          success: true,
          recipe: {
            id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: recipe.title,
            region: input.region,
            season: input.season,
            description: recipe.description,
            servings: recipe.servings,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            difficulty: input.cookingLevel || "Medium",
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            isAIGenerated: true,
          },
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Recipe generation error:", errorMessage);

        return {
          success: false,
          error: `Failed to generate recipe: ${errorMessage}`,
        };
      }
    }),
});
