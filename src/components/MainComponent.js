import React,{ Component } from 'react';
import { Switch , Route , Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Head from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';


class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
      };
  }

  

  
  render(){
    const HomePage = () =>{
      return(
      <Home  dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
      />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                      comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
             />
      );
    };

  return (
    <div>
      <Head />
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={ () =><Menu dishes={this.state.dishes} />}></Route>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path="/contactus" component={Contact}></Route>
        <Route exact apth="/aboutus" component={About}></Route>
        <Redirect to="/home" ></Redirect>
      </Switch>
      <Footer />
    </div>
  );
  }
}

export default Main;
