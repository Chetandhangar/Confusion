import React,{ Component } from 'react';
import { Switch , Route , Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Head from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {connect} from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreaters'; 

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
}
}

const mapDispatchToProps = dispatch =>({
  addComment: (dishId, rating , author, comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: () =>{ dispatch(fetchDishes())} 
});


class Main extends Component {

constructor(props){
  super(props)
}

  componentDidMount(){
    this.props.fetchDishes();
  }
  

  
  render(){
    const HomePage = () =>{
      return(
      <Home  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dihsesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                      isLoading={this.props.dishes.isLoading}
                      errMess={this.props.dishes.errMess}
                      comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                      addComment={this.props.addComment}
             />
      );
    };

  return (
    <div>
      <Head />
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={ () =><Menu dishes={this.props.dishes} />}></Route>
        <Route path='/menu/:dishId' component={DishWithId} />
        <Route exact path="/contactus" component={Contact}></Route>
        <Route exact apth="/aboutus" component={() => <About leaders={this.props.leaders} />}></Route>
        <Redirect to="/home" ></Redirect>
      </Switch>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
