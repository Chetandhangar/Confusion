import React, { Component } from 'react';
import { Navbar , NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, ModalHeader,Button, Form , FormGroup, Input , Label } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { render } from '@testing-library/react';

class Head extends Component {

    constructor(props){
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        alert("username :" + this.username.value + " passeord : " +  this.password.value +
        " remember : " + this.remember.checked);

        event.preventDefault();

    }
        

    render(){
            return(
             <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                    <NavbarBrand className="mr-auto" href="/"> 
                        <img src="assets/images/logo.png" 
                        alt="Restorinto Con Fusion" />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem >
                            <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span>About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/menu'><span className="fa fa-list fa-lg"></span>Menu</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"></span>Contact US</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outlinr onClick={this.toggleModal}>
                                <span className="fa fa-sign-in fa-lg"></span>{' '}Login
                            </Button>
                        </NavItem>
                    </Nav>
                    </Collapse>
              </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inpiration from the word's best cuisines, and create a unique fusion experience. Our lipsmaking creation will tickel your culinery sense!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef ={(input) => this.username = input} >

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="passeord" name="password"
                                innerRef={(input) => this.password = input}></Input>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="submit" colot="primary">Login</Button>
                            </FormGroup>
                            
                             </Form>   
                    </ModalBody>
                </Modal>
             </React.Fragment>
            );
    }

}

export default Head;