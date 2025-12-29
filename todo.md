# SaisonKüche Project TODO

## Core Features
- [x] Home screen with season indicator and region selector
- [x] Recipe generator screen with region selection
- [x] Recipe detail screen with full recipe display
- [x] Saved recipes screen with list view
- [x] Settings screen with theme toggle
- [x] Recipe data structure and seasonal recipe database
- [x] Save/unsave recipe functionality with AsyncStorage
- [x] Share recipe functionality
- [x] Generate new recipe button flow

## UI/UX Implementation
- [x] Implement custom color theme (German heritage palette)
- [x] Create app logo and branding assets
- [x] Tab bar navigation setup
- [x] Loading animation for recipe generation
- [x] Haptic feedback for button interactions
- [x] Season indicator visual component
- [x] Region badge component
- [x] Difficulty level indicator component
- [x] Smooth screen transitions

## Data & Logic
- [x] Create seasonal ingredient database (Spring, Summer, Autumn, Winter)
- [x] Create regional recipe database (5 German regions)
- [x] Implement recipe generation algorithm
- [x] Implement current season detection
- [x] Implement recipe save/load logic
- [x] Implement recipe filtering by region/season

## Testing & Polish
- [ ] Test all user flows end-to-end
- [ ] Test saved recipes persistence
- [ ] Test dark mode theme switching
- [ ] Verify haptic feedback on iOS
- [ ] Test share functionality
- [ ] Verify all buttons and links work
- [ ] Check for console errors

## Deployment Preparation
- [x] Verify app.config.ts has correct branding
- [x] Generate app icon and update assets
- [ ] Create checkpoint before publishing


## AI Recipe Generation (New)
- [x] Create tRPC router for AI recipe generation
- [x] Implement LLM integration for recipe generation
- [x] Create AI recipe generation screen/modal
- [x] Add prompt engineering for consistent recipe format
- [x] Handle LLM loading states and errors
- [x] Create AI recipe generation hook
- [x] Test AI recipe generation with comprehensive test suite
