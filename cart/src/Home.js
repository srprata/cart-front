import React from 'react'
import { Container } from 'react-bootstrap';
//Components
import ProductList from './product/ProductList';
import Topo from './Topo';

export default function Home() {

    return (
        <React.Fragment>

            <Topo />

            <Container fluid>
                <ProductList />
            </Container>

        </React.Fragment>
    )
}
