import React from 'react';
//Bootstrap
import { Container, Row } from 'react-bootstrap';
//Graphql
import { GET_PRODUCTS } from '../Queries/productQueries';  
import { useQuery } from "@apollo/client";
//Components
import Product from './Product';

export default function ProductList({cart, setCart}) {
    
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if(loading){
        return(<div>Carregando produtos....</div>);
    }

    if(error){
        return(<div>Xiii...estamos com algum problema para retornar os produtos</div>);
    }
    
    return (
        <Container fluid>
            <Row>
            {
                data.getProducts.map(product => (
                    <Product key={product.productId} product={product} setCart={setCart} cart={cart}/>
                ))
            }
            </Row>
        </Container>
    )
}
