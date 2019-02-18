import { put } from 'redux-saga/effects';
import axios from "../../axios-orders";
import * as actions from '../actions';

export function* initIngridentsSaga(action) {
  try {
    const response = yield axios.get( 'https://react-my-burger-1d8f3.firebaseio.com/ingredients.json' );
    console.log( response );
    yield put( actions.setIngredients( response.data ) );
  } catch ( error ) {
    console.log( 'GET_AN_ERROR' );
    yield put( actions.fetchIngredientsFaild() );
  }
}