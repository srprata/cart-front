import React from 'react';
//Bootstrap
import { Alert, Container, Row, Col } from 'react-bootstrap';
//Graphql
import { GET_PRODUCTS } from '../queries/productQueries';  
import { useQuery } from "@apollo/client";
//Components
import Product from './Product';

export default function ProductList({cart, setCart}) {
    
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if(loading){
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                    <Alert key={1} variant="info">Carregando produtos....</Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    if(error){
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Alert key={1} variant="danger">Xiii...estamos com algum problema para retornar os produtos</Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <React.Fragment>
            <Row>
            {
                data.getProducts.map(product => (
                    <Product key={product.productId} product={product}/>
                ))
            }
            </Row>
        </React.Fragment>
    )
}
