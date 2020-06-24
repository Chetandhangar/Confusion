import React,{ Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Head from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';


class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish : null
    
    };
  }

  
  OnDishSelect(dishId){
    this.setState({selectedDish : dishId});
}

  
  render(){
  return (
    <div>
      <Head />
      <Menu dishes={this.state.dishes}
        onClick={(dishId) => this.OnDishSelect(dishId)} />
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      <Footer />
    </div>
  );
  }
}

export default Main;
