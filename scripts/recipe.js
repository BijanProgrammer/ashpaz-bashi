const INGREDIENT_TEMPLATE = document.querySelector('#ingredient-template');
const STEP_TEMPLATE = document.querySelector('#step-template');

let recipe = {};

const setupRecipe = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const index = +urlParams.get('index');

    recipe = allRecipes[index];
};

const setupHeader = () => {
    const headerElement = document.querySelector('header');
    headerElement.style.backgroundImage = `url(${FOOD_IMAGES_FOLDER + recipe.image})`;

    headerElement.querySelector('h1').textContent = recipe.title;

    const timesElement = headerElement.querySelector('.times');
    timesElement.querySelector('.preparation span').textContent = recipe.preparationTime.toString();
    timesElement.querySelector('.cook span').textContent = recipe.cookTime.toString();

    const tagsElement = headerElement.querySelector('ul');
    for (const tag of recipe.tags) {
        const element = document.createElement('li');
        element.textContent = tag;

        tagsElement.appendChild(element);
    }
};

const setupIngredient = () => {
    const ingredientsElement = document.querySelector('main .ingredients ul');

    for (const ingredient of recipe.ingredients) {
        const element = INGREDIENT_TEMPLATE.content.cloneNode(true);
        element.querySelector('.title').textContent = ingredient.title;
        element.querySelector('.amount').textContent = ingredient.amount;

        ingredientsElement.appendChild(element);
    }
};

const setupSteps = () => {
    const stepsElement = document.querySelector('main .steps ul');

    for (const [i, step] of recipe.steps.entries()) {
        const element = STEP_TEMPLATE.content.cloneNode(true);
        element.querySelector('.index').textContent = 'مرحله ' + (i + 1);
        element.querySelector('.text').textContent = step;

        stepsElement.appendChild(element);
    }
};

const main = async () => {
    await fetchData();
    setupRecipe();

    setupHeader();
    setupIngredient();
    setupSteps();
};

main().then();
