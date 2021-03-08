# **Kitchen Sink**
### **Description**
Kitchen Sink is an app designed to allow users to search for recipes using specific ingredients, based on dietary restrictions and other personal preferences. Users can save recipes they have tried and leave reviews with ratings and comments. Recpies that users have reviewed appear on the homepage for other users to peruse and try. Ideally, users would also be able to mark their favorites, save recipes for later, and store their pantry/grocery list in their profile, along with their own preferences. 
### MVP Goals
* Create a profile
* Search for recipes
* Save recipes 
* Leave a review on a recipe
* View and/or add recipes other users have tried
### Stretch Goals
* Allow users to limit search results based on the number of ingredients in the ingredient list, to target even more specific recipes
* Allow users to search based on dietary restrictions and other preferences
* Allow users to favorite and bookmark recipes 
* Allow users to store their grocery/pantry list in their profile, with ability to add items to search query from this list
* Alert users when items in pantry list need to be used based on expiration/shelf life
* Users can auto-populate pantry list based on bar-codes and pictures of reciepts
### User Stories
* As a user, I want to be able to search for recipes that include specific ingredients and preferences
* As a user, I want to be able to create a profile 
* As a user, I want to save and review recipes that I have tried
* As a user, I want to be able to see other users' reviews of recipes 
### APIs
I plan to use the [Edamam Recipe API](https://developer.edamam.com/edamam-docs-recipe-api) for MVP and the [Shelf Life API](https://github.com/jcomo/shelf-life) for Stretch Goals. 
### Daily Sprints

Monday:
* test API
* write readme
* wireframe app
* plan database ERD
* plan routes

Tuesday:
* create db models -- test db
* stub routes -- test routes
* build routes

Wednesday:
* finish routes
* create views

Thursday:
* finish views
* mvp

Friday:
* debug refactor
* style views

Saturday:
* style views
* stretch goals

Sunday:
* stretch goals
### Wireframes
#### Homepage ( / )
![WIREFRAME0](./assets/kitchen_sink_wireframe0.jpg)
#### Homepage while signed in ( / ) 
![WIREFRAME0](./assets/kitchen_sink_wireframe6.jpg)
#### Homepage with Search ( /results )
![WIREFRAME1](./assets/kitchen_sink_wireframe1.jpg)
#### Homepage with Search while signed in ( /results )
![WIREFRAME2](./assets/kitchen_sink_wireframe2.jpg)
#### User Sign up (/users/new)
![WIREFRAME3](./assets/kitchen_sink_wireframe3.jpg)
#### User Login (/users/login)
![WIREFRAME4](./assets/kitchen_sink_wireframe4.jpg)
#### Profile View (/users/profile)
![WIREFRAME5](./assets/kitchen_sink_wireframe5.jpg)
#### Recipe Details View (/recipes/:id)
![WIREFRAME7](./assets/kitchen_sink_wireframe7.jpg)
### Database ERDs
![ERD](./assets/kitchen_sink.png)
### RESTful routing chart 
Method | URL | Functionality | View 
--- | --- | --- | ---
GET | / | view home page show all db recipes | renders index.ejs
GET | /users/new |  display signup page | renders users/new.ejs
POST| /users/new |  create new user | redirects to index.ejs
GET | /users/login | display login page | renders users/login.ejs
POST| /users/login | log in as user | redirects to index.ejs
GET | /users/profile | show user's profile | renders users/profile.ejs
GET | /users/logout | log the user out and clear cookie | redirects to index.ejs
GET | /recipes/results | show search results | renders recipes/results.ejs
GET | /recipes/detail | show recipe details | renders recipes/detail.ejs
POST | /recipes | save recipe to user's profile | redirects to users/profile.ejs
DELETE | /recipes/:id | delete recipe from user's profile | redirects to users/profile.ejs
POST | /reviews | create review | renders recipes/detail.ejs
PUT | /reviews/:id | update review | renders recipes/detail.ejs
DELETE | /reviews/:id | delete review | renders recipes/detail.ejs
