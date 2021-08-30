const RECIPES_URL = './data/recipes.json';
const IMAGES_URL = './data/images.json';

const FOOD_IMAGES_FOLDER = './assets/images/foods/';

let allRecipes;

const fetchData = async () => {
    const recipes = await (await fetch(RECIPES_URL)).json();
    const images = await (await fetch(IMAGES_URL)).json();

    allRecipes = recipes.map((recipe, index) => ({...recipe, index, image: images[index]}));
};
