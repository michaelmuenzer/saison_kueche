import { ScrollView, Text, View, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { PrimaryButton, SecondaryButton } from "@/components/recipe-components";
import {
  Region,
  regions,
  getCurrentSeason,
} from "@/lib/recipes-database";
import { useAIRecipe } from "@/hooks/use-ai-recipe";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";

export default function AIRecipeGeneratorScreen() {
  const router = useRouter();
  const currentSeason = getCurrentSeason();
  const [selectedRegion, setSelectedRegion] = useState<Region>("Bavaria");
  const [cookingLevel, setCookingLevel] = useState<"Easy" | "Medium" | "Hard">(
    "Medium"
  );
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>("");

  const { recipe, isLoading, error, generateRecipe } = useAIRecipe({
    region: selectedRegion,
    season: currentSeason,
    cookingLevel,
    dietaryRestrictions: dietaryRestrictions || undefined,
  });

  const handleGenerateAI = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await generateRecipe();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleViewRecipe = () => {
    if (recipe && recipe.id) {
      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeId: recipe.id,
          recipeData: JSON.stringify(recipe),
        },
      });
    }
  };

  if (recipe && recipe.id) {
    return (
      <ScreenContainer className="p-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-6 pb-8">
            {/* AI Generated Badge */}
            <View className="flex-row items-center gap-2 bg-primary/10 p-3 rounded-lg border border-primary">
              <Text className="text-lg">✨</Text>
              <Text className="text-sm font-semibold text-primary">
                AI-Generated Recipe
              </Text>
            </View>

            {/* Recipe Preview */}
            <View className="gap-3">
              <Text className="text-3xl font-bold text-foreground">
                {recipe.title}
              </Text>
              <Text className="text-base text-muted leading-relaxed">
                {recipe.description}
              </Text>
            </View>

            {/* Quick Stats */}
            <View className="bg-surface rounded-xl p-4 border border-border gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Prep Time</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {recipe.prepTime} min
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Cook Time</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {recipe.cookTime} min
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted">Servings</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {recipe.servings}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="gap-3 pt-4">
              <PrimaryButton
                title="View Full Recipe"
                onPress={handleViewRecipe}
              />
              <SecondaryButton
                title="Generate Another"
                onPress={() => {
                  // Reset recipe to show generator again
                  router.back();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              AI Recipe Generator
            </Text>
            <Text className="text-base text-muted leading-relaxed">
              Create unique German recipes powered by AI. Customize your preferences below.
            </Text>
          </View>

          {/* Region Selector */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Select Region
            </Text>
            <View className="gap-2">
              {regions.map((region) => (
                <Pressable
                  key={region}
                  onPress={() => {
                    setSelectedRegion(region);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  className={`p-4 rounded-xl border-2 ${
                    selectedRegion === region
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-base font-semibold ${
                      selectedRegion === region
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {region === "Bavaria"
                      ? "🏔️ Bavaria"
                      : region === "Rhineland"
                        ? "🍷 Rhineland"
                        : region === "Northern"
                          ? "⛵ Northern Germany"
                          : region === "Swabia"
                            ? "🥨 Swabia"
                            : "🌾 Central Germany"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Cooking Level */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Difficulty Level
            </Text>
            <View className="flex-row gap-2">
              {(["Easy", "Medium", "Hard"] as const).map((level) => (
                <Pressable
                  key={level}
                  onPress={() => {
                    setCookingLevel(level);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                      flex: 1,
                    },
                  ]}
                  className={`p-3 rounded-lg border ${
                    cookingLevel === level
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-center font-semibold ${
                      cookingLevel === level
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Dietary Restrictions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Dietary Preferences (Optional)
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-2">
              <Text className="text-xs text-muted uppercase tracking-wide">
                Examples: vegetarian, gluten-free, dairy-free
              </Text>
              <Text className="text-sm text-foreground">
                {dietaryRestrictions || "No restrictions selected"}
              </Text>
            </View>
            <View className="flex-row gap-2 flex-wrap">
              {[
                "Vegetarian",
                "Vegan",
                "Gluten-free",
                "Dairy-free",
                "Low-carb",
              ].map((restriction) => (
                <Pressable
                  key={restriction}
                  onPress={() => {
                    setDietaryRestrictions(
                      dietaryRestrictions === restriction
                        ? ""
                        : restriction
                    );
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  className={`px-3 py-2 rounded-full border ${
                    dietaryRestrictions === restriction
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      dietaryRestrictions === restriction
                        ? "text-white"
                        : "text-foreground"
                    }`}
                  >
                    {restriction}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Error Display */}
          {error && (
            <View className="bg-error/10 border border-error rounded-lg p-4">
              <Text className="text-sm text-error">{error}</Text>
            </View>
          )}

          {/* Generate Button */}
          <View className="gap-3 pt-4">
            {isLoading ? (
              <View className="bg-primary rounded-full py-3 items-center justify-center">
                <ActivityIndicator color="white" size="large" />
                <Text className="text-white font-semibold mt-2">
                  Creating your recipe...
                </Text>
              </View>
            ) : (
              <PrimaryButton
                title="Generate AI Recipe"
                onPress={handleGenerateAI}
              />
            )}
            <SecondaryButton
              title="Back"
              onPress={() => router.back()}
            />
          </View>

          {/* Info Box */}
          <View className="bg-surface rounded-xl p-4 border border-border gap-2">
            <Text className="text-xs text-muted uppercase tracking-wide">
              How it works
            </Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Our AI chef creates unique recipes based on your region, season, and preferences. Each recipe is authentic to German cuisine and uses seasonal ingredients.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
