import React, { useState } from 'react'
import { Container, Navbar, Badge } from 'react-bootstrap'
//Bootstrap
import { Cart4 } from 'react-bootstrap-icons'
//Components
import ProductList from './product/ProductList'
import CartDetails from './cart/CartDetails'
//Redux
import { useSelector, useDispatch } from 'react-redux'
//Css
import './home.css'
//Navigation
import { useHistory } from 'react-router-dom';

export default function Home() {
    
    const state = useSelector(state => state);
    const history = useHistory();

    let totalItens = 0;
    let totalPrice = 0;
    
    const cartItems = state.items.slice();

    //sum total items / price
    cartItems.forEach(element => {
        totalItens += element.qty;
        totalPrice += element.qty * element.price;
    });

    //show product details modal
    const goToCartDetails = () => {
        if(totalItens !== 0){
            history.push(`/cart`);  
        } 
    }

    return (
        <React.Fragment>

            <Navbar className="justify-content mb-3 topo">
                <Navbar.Brand><b>Tosquidão E-commerce</b></Navbar.Brand>
                <Cart4 onClick={e => goToCartDetails()} size={20} className="cursor"/>
                <Badge> {totalItens > 0 ? totalItens : null} </Badge>
                {totalItens > 0 ? (
                    <div>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice.toFixed(2))}
                    </div>
                ):null}
            </Navbar>

            <Container fluid>
                <ProductList />
            </Container>

            {/* <Navbar fixed="bottom" className="justify-content-center mb-3 tela">
                <b>Toquisdão E-commerce LTDA</b><CloudDrizzleFill/>
            </Navbar> */}

        </React.Fragment>
    )
}
