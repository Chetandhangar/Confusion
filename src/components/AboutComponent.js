import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';


function About(props){
    return(
        <div className="container">
            <div classname="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About US</BreadcrumbItem>
                </Breadcrumb>
                <div classname="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
        </div>
    );

}
export default About;