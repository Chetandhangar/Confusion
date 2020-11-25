import React,{ Component } from 'react';
import { Switch , Route , Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Head from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Favorites from './FavoriteComponent';
import {connect} from 'react-redux';
import { postComment, fetchDishes, fetchComments , fetchPromos , fetchLeaders, postFeedback,loginUser, logoutUser, fetchFavorites, googleLogin, postFavorite, deleteFavorite } from '../redux/ActionCreaters'; 
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites : state.favorites,
    auth : state.auth
}
}

const mapDispatchToProps = dispatch =>({
  postComment: (dishId, rating , author, comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes: () =>{ dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (feedback) => {dispatch(postFeedback(feedback))},
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  googleLogin: () => dispatch(googleLogin()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});


class Main extends Component {

constructor(props){
  super(props)
}

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }
  
  componentWillUnmount() {
    this.props.logoutUser();
  }

  
  render(){
    const HomePage = () =>{
      return(
      <Home  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dihsesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
      />
      );
    }

    const DishWithId = ({match}) => {
      return(
          (this.props.auth.isAuthenticated && this.props.favorites.favorites)
          ?
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            favorite={this.props.favorites.favorites.dishes.some((dish) => dish === match.params.dishId)}
            postFavorite={this.props.postFavorite}
            />
          :
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
            favorite={false}
            postFavorite={this.props.postFavorite}
            />
        );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

  return (
    <div>
      <Head 
      auth={this.props.auth} 
      loginUser={this.props.loginUser} 
      logoutUser={this.props.logoutUser}
      googleLogin={this.props.googleLogin}
      />
       <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} dishes={this.props.dishes} deleteFavorite={this.props.deleteFavorite} />} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      <Footer />
     
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
