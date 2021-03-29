import React, { useState } from 'react'
import { Container, Navbar, Badge } from 'react-bootstrap'
//Bootstrap
import { Basket } from 'react-bootstrap-icons'
//Components
import ProductList from './Product/ProductList'
import CartDetails from './Cart/CartDetails'

export default function Home() {

    //cart object
    const[cart, setCart] = useState({
        productId: null,
        title: null,
        description: null,
        price: 0,
        qty: 0,
        totalPrice: 0
    });

    //modal status
    const[showCart, setShowCart] =  useState(false)

    //show product details modal
    const showCartDetails = () =>{
        setShowCart(true)
    }

    //close modal with product details
    const close = () => {
        setShowCart(false)
    } 

    return (
        <Container fluid>

            <Navbar className="bg-light justify-content mb-3">
                <Navbar.Brand>Tosquidão E-commerce</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Basket onClick={e => showCartDetails()}/>
                <Badge> {cart.qty > 0 ? cart.qty : null} </Badge>
                {cart.qty > 0 ? (
                    <div>
                        R$: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cart.totalPrice.toFixed(2))}
                    </div>
                ):null}
            </Navbar>

            <CartDetails show={showCart} close={close} cart={cart} setCart={setCart}/>
            
            <ProductList cart={cart} setCart={setCart}/>

        </Container>
    )
}
