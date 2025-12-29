import { ScrollView, Text, View, Share, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import {
  IconButton,
  InstructionsList,
  IngredientList,
  RecipeInfoRow,
  DifficultyIndicator,
  SeasonBadge,
  RegionBadge,
  SecondaryButton,
} from "@/components/recipe-components";
import { Recipe } from "@/lib/recipes-database";
import { useSavedRecipes } from "@/lib/saved-recipes-context";
import * as Haptics from "expo-haptics";

export default function RecipeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveRecipe, removeRecipe, isSaved } = useSavedRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isRecipeSaved, setIsRecipeSaved] = useState(false);

  useEffect(() => {
    if (params.recipeData) {
      const parsedRecipe = JSON.parse(params.recipeData as string);
      setRecipe(parsedRecipe);
      setIsRecipeSaved(isSaved(parsedRecipe.id));
    }
  }, [params.recipeData, isSaved]);

  if (!recipe) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Loading recipe...</Text>
      </ScreenContainer>
    );
  }

  const handleSaveRecipe = async () => {
    try {
      if (isRecipeSaved) {
        await removeRecipe(recipe.id);
        setIsRecipeSaved(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } else {
        await saveRecipe(recipe);
        setIsRecipeSaved(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  const handleShareRecipe = async () => {
    try {
      const shareText = `Check out this ${recipe.season} recipe from ${recipe.region}: ${recipe.title}\n\nIngredients:\n${recipe.ingredients.map((i) => `- ${i.quantity} ${i.unit} ${i.name}`).join("\n")}\n\nShared from SaisonKüche`;

      await Share.share({
        message: shareText,
        title: recipe.title,
      });
    } catch (error) {
      console.error("Error sharing recipe:", error);
    }
  };

  const handleGenerateAnother = () => {
    router.back();
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View className="flex-row items-center justify-between p-4 bg-surface border-b border-border">
          <Text className="text-lg font-bold text-foreground flex-1">Recipe</Text>
          <IconButton
            icon="✕"
            label="Close"
            onPress={() => router.back()}
          />
        </View>

        <View className="p-4 gap-6">
          {/* Recipe Title and Badges */}
          <View className="gap-3">
            <Text className="text-3xl font-bold text-foreground">
              {recipe.title}
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              <SeasonBadge season={recipe.season} />
              <RegionBadge region={recipe.region} />
            </View>
            <Text className="text-base text-muted leading-relaxed">
              {recipe.description}
            </Text>
          </View>

          {/* Recipe Info Grid */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-2">
            <RecipeInfoRow
              label="Prep Time"
              value={`${recipe.prepTime} min`}
            />
            <RecipeInfoRow
              label="Cook Time"
              value={`${recipe.cookTime} min`}
            />
            <RecipeInfoRow
              label="Total Time"
              value={`${recipe.prepTime + recipe.cookTime} min`}
            />
            <RecipeInfoRow label="Servings" value={recipe.servings} />
            <View className="pt-2 border-t border-border">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted">Difficulty</Text>
                <DifficultyIndicator difficulty={recipe.difficulty} />
              </View>
            </View>
          </View>

          {/* Ingredients Section */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">
              Ingredients
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border">
              <IngredientList ingredients={recipe.ingredients} />
            </View>
          </View>

          {/* Instructions Section */}
          <View className="gap-3">
            <Text className="text-xl font-bold text-foreground">
              Instructions
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border">
              <InstructionsList instructions={recipe.instructions} />
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 justify-between pt-4">
            <IconButton
              icon={isRecipeSaved ? "❤️" : "🤍"}
              label={isRecipeSaved ? "Saved" : "Save"}
              onPress={handleSaveRecipe}
            />
            <IconButton
              icon="📤"
              label="Share"
              onPress={handleShareRecipe}
            />
            <IconButton
              icon="🔄"
              label="Another"
              onPress={handleGenerateAnother}
            />
          </View>

          {/* Generate Another Button */}
          <SecondaryButton
            title="Generate Another Recipe"
            onPress={handleGenerateAnother}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
