export type Region = "Bavaria" | "Rhineland" | "Northern" | "Swabia" | "Central";
export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  region: Region;
  season: Season;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  servings: number;
}

// Seasonal German Recipes Database
export const recipesDatabase: Recipe[] = [
  // SPRING RECIPES
  {
    id: "spring-bavaria-1",
    title: "Spargel mit Hollandaise",
    region: "Bavaria",
    season: "Spring",
    description: "Fresh white asparagus with creamy Hollandaise sauce, a Bavarian spring delicacy",
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    difficulty: "Medium",
    ingredients: [
      { name: "White asparagus", quantity: 1.5, unit: "kg" },
      { name: "Butter", quantity: 200, unit: "g" },
      { name: "Egg yolks", quantity: 3, unit: "pieces" },
      { name: "Lemon juice", quantity: 2, unit: "tbsp" },
      { name: "Salt", quantity: 1, unit: "tsp" },
      { name: "White pepper", quantity: 0.5, unit: "tsp" },
    ],
    instructions: [
      "Peel the asparagus and cut off the woody ends",
      "Bring salted water to boil and cook asparagus for 12-15 minutes until tender",
      "Melt butter in a saucepan over low heat",
      "Whisk egg yolks with lemon juice in a heatproof bowl over simmering water",
      "Slowly add melted butter while whisking constantly",
      "Season with salt and white pepper",
      "Serve asparagus with warm Hollandaise sauce",
    ],
  },
  {
    id: "spring-rhineland-1",
    title: "Grüne Soße",
    region: "Rhineland",
    season: "Spring",
    description: "Traditional green herb sauce from Frankfurt, made with fresh spring herbs",
    servings: 4,
    prepTime: 20,
    cookTime: 5,
    difficulty: "Easy",
    ingredients: [
      { name: "Fresh parsley", quantity: 100, unit: "g" },
      { name: "Fresh chives", quantity: 50, unit: "g" },
      { name: "Fresh dill", quantity: 50, unit: "g" },
      { name: "Sour cream", quantity: 300, unit: "ml" },
      { name: "Hard-boiled eggs", quantity: 4, unit: "pieces" },
      { name: "Lemon juice", quantity: 2, unit: "tbsp" },
      { name: "Salt and pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Chop all fresh herbs finely",
      "Chop hard-boiled eggs",
      "Mix sour cream with herbs and eggs",
      "Season with lemon juice, salt, and pepper",
      "Serve with boiled potatoes and fish",
    ],
  },
  {
    id: "spring-northern-1",
    title: "Labskaus",
    region: "Northern",
    season: "Spring",
    description: "Traditional North German sailor's stew with salt beef, potatoes, and beets",
    servings: 4,
    prepTime: 30,
    cookTime: 45,
    difficulty: "Medium",
    ingredients: [
      { name: "Salt beef", quantity: 400, unit: "g" },
      { name: "Potatoes", quantity: 600, unit: "g" },
      { name: "Pickled beets", quantity: 200, unit: "g" },
      { name: "Onions", quantity: 2, unit: "pieces" },
      { name: "Herring fillets", quantity: 2, unit: "pieces" },
      { name: "Butter", quantity: 50, unit: "g" },
      { name: "Salt and pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Boil salt beef until tender, reserve broth",
      "Dice potatoes, beets, onions, and cooked beef",
      "Sauté onions in butter until golden",
      "Add potatoes and cook until soft",
      "Mix in beets and beef, add herring",
      "Season with salt and pepper",
      "Serve hot with pickled gherkins",
    ],
  },

  // SUMMER RECIPES
  {
    id: "summer-bavaria-1",
    title: "Kaiserschmarrn",
    region: "Bavaria",
    season: "Summer",
    description: "Shredded pancake dessert, a Bavarian mountain specialty, served with plum compote",
    servings: 4,
    prepTime: 15,
    cookTime: 15,
    difficulty: "Easy",
    ingredients: [
      { name: "Flour", quantity: 200, unit: "g" },
      { name: "Eggs", quantity: 4, unit: "pieces" },
      { name: "Milk", quantity: 300, unit: "ml" },
      { name: "Sugar", quantity: 50, unit: "g" },
      { name: "Butter", quantity: 100, unit: "g" },
      { name: "Plums", quantity: 500, unit: "g" },
      { name: "Powdered sugar", quantity: 50, unit: "g" },
    ],
    instructions: [
      "Mix flour, eggs, milk, and sugar to form batter",
      "Heat butter in a large skillet",
      "Pour batter and cook until golden on both sides",
      "Tear pancake into pieces with two forks",
      "Continue cooking until crispy",
      "Prepare plum compote by stewing plums with sugar",
      "Serve Kaiserschmarrn with powdered sugar and plum compote",
    ],
  },
  {
    id: "summer-rhineland-1",
    title: "Rheinischer Sauerbraten",
    region: "Rhineland",
    season: "Summer",
    description: "Pot roast marinated in vinegar, a Rhineland classic served with red cabbage",
    servings: 6,
    prepTime: 30,
    cookTime: 180,
    difficulty: "Hard",
    ingredients: [
      { name: "Beef chuck", quantity: 1.5, unit: "kg" },
      { name: "Red wine vinegar", quantity: 500, unit: "ml" },
      { name: "Beef broth", quantity: 500, unit: "ml" },
      { name: "Onions", quantity: 3, unit: "pieces" },
      { name: "Juniper berries", quantity: 6, unit: "pieces" },
      { name: "Bay leaves", quantity: 2, unit: "pieces" },
      { name: "Thyme", quantity: 3, unit: "sprigs" },
      { name: "Redcurrant jelly", quantity: 100, unit: "g" },
    ],
    instructions: [
      "Marinate beef with vinegar, onions, juniper, bay leaves, and thyme for 3-5 days",
      "Remove beef from marinade and pat dry",
      "Brown beef in hot oil on all sides",
      "Strain marinade and add to beef with broth",
      "Simmer covered for 2.5-3 hours until tender",
      "Remove beef and strain sauce",
      "Stir in redcurrant jelly",
      "Slice beef and serve with sauce and red cabbage",
    ],
  },
  {
    id: "summer-swabia-1",
    title: "Spätzle mit Käse",
    region: "Swabia",
    season: "Summer",
    description: "Cheese noodles, a hearty Swabian specialty with melted cheese and crispy onions",
    servings: 4,
    prepTime: 20,
    cookTime: 30,
    difficulty: "Medium",
    ingredients: [
      { name: "Flour", quantity: 400, unit: "g" },
      { name: "Eggs", quantity: 4, unit: "pieces" },
      { name: "Salt", quantity: 1, unit: "tsp" },
      { name: "Water", quantity: 200, unit: "ml" },
      { name: "Gruyère cheese", quantity: 300, unit: "g" },
      { name: "Onions", quantity: 2, unit: "pieces" },
      { name: "Butter", quantity: 100, unit: "g" },
    ],
    instructions: [
      "Mix flour, eggs, salt, and water to form thick batter",
      "Bring salted water to boil",
      "Press batter through Spätzle maker into boiling water",
      "Cook until Spätzle float to surface, then 1-2 minutes more",
      "Drain and layer in baking dish with grated cheese",
      "Fry sliced onions in butter until golden and crispy",
      "Top Spätzle with fried onions",
      "Bake at 180°C for 10 minutes until cheese melts",
    ],
  },

  // AUTUMN RECIPES
  {
    id: "autumn-bavaria-1",
    title: "Leberkäse",
    region: "Bavaria",
    season: "Autumn",
    description: "Bavarian meatloaf, a hearty autumn classic served with mustard and bread",
    servings: 6,
    prepTime: 20,
    cookTime: 60,
    difficulty: "Medium",
    ingredients: [
      { name: "Ground pork", quantity: 500, unit: "g" },
      { name: "Ground beef", quantity: 300, unit: "g" },
      { name: "Pork liver", quantity: 200, unit: "g" },
      { name: "Onions", quantity: 2, unit: "pieces" },
      { name: "Eggs", quantity: 2, unit: "pieces" },
      { name: "Breadcrumbs", quantity: 100, unit: "g" },
      { name: "Mustard", quantity: 2, unit: "tbsp" },
      { name: "Salt and pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Grind liver finely or process in food processor",
      "Sauté finely chopped onions until soft",
      "Mix ground meats, liver, onions, eggs, breadcrumbs, and mustard",
      "Season with salt and pepper",
      "Form into loaf and place in greased baking pan",
      "Bake at 180°C for 50-60 minutes",
      "Cool slightly before slicing",
      "Serve with mustard and fresh bread",
    ],
  },
  {
    id: "autumn-northern-1",
    title: "Grünkohl mit Pinkel",
    region: "Northern",
    season: "Autumn",
    description: "Kale stew with smoked sausage, a hearty Northern German winter favorite",
    servings: 6,
    prepTime: 30,
    cookTime: 90,
    difficulty: "Medium",
    ingredients: [
      { name: "Kale", quantity: 1, unit: "kg" },
      { name: "Potatoes", quantity: 800, unit: "g" },
      { name: "Pinkel sausage", quantity: 400, unit: "g" },
      { name: "Kassler", quantity: 300, unit: "g" },
      { name: "Onions", quantity: 2, unit: "pieces" },
      { name: "Beef broth", quantity: 1, unit: "liter" },
      { name: "Mustard", quantity: 2, unit: "tbsp" },
      { name: "Salt and pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Remove kale stems and chop leaves coarsely",
      "Cube potatoes",
      "Bring broth to boil with chopped onions",
      "Add potatoes and cook until half-done",
      "Add kale and cook for 30 minutes",
      "Add Pinkel sausage and Kassler",
      "Simmer for 30 more minutes",
      "Season with mustard, salt, and pepper",
      "Serve hot with whole grain mustard",
    ],
  },
  {
    id: "autumn-central-1",
    title: "Himmel und Erde",
    region: "Central",
    season: "Autumn",
    description: "Heaven and Earth - mashed potatoes with applesauce and fried blood sausage",
    servings: 4,
    prepTime: 20,
    cookTime: 30,
    difficulty: "Easy",
    ingredients: [
      { name: "Potatoes", quantity: 800, unit: "g" },
      { name: "Apples", quantity: 600, unit: "g" },
      { name: "Blutwurst", quantity: 400, unit: "g" },
      { name: "Onions", quantity: 2, unit: "pieces" },
      { name: "Butter", quantity: 100, unit: "g" },
      { name: "Milk", quantity: 100, unit: "ml" },
      { name: "Salt and pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Boil potatoes until tender, drain and mash",
      "Peel, core, and slice apples",
      "Stew apples with little water until soft, mash to sauce",
      "Mix mashed potatoes with butter and milk",
      "Season with salt and pepper",
      "Fry sliced blood sausage until crispy",
      "Fry onion slices until golden",
      "Serve potatoes topped with fried sausage and onions, applesauce on the side",
    ],
  },

  // WINTER RECIPES
  {
    id: "winter-bavaria-1",
    title: "Gänsebraten mit Rotkohl",
    region: "Bavaria",
    season: "Winter",
    description: "Roast goose with braised red cabbage, a traditional Bavarian Christmas dish",
    servings: 8,
    prepTime: 45,
    cookTime: 180,
    difficulty: "Hard",
    ingredients: [
      { name: "Goose", quantity: 3.5, unit: "kg" },
      { name: "Red cabbage", quantity: 1, unit: "kg" },
      { name: "Apples", quantity: 3, unit: "pieces" },
      { name: "Red wine", quantity: 300, unit: "ml" },
      { name: "Beef broth", quantity: 500, unit: "ml" },
      { name: "Juniper berries", quantity: 8, unit: "pieces" },
      { name: "Bay leaves", quantity: 2, unit: "pieces" },
      { name: "Thyme", quantity: 4, unit: "sprigs" },
    ],
    instructions: [
      "Season goose inside and out with salt and pepper",
      "Roast at 200°C for 2.5-3 hours, basting frequently",
      "Slice red cabbage and core apples",
      "Sauté cabbage in butter, add apples, wine, broth, and spices",
      "Simmer for 45 minutes until cabbage is tender",
      "Let goose rest 15 minutes before carving",
      "Serve with red cabbage and pan gravy",
    ],
  },
  {
    id: "winter-rhineland-1",
    title: "Rheinischer Eintopf",
    region: "Rhineland",
    season: "Winter",
    description: "Hearty Rhineland stew with beef, root vegetables, and pearl barley",
    servings: 6,
    prepTime: 30,
    cookTime: 120,
    difficulty: "Medium",
    ingredients: [
      { name: "Beef chuck", quantity: 800, unit: "g" },
      { name: "Carrots", quantity: 400, unit: "g" },
      { name: "Parsnips", quantity: 300, unit: "g" },
      { name: "Potatoes", quantity: 400, unit: "g" },
      { name: "Pearl barley", quantity: 100, unit: "g" },
      { name: "Beef broth", quantity: 1.5, unit: "liter" },
      { name: "Onions", quantity: 2, unit: "pieces" },
      { name: "Bay leaves", quantity: 2, unit: "pieces" },
    ],
    instructions: [
      "Cut beef into chunks",
      "Brown beef in pot with oil",
      "Add chopped onions and cook until soft",
      "Add broth and bay leaves, bring to boil",
      "Reduce heat and simmer for 45 minutes",
      "Add pearl barley and root vegetables",
      "Simmer for 45 more minutes until vegetables are tender",
      "Season with salt and pepper",
      "Serve hot with crusty bread",
    ],
  },
  {
    id: "winter-swabia-1",
    title: "Maultaschen",
    region: "Swabia",
    season: "Winter",
    description: "Swabian filled pasta pockets with meat and spinach, served in broth",
    servings: 4,
    prepTime: 60,
    cookTime: 30,
    difficulty: "Hard",
    ingredients: [
      { name: "Flour", quantity: 400, unit: "g" },
      { name: "Eggs", quantity: 3, unit: "pieces" },
      { name: "Ground pork", quantity: 300, unit: "g" },
      { name: "Spinach", quantity: 200, unit: "g" },
      { name: "Onions", quantity: 1, unit: "piece" },
      { name: "Breadcrumbs", quantity: 100, unit: "g" },
      { name: "Beef broth", quantity: 1, unit: "liter" },
      { name: "Salt and pepper", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Make pasta dough with flour, eggs, and salt",
      "Rest dough for 30 minutes",
      "Prepare filling: sauté onions, mix with ground pork, spinach, and breadcrumbs",
      "Roll dough thin and cut into squares",
      "Fill each square with meat mixture",
      "Fold into triangles and seal edges",
      "Boil in salted water until they float",
      "Serve in hot beef broth",
    ],
  },
  {
    id: "winter-northern-1",
    title: "Feuerzangenbowle",
    region: "Northern",
    season: "Winter",
    description: "Flaming punch with mulled wine, a festive Northern German winter tradition",
    servings: 8,
    prepTime: 20,
    cookTime: 15,
    difficulty: "Easy",
    ingredients: [
      { name: "Red wine", quantity: 1, unit: "liter" },
      { name: "Sugar loaf", quantity: 500, unit: "g" },
      { name: "Rum", quantity: 200, unit: "ml" },
      { name: "Oranges", quantity: 2, unit: "pieces" },
      { name: "Cloves", quantity: 8, unit: "pieces" },
      { name: "Cinnamon sticks", quantity: 2, unit: "pieces" },
      { name: "Star anise", quantity: 4, unit: "pieces" },
    ],
    instructions: [
      "Heat red wine with spices until steaming",
      "Pierce oranges with cloves",
      "Place sugar loaf on a special holder over the punch bowl",
      "Slowly pour warm rum over sugar loaf to soak it",
      "Carefully ignite the rum-soaked sugar",
      "Let sugar drip into the punch as it melts",
      "Once sugar is dissolved, carefully extinguish flame",
      "Serve hot in mugs",
    ],
  },
];

export function getRecipesBySeason(season: Season): Recipe[] {
  return recipesDatabase.filter((recipe) => recipe.season === season);
}

export function getRecipesByRegion(region: Region): Recipe[] {
  return recipesDatabase.filter((recipe) => recipe.region === region);
}

export function getRecipesBySeasonAndRegion(
  season: Season,
  region: Region
): Recipe[] {
  return recipesDatabase.filter(
    (recipe) => recipe.season === season && recipe.region === region
  );
}

export function getRandomRecipe(): Recipe {
  return recipesDatabase[Math.floor(Math.random() * recipesDatabase.length)];
}

export function getRandomRecipeBySeasonAndRegion(
  season: Season,
  region: Region
): Recipe | undefined {
  const recipes = getRecipesBySeasonAndRegion(season, region);
  if (recipes.length === 0) return undefined;
  return recipes[Math.floor(Math.random() * recipes.length)];
}

export const regions: Region[] = [
  "Bavaria",
  "Rhineland",
  "Northern",
  "Swabia",
  "Central",
];

export const seasons: Season[] = ["Spring", "Summer", "Autumn", "Winter"];

export function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
}
