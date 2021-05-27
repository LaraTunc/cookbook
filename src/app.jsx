import React, { useState } from 'react';
import styled from 'styled-components';

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

// Notes: The app is not letting me use browser router or import/abstract component they just disappear with no warning so I could not do that 

//  Recipe component 
const Recipe = ({recipe, namedIngredients})=> {
    return (
        <RecipeWrapper >
        <Title>{recipe.name.toUpperCase()}</Title>
        <b>Ingredients:</b>
        {namedIngredients.map((ingredient,i)=>{
            return(<div key={ingredient+i}>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</div>
            )})}
        </RecipeWrapper>);
}; 

// App component
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

      const [newRecipe, setNewRecipe]= useState({
          name:'',
          ingredients: ''
      });

      const [newIngredient, setNewIngredient]= useState({
          name: '', 
          vegetarian: false, 
          calories: ''
        });

        // to be used as IDs when posting new recipes and ingredients
        let lastRecipeId = 1; 
        let lastIngredientId = 3; 

      const handleClickRecipe = (ev)=>{
          ev.preventDefault(); 
          // format the ingredients string into an array
          const newRecipeIngredients= newRecipe.ingredients.split(','); 
          const trimmedNewRecipeIngredients = newRecipeIngredients.map((ingredient)=>{
              return ingredient.trim();
          });
          const newRecipeFormatted = {
              name: newRecipe.name,
              ingredients: trimmedNewRecipeIngredients,
          };
          fetch("/recipes/", {
            method: "POST",
            body: JSON.stringify(newRecipeFormatted),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
          .then((resp) => {
            resp.json().then((json) => {
              console.log(json);
              // add the new recipe to state 
              setRecipes([...recipes, {id: lastRecipeId+1, ...newRecipeFormatted}]);
              // clear new recipe state
              setNewRecipe({
                name:'',
                ingredients: ''
            });
            });
          });
      };

      const handleClickIngredient = (ev)=>{
        ev.preventDefault(); 
        fetch("/ingredients/", {
            method: "POST",
            body: JSON.stringify(newIngredient),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
          .then((resp) => {
            resp.json().then((json) => {
              console.log(json);
              // add new ingredient to ingredients 
              setIngredients([...ingredients, {id: lastIngredientId+1, ...newIngredient}]);
              // clear ingredients state
              setNewIngredient({
                name: '', 
                vegetarian: false, 
                calories: ''
              });
            });
          });
      };

    return ( 
    <Wrapper>
        <Header>Daily Recipes</Header>
        <RecipeSection>
            <h1>Recipes:</h1>
            <List>
                {recipes.map((recipe) => {
                    // get recipe ingredients array with Ids
                    const recipeIngredients = recipe.ingredients; 
                    const namedIngredients = [];
                    // loop over ingredients and match by Ids to get the names
                    recipeIngredients.forEach((ingredientId)=>{
                        // if it's a recent push and the ingredients are not formatted as ids then display them as is
                        if(typeof ingredientId === 'number') {
                            ingredients.forEach((ingredient)=>{
                                if(ingredient.id == ingredientId) {
                                    namedIngredients.push(ingredient.name);
                                };
                            });
                        } else{
                            namedIngredients.push(ingredientId);
                        };
                    });
                return (
                    <Recipe 
                    recipe={recipe} 
                    namedIngredients={namedIngredients}
                    key={recipe.name+recipe.id} 
                    />
                );
                })}
            </List>
        </RecipeSection>
        <FormSection>
            <Form> 
                <Title>Add a recipe</Title>
                <label>Please enter the name of recipe:</label>
                <Input 
                    value={newRecipe.name} 
                    onChange={ev=>setNewRecipe({...newRecipe,name:ev.target.value})}
                />
                <label>Please enter comma separated ingredients list:</label>
                <Input 
                    value={newRecipe.ingredients} 
                    onChange={ev=>setNewRecipe({...newRecipe,ingredients: ev.target.value})}
                />
                <Button
                    onClick = {handleClickRecipe}
                >Click to add Recipe</Button>
            </Form>
            <Form> 
                <Title>Add an ingredient</Title>
                <label>Please enter the name of ingredient:</label>
                <Input 
                    value={newIngredient.name} 
                    onChange={ev=>setNewIngredient({...newIngredient,name:ev.target.value})}
                />
                <label>Please confirm if vegetarian:</label>
                <Input 
                    type="radio" 
                    value={newIngredient.vegetarian} 
                    onChange={()=>setNewIngredient({...newIngredient,vegetarian:true})}
                />
                <label>Please enter number of calories:</label>
                <Input 
                    value={newIngredient.calories} 
                    onChange={ev=>setNewIngredient({...newIngredient,calories: ev.target.value})}
                />
                <Button
                    onClick = {handleClickIngredient}
                >Click to add Ingredient</Button>
            </Form>
        </FormSection>
        <Footer><a href="">Contact Us</a></Footer>
    </Wrapper>
    )
};

export default App;

const Wrapper = styled.div`
box-sizing: border-box;
  min-height:100vh;
  font-family: sans-serif;
  background: #f5f5ff;
`;

const Header = styled.header`
background:#CBC7FC; 
color: navy;
padding: 10px;
font-size: 30px;
display:flex;
justify-content: center;
font-family: 'Pattaya', sans-serif;
`;

const Section = styled.section`
margin: 20px;
`;

const RecipeSection = styled(Section)`
flex:7;
`;

const List = styled.div`
display: flex;
padding: 10px;
flex-wrap: wrap;
`;

const RecipeWrapper = styled.div`
border:1px solid #538063;
list-style-type:none;
padding: 10px;
margin: 10px;
width: 200px;
text-align:center;
background: #B5EECB;
border-radius: 10px;
`;

const Title = styled.div`
font-size: 20px; 
font-weight:bold;
padding-bottom: 5px;
`;

const FormSection = styled(Section)`
display: flex;
align-items: flex-start;
border-top: 1px dotted gray;
`;

const Form =styled.form`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
padding-top:15px;
:last-child {
    border-left: 1px dotted gray;
};
* {
    flex:1;
};
`;

const Input = styled.input`
margin: 10px;
min-width: 400px;
background: inherit;
border: 1px solid gray;
border-radius: 5px;
line-height:1.5;
`;

const Button =styled.button`
margin: 10px;
`;

const Footer = styled.footer`
background: #CBC7FC; 
padding: 10px;
display:flex;
justify-content: center;
* {
    text-decoration:none; 
    color:navy;
}
`;