import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle ,Breadcrumb, BreadcrumbItem, Modal ,ModalHeader , Label ,ModalBody,Button, Row, Col} from 'reactstrap';
import {LocalForm , Control , Errors, formReducer} from 'react-redux-form'
import  { Link } from 'react-router-dom';
import  { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, FadeTransform , Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const minLength = (len) => (val) => !(val) || (val.length > len);
const maxLength = (len) => (val) => !(val) || (val.length < len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);

        this.state={
            isModalOpen:false
        }

    }

    toggleModal = () =>{
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    HandleSubmit(values){
       this.props.postComment(this.props.dishId , values.rating, values.author , values.comment )
    }

    render(){
        return(
            <React.Fragment>
                
            <Button  onClick={this.toggleModal}><span className="fa fa-edit fa-lg">Submit Comment</span></Button>
        
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                
                <ModalBody>
                    <LocalForm onSubmit={(values) => {this.HandleSubmit(values)}}>

                        <Row className="form-group">
                            
                            <Label htmlFor='rating' md={{size : 6}}>Rating</Label>
                            </Row>

                            <Row className="form-group">
                              <Col md={12}>  
                            <Control.select model=".rating"  name="rating" className="col-12 col-md-10" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                             </Control.select>
                            </Col>
                        </Row>
                            
                        <Row className="form-group">
                            <Label htmlFor=".author" md={{size: 6}}>Your Name</Label>
                        </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author" className="control-form"
                                className="col-12 col-md-10"
                                validators={{
                                    required , minLength: minLength(2), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: "Required",
                                    minLength: "Must be greater than 2 char",
                                    maxLength: "Must be 15 characters or less"
                                }}
                                ></Errors>
                                </Col>
                            </Row>

                        <Row className="form-group">
                            <Label htmlFor="comment" md={{size: 6}}>Comment</Label>
                        </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="col-12 col-md-10"
                                    className="control-form" />
                                </Col>
                            </Row>

                             
                <Row className="form-group">
                    <Col md={{size: 12}}> 
                    <Button type="submit" color="primary">Submit</Button>
                    </Col>
                </Row>

                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
           

        )
    }

}


    function RenderDish({dish}) {
        return(
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform   in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }} >
                    <Card>
                        <CardImg top src={ baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>
            );

    
    }

    function RenderComments({comments, postComment, dishId}) {
       if (comments != null)
        return(
               <div className='col-12 col-md-5 ml-1'>
                   <h4>Comments</h4>
                   <ul className="list-unstyled">
                   <Stagger in>
                        {
                            
                        comments.map((comment) => {
                           return(
                               <Fade in>
                               <li key={comment.id}>
                                   <p>{comment.comment}</p>
                                   <p>~~ {comment.author},{new Intl.DateTimeFormat('en-us' , {year: 'numeric', month: 'short' ,day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>

                               </li>
                               </Fade>
                           );
                       })
                        
                       }
                       </Stagger>
                        </ul>
                        
                  <CommentForm dishId={dishId} postComment={postComment}/>
               </div> 
           );
                       else
                       return(
                           <div></div>
                       )
                    }   

                const DishDetail = (props) => {
                    if(props.isLoading){
                        return(
                            <div className="container">
                                <div className="row">
                                    <Loading />
                                </div>
                            </div>
                        );
                    }
                    else if(props.errMess){
                        return(
                            <div className="container">
                                <div className="row">
                                    <h4>{props.errMess}</h4>
                                </div>
                            </div>
                        );
                    }
                    else if(props.dish !=null)
                    return (
                        <div class="container">
                            <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{props.dish.name}</h3>
                                    <hr />
                                </div>
                                </div>
                                <div className="row">
                                    <RenderDish dish={props.dish} />
                                    <RenderComments comments={props.comments} 
                                    postComment={props.postComment}
                                    dishId={props.dish.id}
                                    />
                                </div>
                           
                        </div>
                    );
                    else
                    return(
                        <div></div>
                    )
                }
    


export default DishDetail;

