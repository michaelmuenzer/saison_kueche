import { ScrollView, Text, View, Pressable, Switch } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = useColors();
  const isDarkMode = colorScheme === "dark";

  const handleThemeToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Theme toggle is handled by ThemeProvider context
    // This is a placeholder - actual implementation depends on your theme setup
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Settings</Text>
            <Text className="text-sm text-muted">
              Customize your SaisonKüche experience
            </Text>
          </View>

          {/* Appearance Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Appearance
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-4">
              <View className="flex-row items-center justify-between">
                <View className="gap-1">
                  <Text className="text-base font-semibold text-foreground">
                    Dark Mode
                  </Text>
                  <Text className="text-sm text-muted">
                    {isDarkMode ? "Enabled" : "Disabled"}
                  </Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={handleThemeToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={isDarkMode ? colors.primary : colors.surface}
                />
              </View>
            </View>
          </View>

          {/* About Section */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">About</Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-4">
              <View className="gap-2">
                <Text className="text-sm text-muted uppercase tracking-wide">
                  App Name
                </Text>
                <Text className="text-base font-semibold text-foreground">
                  SaisonKüche
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm text-muted uppercase tracking-wide">
                  Version
                </Text>
                <Text className="text-base font-semibold text-foreground">
                  1.0.0
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm text-muted uppercase tracking-wide">
                  Description
                </Text>
                <Text className="text-sm text-foreground leading-relaxed">
                  Discover authentic German recipes based on seasonal ingredients from your favorite region.
                </Text>
              </View>
            </View>
          </View>

          {/* Seasonal Eating Philosophy */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              Seasonal Eating
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <Text className="text-sm text-foreground leading-relaxed">
                SaisonKüche celebrates the German tradition of eating with the seasons. Our recipes feature ingredients that are naturally available in each season, supporting local agriculture and sustainable food practices.
              </Text>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-xs text-muted uppercase tracking-wide">
                  Why Seasonal?
                </Text>
                <View className="gap-1">
                  <Text className="text-sm text-foreground">
                    • Better taste and nutrition
                  </Text>
                  <Text className="text-sm text-foreground">
                    • Supports local farmers
                  </Text>
                  <Text className="text-sm text-foreground">
                    • Reduces environmental impact
                  </Text>
                  <Text className="text-sm text-foreground">
                    • Connects you to food traditions
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* German Regions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">
              German Regions
            </Text>
            <View className="bg-surface rounded-xl p-4 border border-border gap-3">
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  🏔️ Bavaria
                </Text>
                <Text className="text-xs text-muted">
                  Mountain cuisine with dairy, beer, and hearty dishes
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  🍷 Rhineland
                </Text>
                <Text className="text-xs text-muted">
                  Wine region with French influences and river fish
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  ⛵ Northern Germany
                </Text>
                <Text className="text-xs text-muted">
                  Maritime traditions with fresh fish and kale
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  🥨 Swabia
                </Text>
                <Text className="text-xs text-muted">
                  Known for Maultaschen and Spätzle
                </Text>
              </View>
              <View className="h-px bg-border" />
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">
                  🌾 Central Germany
                </Text>
                <Text className="text-xs text-muted">
                  Comfort food with potatoes and hearty stews
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center gap-2 pt-4">
            <Text className="text-xs text-muted text-center">
              Made with ❤️ for German food lovers
            </Text>
            <Text className="text-xs text-muted">© 2024 SaisonKüche</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
