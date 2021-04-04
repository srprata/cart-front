import React from 'react';
//Redux
import { useSelector } from 'react-redux';
//Navigation
import { Link, useHistory } from 'react-router-dom';
//Css
import './topo.css'
//Bootstrap
import { Navbar, Badge } from 'react-bootstrap';
import { Cart4 } from 'react-bootstrap-icons';

export default function Menu({ info = null }) {

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
        <Navbar className="justify-content mb-3 topo">
            <Navbar.Brand>
                <Link to='/' className="link"><b>Tosquidão E-commerce {info}</b></Link>
            </Navbar.Brand>
            {/* <Navbar.Toggle /> */}
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="align-items-center">
                    {info === null ? (
                        <React.Fragment>
                            <Navbar.Toggle />
                            <Cart4 onClick={e => goToCartDetails()} size={20} className="cursor"/>
                            <Badge> {totalItens > 0 ? totalItens : null} </Badge>
                            {totalItens > 0 ? (
                                <React.Fragment>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice.toFixed(2))}
                                </React.Fragment>
                            ):null}
                        </React.Fragment>
                    ):null}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
