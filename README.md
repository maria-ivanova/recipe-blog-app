## Spatulas Recipe blog
github: https://github.com/maria-ivanova
Use HTTPS: https://github.com/maria-ivanova/recipe-blog-app.git
Use SSH: git@github.com:maria-ivanova/recipe-blog-app.git

1. git clone
2. npm install
3. npm start

## Technology stack
- React
- react-router
- react-fontawesome
- Firebase

## Application Structure
The application have:
- public part (accessible without authentication)
- private part (available for registered users)

### Public part
The public part is visible without authentication.
- home page
- login page
- register page
- list page of all recipes by category
- details recipe page
- search page

### Private Part
Registered users have personal area in the web application accessible after successful login.
- profile page
- create recipe page
- edit recipe page
- details recipe page
- my recipes
- favorites recipes

## Functionalities
### Authentication and authorization
Firebase is used for authentication and authorization. This functionality includes:
- login of an existing user
- new user registration
- profile - each logged in user can change their password

### Recipes Functionalities
These features are only available to logged in users:
- create recipe - any registered user can publish a recipe. Recipes are stored in Firebase Realtime database.
- edit recipe - only the creator of the recipe can edited it.
- delete recipe - only the creator of the recipe can delete it.
- аdd favorite recipe - only a logged in user who has not created the recipe can add the recipe to favorites.
The creator of the recipe cannot add it to favorites.

### My recipes
Recipes created by the current user.

### My favorites
Add recipes in favorites.

### Search 
Search recipes by title, ingredients, recipeDescription, category

## Models
### User model
- username
- email
- password

### Recipe model
- creatorId
- creatorName
- createdDate
- title
- category
- totalTime
- yields
- imageUrl
- ingredients
- recipeDescription
- likes

## Routing
| Route	| Description | Page |
|-------|-------------|------|
|/      |Home         |http://localhost:3000/|
|/login|Login page|http://localhost:3000/login|
|/register|Register page|http://localhost:3000/register|
|/profile|Profile page|http://localhost:3000/profile|
|/create|Create a new recipe|http://localhost:3000/create|
|/edit/:id|Edit recipe|http://localhost:3000/edit/-MDoYJl51ZamVsK3rdyV|
|/details/:id|Details recipe page|http://localhost:3000/details/-MDoYJl51ZamVsK3rdyV|
|/recipes/:categoryName|Recipes page by category|http://localhost:3000/recipes/%D0%A1%D0%B0%D0%BB%D0%B0%D1%82%D0%B8|
|/myRecipes|Recipes published by the user|http://localhost:3000/myRecipes|
|/myFavorites|User's favorite recipes|http://localhost:3000/myFavorites|
|/search|Search page|http://localhost:3000/search|
















