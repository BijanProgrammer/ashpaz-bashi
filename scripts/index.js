const RECIPE_TEMPLATE = document.querySelector('#recipe-template');

const setupRecipes = async (recipes) => {
    const cards = document.querySelector('main .cards');
    cards.innerHTML = '';

    for (const recipe of recipes) {
        const recipeElement = RECIPE_TEMPLATE.content.cloneNode(true);

        const itemElement = recipeElement.querySelector('li');
        itemElement.addEventListener('click', () => {
            window.location = `./recipe.html?index=${recipe.index}`;
        });

        const imageElement = recipeElement.querySelector('img');
        imageElement.src = FOOD_IMAGES_FOLDER + recipe.image;

        const titleElement = recipeElement.querySelector('.title');
        titleElement.textContent = recipe.title;

        const tagsElement = recipeElement.querySelector('.tags');
        for (const tag of recipe.tags) {
            const tagElement = document.createElement('li');
            tagElement.textContent = tag;

            tagsElement.appendChild(tagElement);
        }

        cards.appendChild(recipeElement);
    }
};

const setupFilterFunctionality = async () => {
    const filterElements = [...document.querySelectorAll('.filters li')];
    let currentFilterIndex = 0;

    const changeFilter = async (index) => {
        filterElements[currentFilterIndex].classList.remove('active');
        filterElements[index].classList.add('active');
        currentFilterIndex = index;

        if (index === 0) {
            await setupRecipes(allRecipes);
            return;
        }

        const tag = filterElements[currentFilterIndex].innerText;
        const recipes = allRecipes.filter((recipe) => recipe.tags.includes(tag));

        await setupRecipes(recipes);
    };

    filterElements.forEach((element, index) => element.addEventListener('click', () => changeFilter(index)));
};

const main = async () => {
    await fetchData();
    allRecipes = allRecipes.sort((a, b) => a.title.localeCompare(b.title));

    await setupRecipes(allRecipes);
    await setupFilterFunctionality();
};

main().then();
