import React from 'react';
import Button from './Button.jsx';
import Form from './Form.jsx';
import Input from './Input.jsx';
import Title from './Title.jsx';

const IngredientForm = ({
  newIngredient,
  setNewIngredient,
  handleClickIngredient,
}) => {
  return (
    <Form>
      <Title>Add an ingredient</Title>
      <label>Please enter the name of ingredient:</label>
      <Input
        value={newIngredient.name}
        onChange={(ev) =>
          setNewIngredient({ ...newIngredient, name: ev.target.value })
        }
      />
      <label>Please confirm if vegetarian:</label>
      <Input
        type='checkbox'
        checked={newIngredient.vegetarian}
        onChange={(ev) => {
          if (ev.target.checked) {
            setNewIngredient({ ...newIngredient, vegetarian: true });
          } else {
            setNewIngredient({ ...newIngredient, vegetarian: false });
          }
        }}
      />
      <label>Please enter number of calories:</label>
      <Input
        value={newIngredient.calories}
        onChange={(ev) =>
          setNewIngredient({ ...newIngredient, calories: ev.target.value })
        }
      />
      <Button onClick={handleClickIngredient}>Click to add Ingredient</Button>
    </Form>
  );
};

export default IngredientForm;
