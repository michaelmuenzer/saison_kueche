import { ScrollView, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PrimaryButton, SecondaryButton } from "@/components/recipe-components";
import {
  Region,
  regions,
  getCurrentSeason,
  getRandomRecipeBySeasonAndRegion,
  Recipe,
} from "@/lib/recipes-database";
import { SeasonBadge } from "@/components/recipe-components";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<Region>("Bavaria");
  const [isGenerating, setIsGenerating] = useState(false);
  const currentSeason = getCurrentSeason();

  const handleGenerateRecipe = async () => {
    setIsGenerating(true);
    // Simulate a brief loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const recipe = getRandomRecipeBySeasonAndRegion(currentSeason, selectedRegion);

    setIsGenerating(false);

    if (recipe) {
      // Navigate to recipe detail screen with the generated recipe
      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeId: recipe.id,
          recipeData: JSON.stringify(recipe),
        },
      });
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-8 pb-8">
          {/* Hero Section */}
          <View className="gap-4 pt-4">
            <Text className="text-4xl font-bold text-foreground">
              SaisonKüche
            </Text>
            <Text className="text-base text-muted leading-relaxed">
              Discover authentic German recipes based on seasonal ingredients from your favorite region.
            </Text>
          </View>

          {/* Current Season Display */}
          <View className="bg-surface rounded-2xl p-6 border border-border gap-3">
            <Text className="text-sm text-muted uppercase tracking-wide">
              Current Season
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-foreground">
                {currentSeason}
              </Text>
              <SeasonBadge season={currentSeason} />
            </View>
            <Text className="text-sm text-muted">
              Recipes featuring seasonal ingredients available now
            </Text>
          </View>

          {/* Region Selector */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Select Your Region
            </Text>
            <View className="gap-2">
              {regions.map((region) => (
                <Pressable
                  key={region}
                  onPress={() => setSelectedRegion(region)}
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

          {/* Region Description */}
          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-xs text-muted uppercase tracking-wide mb-2">
              About This Region
            </Text>
            <Text className="text-sm text-foreground leading-relaxed">
              {selectedRegion === "Bavaria"
                ? "Known for hearty mountain cuisine, dairy products, and beer culture. Famous for Schnitzel, Spätzle, and Kaiserschmarrn."
                : selectedRegion === "Rhineland"
                  ? "A wine region with French influences. Specializes in Sauerbraten, Grüne Soße, and Rhine fish dishes."
                  : selectedRegion === "Northern"
                    ? "Maritime traditions with fresh fish, kale, and hearty stews. Home of Labskaus and Grünkohl mit Pinkel."
                    : selectedRegion === "Swabia"
                      ? "Known for Maultaschen (German ravioli) and Spätzle. Combines Italian and German culinary traditions."
                      : "Central German comfort food with potato dishes and hearty stews. Famous for Himmel und Erde."}
            </Text>
          </View>

          {/* Generate Button */}
          <View className="gap-3 pt-4">
            <PrimaryButton
              onPress={handleGenerateRecipe}
              title="Generate Recipe"
              loading={isGenerating}
            />
            <Text className="text-xs text-muted text-center">
              Get a random {currentSeason.toLowerCase()} recipe from {selectedRegion}
            </Text>
          </View>

          {/* AI Recipe Generator Button */}
          <View className="gap-3 pt-2">
            <SecondaryButton
              title="✨ Try AI Recipe Generator"
              onPress={() => router.push("/ai-recipe-generator")}
            />
            <Text className="text-xs text-muted text-center">
              Create unique recipes powered by AI
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
