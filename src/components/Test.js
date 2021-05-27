import React, { useState } from 'react';
import styled from 'styled-components';
import FilterSection from './components/FilterSection.jsx';
import GlobalStyles from './components/GlobalStyles.jsx';
import IngredientForm from './components/IngredientForm.jsx';
import RecipeForm from './components/RecipeForm.jsx';
import RecipeList from './components/RecipeList.jsx';

/**
 * The API endpoints are availables as:
 *
 * recipes:
 * get all -> GET -> /recipes/
 * get one -> GET -> /recipes/ID
 * create one -> POST -> /recipes/ {name: 'abc', ingredients: [1,2,3]}
 * update one -> PUT/PATCH -> /recipes/ID {name: 'abc', ingredients: [1,2,3]}
 * delete -> DELETE -> /recipes/ID
 *
 * ingredients:
 * get all -> GET -> /ingredients/
 * get one -> GET -> /ingredients/ID
 * create one -> POST -> /ingredients/ {name: 'abc', vegetarian: true, calories: 123}
 * update one -> PUT/PATCH -> /ingredients/ID {name: 'abc', vegetarian: true, calories: 123}
 * delete -> DELETE -> /recipes/ID
 *
 */
// ________________________________________

const App = () => {
  const [recipes, setRecipes] = useState(() => {
    fetch('/recipes/').then((resp) => {
      resp.json().then((json) => {
        console.log(json);
        setRecipes(json);
      });
    });
    return [];
  });

  const [ingredients, setIngredients] = useState(() => {
    fetch('/ingredients/').then((resp) => {
      resp.json().then((json) => {
        console.log(json);
        setIngredients(json);
      });
    });
    return [];
  });

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: [],
  });

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    vegetarian: false,
    calories: '',
  });

  // onclick to the add recipe button
  const handleClickRecipe = (ev) => {
    ev.preventDefault();
    fetch('/recipes/', {
      method: 'POST',
      body: JSON.stringify(newRecipe),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      resp.json().then((json) => {
        console.log(json);
        // add the new recipe to state
        setRecipes([...recipes, { id: `${recipes.length + 1}`, ...newRecipe }]);
        // clear new recipe state
        setNewRecipe({
          name: '',
          ingredients: [],
        });
      });
    });
  };

  // onclick to the add ingredient button
  const handleClickIngredient = (ev) => {
    ev.preventDefault();
    fetch('/ingredients/', {
      method: 'POST',
      body: JSON.stringify(newIngredient),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((resp) => {
      resp.json().then((json) => {
        console.log(json);
        // add new ingredient to ingredients
        setIngredients([
          ...ingredients,
          { id: `${ingredients.length + 1}`, ...newIngredient },
        ]);
        // clear ingredients state
        setNewIngredient({
          name: '',
          vegetarian: false,
          calories: '',
        });
      });
    });
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <Header>My Cookbook</Header>
      <RecipeSection>
        <h1>Recipes:</h1>
        <RecipeList recipes={recipes} ingredients={ingredients} />
      </RecipeSection>
      <FilterSection
        ingredients={ingredients}
        recipes={recipes}
        setRecipes={setRecipes}
      />
      <FormSection>
        <RecipeForm
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          handleClickRecipe={handleClickRecipe}
          ingredients={ingredients}
        />
        <IngredientForm
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
          handleClickIngredient={handleClickIngredient}
        />
      </FormSection>
      <Footer>May 27, 2021 - Lara Tunc</Footer>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  font-family: sans-serif;
  background: #f5f5ff;
  padding-bottom: 50px;
  position: relative;
`;

const Header = styled.header`
  background: #cbc7fc;
  color: navy;
  padding: 10px;
  font-size: 30px;
  display: flex;
  justify-content: center;
  font-family: 'Pattaya', sans-serif;
`;

const Section = styled.section`
  margin: 20px;
`;

const RecipeSection = styled(Section)`
  flex: 7;
`;

const FormSection = styled(Section)`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  border-top: 1px dotted gray;
`;

const Footer = styled.footer`
  background: #cbc7fc;
  padding: 10px;
  color: navy;
  text-align: center;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;
