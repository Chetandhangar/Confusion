import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle ,Breadcrumb, BreadcrumbItem, Modal ,ModalHeader , Label ,ModalBody,Button, Row, Col} from 'reactstrap';
import {LocalForm , Control , Errors} from 'react-redux-form'
import  { Link } from 'react-router-dom';

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
        console.log("current state is :" + JSON.stringify(values));
        alert("current state is: " + JSON.stringify(values));
    }

    render(){
        return(
            <React.Fragment>
                
            <Button  onClick={this.toggleModal}><span className="fa fa-edit fa-lg">Submit Comment</span></Button>
        
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Send Comment</ModalHeader>
                
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
                                    required , minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: "Required",
                                    minLength: "Must be greater than 2 char",
                                    maxLength: "Must be Less thab 16 char"
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
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );

    
    }

    function RenderComments({comments}) {
       if (comments != null)
        return(
               <div className='col-12 col-md-5 ml-1'>
                   <h4>Comments</h4>
                   <ul className="list-unstyled">
                        {
                        comments.map((comment) => {
                           return(
                               <li key={comment.id}>
                                   <p>{comment.comment}</p>
                                   <p>~~ {comment.author}</p>

                               </li>
                           );
                       })

                       }
                        </ul>
                        
                  <CommentForm />
               </div> 
           );
                       else
                       return(
                           <div></div>
                       )
                    }   

                const DishDetail = (props) => {
                    if(props.dish !=null)
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
                                    <RenderComments comments={props.comments} />
                                </div>
                           
                        </div>
                    );
                    else
                    return(
                        <div></div>
                    )
                }
    


export default DishDetail;

