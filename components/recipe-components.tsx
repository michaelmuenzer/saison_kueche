import { View, Text, Pressable, ScrollView } from "react-native";
import { Season, Region, Recipe, Ingredient } from "@/lib/recipes-database";
import { cn } from "@/lib/utils";
import * as Haptics from "expo-haptics";

// Season Badge Component
export function SeasonBadge({ season }: { season: Season }) {
  const seasonColors: Record<Season, string> = {
    Spring: "bg-[#A4D65E]",
    Summer: "bg-[#FFD700]",
    Autumn: "bg-[#E67E22]",
    Winter: "bg-[#5DADE2]",
  };

  const seasonTextColors: Record<Season, string> = {
    Spring: "text-[#2D5016]",
    Summer: "text-[#1A1A1A]",
    Autumn: "text-white",
    Winter: "text-white",
  };

  return (
    <View className={cn("px-3 py-1 rounded-full", seasonColors[season])}>
      <Text className={cn("text-xs font-semibold", seasonTextColors[season])}>
        {season}
      </Text>
    </View>
  );
}

// Region Badge Component
export function RegionBadge({ region }: { region: Region }) {
  return (
    <View className="px-3 py-1 rounded-full bg-surface border border-border">
      <Text className="text-xs font-semibold text-foreground">{region}</Text>
    </View>
  );
}

// Difficulty Indicator Component
export function DifficultyIndicator({
  difficulty,
}: {
  difficulty: "Easy" | "Medium" | "Hard";
}) {
  const difficultyColors: Record<string, string> = {
    Easy: "bg-success",
    Medium: "bg-warning",
    Hard: "bg-error",
  };

  const dots = difficulty === "Easy" ? 1 : difficulty === "Medium" ? 2 : 3;

  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-row gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <View
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i < dots ? difficultyColors[difficulty] : "bg-border"
            )}
          />
        ))}
      </View>
      <Text className="text-xs text-muted">{difficulty}</Text>
    </View>
  );
}

// Ingredient List Component
export function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <View className="gap-2">
      {ingredients.map((ingredient, index) => (
        <View key={index} className="flex-row items-center gap-3">
          <View className="w-1.5 h-1.5 rounded-full bg-primary" />
          <Text className="flex-1 text-base text-foreground">
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </Text>
        </View>
      ))}
    </View>
  );
}

// Instructions List Component
export function InstructionsList({ instructions }: { instructions: string[] }) {
  return (
    <View className="gap-3">
      {instructions.map((instruction, index) => (
        <View key={index} className="flex-row gap-3">
          <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
            <Text className="text-xs font-bold text-background">
              {index + 1}
            </Text>
          </View>
          <Text className="flex-1 text-base text-foreground leading-relaxed">
            {instruction}
          </Text>
        </View>
      ))}
    </View>
  );
}

// Recipe Card Component
export function RecipeCard({
  recipe,
  onPress,
}: {
  recipe: Recipe;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="bg-surface rounded-2xl p-4 border border-border mb-3"
    >
      <View className="gap-2">
        <Text className="text-lg font-bold text-foreground">{recipe.title}</Text>
        <View className="flex-row gap-2 flex-wrap">
          <SeasonBadge season={recipe.season} />
          <RegionBadge region={recipe.region} />
        </View>
        <Text className="text-sm text-muted">{recipe.description}</Text>
        <View className="flex-row justify-between items-center pt-2">
          <View className="flex-row gap-4">
            <Text className="text-xs text-muted">
              ⏱ {recipe.prepTime + recipe.cookTime} min
            </Text>
            <Text className="text-xs text-muted">👥 {recipe.servings}</Text>
          </View>
          <DifficultyIndicator difficulty={recipe.difficulty} />
        </View>
      </View>
    </Pressable>
  );
}

// Primary Button Component
export function PrimaryButton({
  onPress,
  title,
  loading = false,
}: {
  onPress: () => void;
  title: string;
  loading?: boolean;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      disabled={loading}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: loading ? 0.7 : 1,
        },
      ]}
      className="bg-primary rounded-full py-3 px-6 items-center justify-center"
    >
      <Text className="text-white font-semibold text-base">
        {loading ? "Generating..." : title}
      </Text>
    </Pressable>
  );
}

// Secondary Button Component
export function SecondaryButton({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="border border-primary rounded-full py-3 px-6 items-center justify-center"
    >
      <Text className="text-primary font-semibold text-base">{title}</Text>
    </Pressable>
  );
}

// Icon Button Component
export function IconButton({
  onPress,
  icon,
  label,
}: {
  onPress: () => void;
  icon: string;
  label: string;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
        },
      ]}
      className="items-center gap-1"
    >
      <Text className="text-2xl">{icon}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </Pressable>
  );
}

// Recipe Info Row Component
export function RecipeInfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <View className="flex-row justify-between items-center py-2 border-b border-border">
      <Text className="text-sm text-muted">{label}</Text>
      <Text className="text-sm font-semibold text-foreground">{value}</Text>
    </View>
  );
}
