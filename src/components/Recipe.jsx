import React from 'react';
import styled from 'styled-components';
import Title from './Title.jsx';

const Recipe = ({ recipe, namedIngredients }) => {
  return (
    <RecipeWrapper>
      <Title>{recipe.name.toUpperCase()}</Title>
      <b>Ingredients:</b>
      {namedIngredients.map((ingredient, i) => {
        return (
          <div key={ingredient + i}>
            {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
          </div>
        );
      })}
    </RecipeWrapper>
  );
};

export default Recipe;

const RecipeWrapper = styled.div`
  border: 1px solid #538063;
  list-style-type: none;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
  background: #b5eecb;
  border-radius: 10px;
`;