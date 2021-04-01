import React, { useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import ProductDetails from './ProductDetails';
//Css
import './product.css'

export default function Product({ product }){

    const[show, setShow] = useState(false);

    const showProductDetails = () =>{
        setShow(true);
    }

    //close modal with product details
    const close = () => {
        setShow(false);
    }
        
    return(
        <React.Fragment>
            <ProductDetails show={show} close={close} product={product}/>
            <Col xs={6} sm={6} md={4} lg={3} xl={3}>
                <Card className="bg-light mb-3 cursor" onClick={e => showProductDetails()}>
                    <Card.Img src={`/images/img${product.productId}.png`} className="img"/>
                    <Card.Body>
                        <Card.Title>{product.title===null?' - ': product.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment>
        
    );

}