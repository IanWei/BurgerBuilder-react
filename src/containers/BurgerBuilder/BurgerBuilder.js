import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys( ingredients )
      .map( igKey => {
        return ingredients[ igKey ]
      } )
      .reduce( (sum, el) => {
        return sum + el;
      }, 0 );
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREIDENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREIDENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);    
  // }

  purchaseHandler = () => {
    if ( this.props.isAuthenticate ) {
      this.setState( { purchasing: true } );
    } else {
      this.props.onSetAuthRedirectPath( '/checkout' );
      this.props.history.push( '/auth' );
    }

  };

  purchaseCancelhandler = () => {
    this.setState( { purchasing: false } );
  };

  // purchaseContinueHandler = () => {
  //   // alert('You continue!');

  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  //   }
  //   queryParams.push('price=' + this.state.totalPrice);
  //   const queryString = queryParams.join('&');
  //   this.props.history.push({
  //     pathname: '/checkout',
  //     search: '?' + queryString
  //   });
  // }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push( '/checkout' );
  };

  render() {
    const disableInfo = {
      ...this.props.ings
    };
    for ( let key in disableInfo ) {
      disableInfo[ key ] = disableInfo[ key ] <= 0
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Ingreident can't be loaded!</p> : <Spinner/>;

    if ( this.props.ings ) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            isAuth={this.props.isAuthenticate}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState( this.props.ings )}
            ordered={this.purchaseHandler}
            price={this.props.price}/>
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelhandler}
        purchaseContinued={this.purchaseContinueHandler}/>;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticate: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch( actions.addIngredient( ingName ) ),
    onIngredientRemoved: (ingName) => dispatch( actions.removeIngredient( ingName ) ),
    onInitIngredients: () => dispatch( actions.initIngredients() ),
    onInitPurchase: () => dispatch( actions.purchaseInit() ),
    onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath( path ) )
  }
};


export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );




