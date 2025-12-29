import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "./recipes-database";

interface SavedRecipesContextType {
  savedRecipes: Recipe[];
  isSaved: (recipeId: string) => boolean;
  saveRecipe: (recipe: Recipe) => Promise<void>;
  removeRecipe: (recipeId: string) => Promise<void>;
  isLoading: boolean;
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(
  undefined
);

const SAVED_RECIPES_KEY = "saison_kueche_saved_recipes";

export function SavedRecipesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved recipes on mount
  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
      if (data) {
        setSavedRecipes(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading saved recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRecipe = async (recipe: Recipe) => {
    try {
      const updated = [...savedRecipes, recipe];
      setSavedRecipes(updated);
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const removeRecipe = async (recipeId: string) => {
    try {
      const updated = savedRecipes.filter((r) => r.id !== recipeId);
      setSavedRecipes(updated);
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  const isSaved = (recipeId: string) => {
    return savedRecipes.some((r) => r.id === recipeId);
  };

  return (
    <SavedRecipesContext.Provider
      value={{
        savedRecipes,
        isSaved,
        saveRecipe,
        removeRecipe,
        isLoading,
      }}
    >
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error(
      "useSavedRecipes must be used within SavedRecipesProvider"
    );
  }
  return context;
}
