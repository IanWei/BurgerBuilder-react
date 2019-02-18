import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients) => {  
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFaild = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
  // return dispatch => {
  //   axios.get('https://react-my-burger-1d8f3.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       console.log(response.data);
  //       dispatch(setIngredients(response.data));
  //     })
  //     .catch(error => {
  //       console.log('GET_AN_ERROR');
  //       dispatch(fetchIngredientsFaild());
  //     });
  // };
};