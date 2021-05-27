import React from 'react';
import styled from 'styled-components';
import Recipe from './Recipe.jsx';

const RecipeList = ({ recipes, ingredients }) => {
  return (
    <List>
      {recipes.map((recipe) => {
        // get recipe ingredients array with Ids
        const recipeIngredients = recipe.ingredients;
        const namedIngredients = [];
        // loop over ingredients and match by Ids to get the names
        recipeIngredients.forEach((ingredientId) => {
          ingredients.forEach((ingredient) => {
            if (ingredient.id == ingredientId) {
              namedIngredients.push(ingredient.name);
            }
          });
        });
        return (
          <Recipe
            recipe={recipe}
            namedIngredients={namedIngredients}
            key={recipe.name + recipe.id}
          />
        );
      })}
    </List>
  );
};

export default RecipeList;

const List = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;