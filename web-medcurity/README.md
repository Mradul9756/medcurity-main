## Breach Portal

## Commands

Here are the two needed commands to get up and running. 

`yarn install`

This will add and install all of the needed packages in order for this project to run.

`yarn start`

This will start the application and have it running on https://localhost:3000

After those comamnds are run, you should be up and running!

## Project Structure

All code is hosted here in the `src` folder. There you will find various folders and files.

### Index.js
This is our project entry point. Nothing needs to be handled in here.

### App.js
Here we have our basic page layout. At the top we render our navbar. In the middle we have all of our content pages that can accessed through various routes. Finally, we have the footer component. 

### components 
In this folder, we have various components that might be accessed throughout the project such as the nav bar and the footer.

### hooks
This is a deprecated folder. This was orginally used to fetching data via an api but that is no longer used.

### images
This holds all our images for our project. Mainly, you will find all of the images for the news sites.

### pages 
This is our most fill folder. Here you will find various sub folders each holding all of the needed code for our pages. Inside each sub folder, you will find all of the componets designed for these pages. You will also find some stylings with css.

You should find all of the code clearly commented as to what is happening. Almost all of the components used in these pages utilize something called stylized components. At its core, it is components with css. You will be able to see all of the styling of these components at the top of the page. 

### supabase
Finally, we reach the supabase folder. Inside you will find supabase.js. This is used to create a connection to our supabase database. We then export that supabase instance as `export const supabase = createClient(supabaseUrl, supabaseKey)` to be imported by components that need it. 


