import React from 'react';
import styled from 'styled-components';
import Button from './Button.jsx';
import Form from './Form.jsx';
import Input from './Input.jsx';
import Title from './Title.jsx';

const RecipeForm = ({
  newRecipe,
  setNewRecipe,
  handleClickRecipe,
  ingredients,
}) => {
  const findIngredientNamesById = (newRecipe) => {
    const namedIngredients = [];
    const newRecipeIngredients = newRecipe.ingredients;
    // loop over ingredients and match by Ids to get the names
    newRecipeIngredients.forEach((ingredientId) => {
      ingredients.forEach((ingredient) => {
        if (ingredient.id == ingredientId) {
          namedIngredients.push(ingredient.name);
        }
      });
    });
    return namedIngredients;
  };

  return (
    <Form>
      <Title>Add a recipe</Title>
      <label>Please enter the name of recipe:</label>
      <Input
        value={newRecipe.name}
        onChange={(ev) => setNewRecipe({ ...newRecipe, name: ev.target.value })}
      />
      <label>Please click ingredients to add:</label>
      <Input value={findIngredientNamesById(newRecipe)} disabled={true} />
      <IngredientButtonArea>
        {ingredients.map((ingredient) => (
          <IngButton
            key={ingredient.id}
            value={ingredient.name}
            onClick={(ev) => {
              ev.preventDefault();
              setNewRecipe({
                ...newRecipe,
                ingredients: [...newRecipe.ingredients, ingredient.id],
              });
            }}
          >
            {ingredient.name}
          </IngButton>
        ))}
      </IngredientButtonArea>
      <Button onClick={handleClickRecipe}>Click to add Recipe</Button>
    </Form>
  );
};

export default RecipeForm;

const IngredientButtonArea = styled.div`
  margin: 10px;
`;

const IngButton = styled.button`
  margin: 2px;
  border: 1px solid gray;
  border-radius: 3px;
  :hover {
    box-shadow: 0px 0px 10px 1px #9b9b9b;
  }
`;
