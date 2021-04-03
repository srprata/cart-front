import React from 'react'
import { Container } from 'react-bootstrap';
//Components
import ProductList from './product/ProductList';
import Menu from './Menu';

export default function Home() {

    return (
        <React.Fragment>

            <Menu />

            <Container fluid>
                <ProductList />
            </Container>

            {/* <Navbar fixed="bottom" className="justify-content-center mb-3 tela">
                <b>Toquisdão E-commerce LTDA</b><CloudDrizzleFill/>
            </Navbar> */}

        </React.Fragment>
    )
}
