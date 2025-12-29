import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Recipe, Region, Season } from "@/lib/recipes-database";

interface UseAIRecipeOptions {
  region: Region;
  season: Season;
  dietaryRestrictions?: string;
  cookingLevel?: "Easy" | "Medium" | "Hard";
}

interface AIRecipeResult {
  recipe: Recipe & { isAIGenerated: boolean };
  isLoading: boolean;
  error: string | null;
  generateRecipe: () => Promise<void>;
}

export function useAIRecipe(options: UseAIRecipeOptions): AIRecipeResult {
  const [recipe, setRecipe] = useState<(Recipe & { isAIGenerated: boolean }) | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMutation = trpc.recipe.generateAI.useMutation({
    onSuccess: (data) => {
      if (data.success && data.recipe) {
        setRecipe(data.recipe);
        setError(null);
      } else {
        setError(data.error || "Failed to generate recipe");
      }
      setIsLoading(false);
    },
    onError: (err) => {
      setError(err.message || "An error occurred while generating the recipe");
      setIsLoading(false);
    },
  });

  const generateRecipe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await generateMutation.mutateAsync({
        region: options.region,
        season: options.season,
        dietaryRestrictions: options.dietaryRestrictions,
        cookingLevel: options.cookingLevel,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return {
    recipe: recipe || ({} as Recipe & { isAIGenerated: boolean }),
    isLoading,
    error,
    generateRecipe,
  };
}
