import { ScrollView, Text, View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { RecipeCard } from "@/components/recipe-components";
import { useSavedRecipes } from "@/lib/saved-recipes-context";

export default function SavedRecipesScreen() {
  const router = useRouter();
  const { savedRecipes, isLoading } = useSavedRecipes();

  const handleRecipePress = (recipeId: string) => {
    const recipe = savedRecipes.find((r) => r.id === recipeId);
    if (recipe) {
      router.push({
        pathname: "/recipe-detail",
        params: {
          recipeId: recipe.id,
          recipeData: JSON.stringify(recipe),
        },
      });
    }
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">Loading saved recipes...</Text>
      </ScreenContainer>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <ScreenContainer className="p-4">
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-4xl">❤️</Text>
          <Text className="text-2xl font-bold text-foreground text-center">
            No Saved Recipes Yet
          </Text>
          <Text className="text-base text-muted text-center leading-relaxed">
            Generate recipes and save your favorites to see them here.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <View className="gap-2 mb-4">
        <Text className="text-3xl font-bold text-foreground">Saved Recipes</Text>
        <Text className="text-sm text-muted">
          {savedRecipes.length} recipe{savedRecipes.length !== 1 ? "s" : ""} saved
        </Text>
      </View>

      <FlatList
        data={savedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => handleRecipePress(item.id)}
          />
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}
