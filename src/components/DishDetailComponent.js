import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderComment(comments){
        if(comments == null){
            return<div></div>
        }
        const cmts = comments.map((comment) => {
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>~~{comment.author},
                        {comment.date}
                    </p>
                    
                </li>
            )
        })

        return(
            <div className="col-12 col-md-5 ml-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmts}
                </ul>                
            </div>
        )
    }
    
    
    
    renderDish(dish) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    render() {
        const dish = this.props.dish;
        if(dish == null){
            return<div></div>
        }else
        return (
            <div className='row'>
           
            {this.renderDish(dish)}
            {this.renderComment(dish.comments)}
            </div>
        )
    }
}

export default Dishdetail

