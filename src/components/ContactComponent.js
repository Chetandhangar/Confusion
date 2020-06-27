import React ,{ Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Form, Input, FormGroup, Button, Label, Col,FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';


class Contact extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum:'',
            email: '',
            agree: false,
            cotactType:'tel.',
            message:'',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false

            }

        }

        this.HandelInputChange = this.HandelInputChange.bind(this);
        this.HandelSubmit = this.HandelSubmit.bind(this);

    }

    
    HandelInputChange(event){
         const target = event.target;
         const value = target.type === 'checkbos' ? target.checked : target.value;
         const name = target.name;

         this.setState({
             [name] : value
         });


    }

    HandelSubmit(event){
        console.log("Current State is: " + JSON.stringify(this.state));
        alert("Current state is: " + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }
    
    Validate(firstname, lastname, telnum, emial){

        const errors = {
            firstname:'',
            lastname:'',
            telnum:'',
            email:''
        };

        if(this.state.touched.firstname && firstname.length < 3)
        errors.firstname= 'First name should be greater than 3 characters';
        else if (this.state.touched.firstname && firstname.length >=10)
        errors.firstname= 'first name should be >= 10 character';

        if(this.state.touched.lastname && lastname.length <3 )
        errors.lastname = 'Last Name should be > 3 characters';
        else if (this.state.touched.lastname && lastname.length >=10)
        errors.lastname= 'Last Name shold be <= 10 characters';

        const reg = /^\d+$/;

        if(this.state.touched.telnum && !reg.test(telnum))
        errors.telnum = 'Tel. numbers should contain onle numbers';
      
        if(this.state.touched.email && emial.split('').filter(x => x === '@'.length !== 1))
        errors.email = 'Email should have @ sign'

        return errors;

    }


    render(){

        const errors = this.Validate(this.state.firstname , this.state.lastname , this.state.telnum , this.state.email)

    return(

        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Conatact Us</h3>
                    <hr />
                </div>
            </div>
              <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
            </div>
            <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                    121, Clear Water Bay Road<br />
                    Clear Water Bay, Kowloon<br />
                    HONG KONG<br />
                    <i className="fa fa-phone"></i>: +852 1234 5678<br />
                    <i className="fa fa-fax"></i>: +852 8765 4321<br />
                    <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
            </div>
            <div className="col-12 col-sm-6 offset-sm-1">
                <h5>Map of our Location</h5>
            </div>
            <div className="col-12 col-sm-11 offset-sm-1">
                <div className="btn-group" role="group">
                    <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                    <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                    <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                </div>
            </div>
        </div>
        <div className="row row-content">
            <div className="col-12">
                <h3>Send Your Feedback</h3>
            </div>
            <div className="col-12 col-md-9">
            <Form onSubmit={this.HandelSubmit}>
                <FormGroup row>
                <Label htmlFor="firstname" md={2}>Fitst Name</Label>
                <Col md={10}>
                <Input type="text" id="firstname" name="firstname" placeholder="First Name"
                value={this.state.firstname} 
                valid={errors.firstname === ''}
                invalid={errors.firstname !== '' }
                onBlur={this.handleBlur('firstname')}
                onChange={this.HandelInputChange}></Input>
                <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
                </FormGroup>

                <FormGroup row>
                    <Label htmlFor="lastname" md={2}>Last name</Label>
                    <Col md={10}>
                        <Input type="text" id="lastname" name="lastname" placeholder="Last Name"
                        value={this.state.lastname} 
                        valid={errors.lastname === ''}
                        invalid={errors.lastname !== '' }
                        onBlur={this.handleBlur('lastname')}
                        onChange={this.HandelInputChange}></Input>
                        <FormFeedback>{errors.lastname}</FormFeedback>
                    </Col>
                 </FormGroup>

                 <FormGroup row>
                     <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                     <Col md={10}>
                        <Input type="tel" id="telnum" name="telnum" placeholder="Contact Num"
                        value={this.state.telnum}
                        valid={errors.telnum === ''}
                        invalid={errors.telnum !== ''}
                        onBlur={this.handleBlur('telnum')}
                        onChange={this.HandelInputChange}>
                        </Input>    
                        <FormFeedback>{errors.telnum}</FormFeedback>
                     </Col>  
                 </FormGroup>

                 <FormGroup row>
                    <Label htmlFor="emial" md={2}>Email</Label>
                    <Col md={10}>
                        <Input type="email" id="email" name="email" placeholder="Emial"
                        value={this.state.email} 
                        valid={errors.email === ''}
                        invalid={errors.email !== ''}
                        onBlur={this.handleBlur('email')}
                        onChange={this.HandelInputChange}></Input>
                        <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                 </FormGroup>
                <FormGroup row>
                 <Col md={{size: 6 , offset:2}}>
                    <FormGroup check>
                        <Label check>
                            <Input type ="checkbox" name="agree" checked={this.state.agree} onChange={this.HandelInputChange} ></Input> { ' '}
                            <strong>May We Contact You ?</strong>
                        </Label>
                    </FormGroup>
                 </Col>
                 <Col md={{size: 3 , offset:1}}>
                     <Input type="select" name="contactType" value={this.state.contactType} onChange={this.HandelInputChange}>
                         <option>Tel.</option>
                         <option>Email</option>
                        </Input> 
                     </Col>
                 </FormGroup>

                <FormGroup row>
                    <Label htmlFor="message" md={2}>Your Feedback</Label>
                    <Col md={10}>
                        <Input type="textarea"id="message" name="message" 
                        rows="12"
                        value={this.state.message} onChange={this.HandelInputChange}></Input>
                    </Col>
                </FormGroup>
               
                <FormGroup row>
                    <Col md={{size: 10 , offset: 2}}> 
                    <Button type="submit" color="primary">submit</Button>
                    </Col>
                </FormGroup>

            </Form>
            </div>
        </div>
    </div>
    );
    }   
    
}

export default Contact;