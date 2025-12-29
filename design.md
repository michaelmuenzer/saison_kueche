# SaisonKüche - German Seasonal Recipes App Design

## Overview
SaisonKüche is an iOS app that generates authentic German recipes based on the current season and selected region. Users can explore traditional German cuisine with ingredients that are naturally in season, supporting sustainable eating and cultural discovery.

## Screen List

### 1. **Home Screen** (Main Entry Point)
- Large hero section with app title and current season indicator
- Quick access to "Generate Recipe" button
- Display of current month and available regions
- Brief description of seasonal eating philosophy

### 2. **Recipe Generator Screen**
- Region selector (dropdown or segmented control):
  - Bavaria (Süd)
  - Rhineland (Rheinland)
  - Northern Germany (Nord)
  - Swabia (Schwaben)
  - Central Germany (Mitte)
- "Generate Recipe" button (primary action)
- Display of currently selected season (auto-detected from system date)
- Loading state with animation while generating

### 3. **Recipe Detail Screen**
- Recipe title and region/season badge
- High-quality recipe image (placeholder or generated)
- Ingredients list (organized by category if needed)
- Step-by-step cooking instructions
- Prep time and cook time
- Difficulty level indicator
- "Save Recipe" button (heart icon)
- "Share Recipe" button
- "Generate Another" button to return to generator

### 4. **Saved Recipes Screen**
- List of saved recipes with thumbnail previews
- Filter by region or season
- Ability to remove saved recipes
- Empty state message if no recipes saved

### 5. **Settings Screen**
- Theme toggle (Light/Dark mode)
- About section
- Information about seasonal eating

## Primary Content and Functionality

### Home Screen
- **Content:** Welcome message, current season display, region selector preview
- **Functionality:** Navigate to recipe generator, view saved recipes

### Recipe Generator
- **Content:** Region dropdown, season indicator, generate button
- **Functionality:** 
  - Select region (Bavaria, Rhineland, Northern, Swabia, Central)
  - Generate recipe based on selected region and current season
  - Display loading state during generation

### Recipe Detail
- **Content:** 
  - Recipe name and regional origin
  - Ingredients (seasonal vegetables, meats, traditional items)
  - Step-by-step instructions
  - Cooking times and difficulty
  - Visual indicators for season/region
- **Functionality:**
  - Save/unsave recipe (persistent storage)
  - Share recipe (native share sheet)
  - Generate new recipe
  - Navigate back to generator

### Saved Recipes
- **Content:** Grid or list of saved recipes with thumbnails
- **Functionality:**
  - View saved recipe details
  - Delete saved recipes
  - Filter by region/season (optional)

## Key User Flows

### Flow 1: Generate and View Recipe
1. User opens app → Home Screen
2. User selects region (e.g., Bavaria)
3. User taps "Generate Recipe"
4. App shows loading animation
5. Recipe Detail Screen displays with full recipe
6. User can save, share, or generate another recipe

### Flow 2: Save and Revisit Recipe
1. User on Recipe Detail Screen
2. User taps heart icon to save recipe
3. Confirmation feedback (haptic + visual)
4. User navigates to Saved Recipes tab
5. User sees saved recipe in list
6. User taps recipe to view full details

### Flow 3: Explore Different Regions
1. User on Home Screen
2. User changes region selector
3. User taps "Generate Recipe"
4. New recipe from selected region displays
5. User can compare recipes from different regions

## Color Choices

### Brand Palette (German Heritage + Modern)
- **Primary:** `#2D5016` (Deep Forest Green - represents German forests and tradition)
- **Secondary:** `#D4A574` (Warm Beige - represents bread and wheat)
- **Accent:** `#C41E3A` (German Red - from flag, energetic)
- **Background:** `#FAFAF8` (Off-white - clean, food-focused)
- **Surface:** `#FFFFFF` (Pure white - cards and containers)
- **Text Primary:** `#1A1A1A` (Near black - excellent readability)
- **Text Secondary:** `#6B6B6B` (Gray - secondary information)
- **Success:** `#4CAF50` (Green - for saved/success states)
- **Warning:** `#FF9800` (Orange - for alerts)

### Seasonal Indicators (Visual Feedback)
- **Spring:** Light Green `#A4D65E`
- **Summer:** Bright Yellow `#FFD700`
- **Autumn:** Burnt Orange `#E67E22`
- **Winter:** Icy Blue `#5DADE2`

## Layout Specifications

### Safe Area & Spacing
- All screens use `ScreenContainer` for proper SafeArea handling
- Standard padding: 16px (p-4 in Tailwind)
- Card spacing: 12px (gap-3)
- Section spacing: 24px (gap-6)

### Typography
- **Title (H1):** 32px, bold, text-foreground
- **Subtitle (H2):** 24px, semibold, text-foreground
- **Section Header (H3):** 18px, semibold, text-foreground
- **Body:** 16px, regular, text-foreground
- **Small/Caption:** 14px, regular, text-muted

### Interactive Elements
- **Buttons:** 48px minimum height (iOS standard)
- **List Items:** 56px minimum height for touch targets
- **Card Corners:** 12px border radius
- **Button Corners:** 8px border radius

## Data Structure

### Recipe Object
```typescript
interface Recipe {
  id: string;
  title: string;
  region: "Bavaria" | "Rhineland" | "Northern" | "Swabia" | "Central";
  season: "Spring" | "Summer" | "Autumn" | "Winter";
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  imageUrl?: string;
  savedAt?: number; // timestamp
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  seasonal: boolean;
}
```

## Accessibility Considerations
- All text has sufficient contrast (WCAG AA standard)
- Touch targets minimum 44x44 points
- Clear visual hierarchy for screen reader users
- Color is not the only indicator (use icons + text)
- Haptic feedback for important actions

## Performance Notes
- Recipe generation uses local data (no API calls required initially)
- Saved recipes stored in AsyncStorage for quick access
- Lazy load recipe images when available
- Smooth transitions between screens (80-300ms animations)
