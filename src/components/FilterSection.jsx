import React from 'react';
import styled from 'styled-components';

const FilterSection = ({ ingredients, recipes, setRecipes }) => {
  return (
    <Section>
      {ingredients.map((ingredient) => (
        <Wrapper key={ingredient.id}>
          <label>{ingredient.name}</label>
          <input
            type='checkbox'
            onChange={(ev) => {
              // filter recipes with the selected ingredients
              if (ev.target.checked) {
                let filteredRecipes = recipes.filter((recipe) => {
                  return (
                    recipe.ingredients.includes(parseInt(ingredient.id)) ||
                    recipe.ingredients.includes(ingredient.id)
                  );
                });
                setRecipes(filteredRecipes);
              } else {
                location.reload();
              }
            }}
          />
        </Wrapper>
      ))}
    </Section>
  );
};

export default FilterSection;

const Section = styled.section`
  display: flex;
  padding: 0px 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
  * {
    padding: 0px 5px;
  }
`;
