import React,{ Component } from 'react';
import { Switch , Route , Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Head from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes';


class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      };
  }

  

  
  render(){
    const HomePage = () =>{
      return(
      <Home />
      );
    }
  return (
    <div>
      <Head />
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={ () =><Menu dishes={this.state.dishes} />}></Route>
        <Redirect to="/home" ></Redirect>
      </Switch>
      <Footer />
    </div>
  );
  }
}

export default Main;
