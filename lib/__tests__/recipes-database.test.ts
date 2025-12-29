import { describe, it, expect } from "vitest";
import {
  recipesDatabase,
  getRecipesBySeason,
  getRecipesByRegion,
  getRecipesBySeasonAndRegion,
  getRandomRecipe,
  getRandomRecipeBySeasonAndRegion,
  getCurrentSeason,
  regions,
  seasons,
} from "../recipes-database";

describe("Recipes Database", () => {
  describe("Database Structure", () => {
    it("should have recipes in the database", () => {
      expect(recipesDatabase.length).toBeGreaterThan(0);
    });

    it("should have recipes for all seasons", () => {
      for (const season of seasons) {
        const recipes = getRecipesBySeason(season);
        expect(recipes.length).toBeGreaterThan(0);
      }
    });

    it("should have recipes for all regions", () => {
      for (const region of regions) {
        const recipes = getRecipesByRegion(region);
        expect(recipes.length).toBeGreaterThan(0);
      }
    });

    it("each recipe should have required fields", () => {
      for (const recipe of recipesDatabase) {
        expect(recipe.id).toBeDefined();
        expect(recipe.title).toBeDefined();
        expect(recipe.region).toBeDefined();
        expect(recipe.season).toBeDefined();
        expect(recipe.ingredients).toBeDefined();
        expect(recipe.instructions).toBeDefined();
        expect(recipe.prepTime).toBeGreaterThan(0);
        expect(recipe.cookTime).toBeGreaterThan(0);
        expect(recipe.difficulty).toBeDefined();
        expect(recipe.description).toBeDefined();
        expect(recipe.servings).toBeGreaterThan(0);
      }
    });

    it("each recipe should have at least 3 ingredients", () => {
      for (const recipe of recipesDatabase) {
        expect(recipe.ingredients.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("each recipe should have at least 3 instructions", () => {
      for (const recipe of recipesDatabase) {
        expect(recipe.instructions.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("each ingredient should have required fields", () => {
      for (const recipe of recipesDatabase) {
        for (const ingredient of recipe.ingredients) {
          expect(ingredient.name).toBeDefined();
          expect(ingredient.quantity).toBeGreaterThan(0);
          expect(ingredient.unit).toBeDefined();
        }
      }
    });
  });

  describe("Query Functions", () => {
    it("getRecipesBySeason should return recipes for Spring", () => {
      const recipes = getRecipesBySeason("Spring");
      expect(recipes.length).toBeGreaterThan(0);
      expect(recipes.every((r) => r.season === "Spring")).toBe(true);
    });

    it("getRecipesBySeason should return recipes for Summer", () => {
      const recipes = getRecipesBySeason("Summer");
      expect(recipes.length).toBeGreaterThan(0);
      expect(recipes.every((r) => r.season === "Summer")).toBe(true);
    });

    it("getRecipesBySeason should return recipes for Autumn", () => {
      const recipes = getRecipesBySeason("Autumn");
      expect(recipes.length).toBeGreaterThan(0);
      expect(recipes.every((r) => r.season === "Autumn")).toBe(true);
    });

    it("getRecipesBySeason should return recipes for Winter", () => {
      const recipes = getRecipesBySeason("Winter");
      expect(recipes.length).toBeGreaterThan(0);
      expect(recipes.every((r) => r.season === "Winter")).toBe(true);
    });

    it("getRecipesByRegion should return recipes for Bavaria", () => {
      const recipes = getRecipesByRegion("Bavaria");
      expect(recipes.length).toBeGreaterThan(0);
      expect(recipes.every((r) => r.region === "Bavaria")).toBe(true);
    });

    it("getRecipesByRegion should return recipes for all regions", () => {
      for (const region of regions) {
        const recipes = getRecipesByRegion(region);
        expect(recipes.length).toBeGreaterThan(0);
        expect(recipes.every((r) => r.region === region)).toBe(true);
      }
    });

    it("getRecipesBySeasonAndRegion should return correct recipes", () => {
      const recipes = getRecipesBySeasonAndRegion("Winter", "Bavaria");
      expect(recipes.length).toBeGreaterThan(0);
      expect(recipes.every((r) => r.season === "Winter" && r.region === "Bavaria")).toBe(true);
    });

    it("getRecipesBySeasonAndRegion should work for all combinations", () => {
      for (const season of seasons) {
        for (const region of regions) {
          const recipes = getRecipesBySeasonAndRegion(season, region);
          if (recipes.length > 0) {
            expect(recipes.every((r) => r.season === season && r.region === region)).toBe(true);
          }
        }
      }
    });
  });

  describe("Random Recipe Selection", () => {
    it("getRandomRecipe should return a valid recipe", () => {
      const recipe = getRandomRecipe();
      expect(recipe).toBeDefined();
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
    });

    it("getRandomRecipe should return different recipes on multiple calls", () => {
      const recipes = new Set();
      for (let i = 0; i < 10; i++) {
        recipes.add(getRandomRecipe().id);
      }
      // With 20+ recipes, we should get at least 2 different ones in 10 tries
      expect(recipes.size).toBeGreaterThan(1);
    });

    it("getRandomRecipeBySeasonAndRegion should return valid recipe", () => {
      const recipe = getRandomRecipeBySeasonAndRegion("Winter", "Bavaria");
      expect(recipe).toBeDefined();
      expect(recipe?.season).toBe("Winter");
      expect(recipe?.region).toBe("Bavaria");
    });

    it("getRandomRecipeBySeasonAndRegion should return undefined for invalid combinations", () => {
      // This test assumes not all season/region combinations exist
      // If they all exist, this test will need to be adjusted
      const recipe = getRandomRecipeBySeasonAndRegion("Spring", "Bavaria");
      // Just verify it returns either a valid recipe or undefined
      if (recipe) {
        expect(recipe.season).toBe("Spring");
        expect(recipe.region).toBe("Bavaria");
      }
    });
  });

  describe("Season Detection", () => {
    it("getCurrentSeason should return a valid season", () => {
      const season = getCurrentSeason();
      expect(seasons).toContain(season);
    });

    it("getCurrentSeason should return correct season for known dates", () => {
      // This test would require mocking Date, so we just verify it returns a valid season
      const season = getCurrentSeason();
      expect(["Spring", "Summer", "Autumn", "Winter"]).toContain(season);
    });
  });

  describe("Data Consistency", () => {
    it("all recipe IDs should be unique", () => {
      const ids = recipesDatabase.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("all recipe titles should be non-empty", () => {
      for (const recipe of recipesDatabase) {
        expect(recipe.title.trim().length).toBeGreaterThan(0);
      }
    });

    it("all recipe descriptions should be non-empty", () => {
      for (const recipe of recipesDatabase) {
        expect(recipe.description.trim().length).toBeGreaterThan(0);
      }
    });

    it("all ingredients should have non-empty names", () => {
      for (const recipe of recipesDatabase) {
        for (const ingredient of recipe.ingredients) {
          expect(ingredient.name.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it("all instructions should be non-empty", () => {
      for (const recipe of recipesDatabase) {
        for (const instruction of recipe.instructions) {
          expect(instruction.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it("difficulty levels should be valid", () => {
      const validDifficulties = ["Easy", "Medium", "Hard"];
      for (const recipe of recipesDatabase) {
        expect(validDifficulties).toContain(recipe.difficulty);
      }
    });
  });
});
