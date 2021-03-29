import React, { useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import ProductDetails from './ProductDetails';

export default function Product({ product, cart, setCart }){

    const[show, setShow] = useState(false);

    //show product details modal
    const showProductDetails = () =>{
        setShow(true);
    }

    //close modal with product details
    const close = () => {
        setShow(false);
    }
        
    return(
        <React.Fragment>
            <ProductDetails show={show} close={close} product={product} cart={cart} setCart={setCart}/>
            <Col>
                <Card className="bg-light mb-3" onClick={e => showProductDetails()}>
                    <Card.Img src={`/images/img${product.imgId}.png`} />
                    <Card.Body>
                        <Card.Title>{product.title===null?' - ': product.title}</Card.Title>
                        <Card.Text>{product.priceReal===null?' - ': product.priceReal}</Card.Text>
                    </Card.Body>

                </Card>
            </Col>
        </React.Fragment>
        
    );

}