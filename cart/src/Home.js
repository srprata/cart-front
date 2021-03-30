import React, { useState } from 'react'
import { Container, Navbar, Badge } from 'react-bootstrap'
//Bootstrap
import { Basket } from 'react-bootstrap-icons'
//Components
import ProductList from './Product/ProductList'
import CartDetails from './Cart/CartDetails'
//Redux
import { useSelector, useDispatch } from 'react-redux'
//Css
import './home.css'

export default function Home() {
    const cart = useSelector(state => state)
    const dispatch = useDispatch();
    
    // console.log(cart)

    //modal status
    const[showCart, setShowCart] =  useState(false)

    //show product details modal
    const showCartDetails = () =>{
        setShowCart(true)
    }

    //close modal with product details
    const close = () => {
        setShowCart(false)
        initializeCart()
    } 

    const initializeCart = () => {
        if(cart.qty === 0){
            dispatch({
                type: 'CLEAR_CART'
            })
        }
    }

    return (
        <Container fluid className="tela">

            <Navbar className="bg-light justify-content mb-3">
                <Navbar.Brand>Tosquidão E-commerce</Navbar.Brand>
                <Basket onClick={e => showCartDetails()} size={20} className="cursor"/>
                <Badge> {cart.qty > 0 ? cart.qty : null} </Badge>
                {cart.qty > 0 ? (
                    <div>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cart.totalPrice.toFixed(2))}
                    </div>
                ):null}
            </Navbar>

            <CartDetails show={showCart} close={close}/>
            
            <ProductList />

        </Container>
    )
}
