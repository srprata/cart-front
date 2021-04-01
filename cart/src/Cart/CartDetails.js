import React, { useState } from 'react'
import { Navbar, Row, Form, Container, Col, InputGroup, Button } from 'react-bootstrap'
//Icons
import { Plus, Dash, Trash } from 'react-bootstrap-icons';
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Navigation
import { useHistory } from 'react-router-dom';
//Components
import ErrorAlert from '../product/ErrorAlert';
//Generic
import { onlyNumbers } from '../generic/functions';
//Css
import './cartDetails.css';

export default function CartDetails({ show, close }) {

    const cart = useSelector(state => state);

    const cartItems = cart.items;

    const dispatch = useDispatch();

    const history = useHistory();

    const[showAlert, setShowAlert] = useState(false);
    const[msg, setMsg] = useState();
    let totalPrice = 0;

    cartItems.forEach(element => {
        totalPrice += element.qty * element.price;
    });

    //verify product stock
    const isProductOnStock = (val) => {
        return cart.stock - val  >= 0 ? true : false
    }

    //change qty manually
    const changeQty = (val) => {

        let value = val === '' ? 1 : val

        if(isProductOnStock(value)){
            dispatch({
                type: 'SET_QTY',
                qty: value,
                totalPrice: cart.price * value
            })
        }else{
            showStockError(`Estoque insuficiente (estoque atual: ${cart.stock})`)
        }
    }
    
    //decrement qty of itens
    const decrement = () => {
        //only decrement if theres itens on cart
        if(cart.qty > 1){
            dispatch({
                type: 'REM_PRODUCT',
                qty: 1,
                price: cart.price
            })
        }else{
            showStockError('Quantidade não pode ser 0')
        }
    }

    //increment qty of itens
    const increment = () => {
        if(isProductOnStock(cart.qty + 1)){
            dispatch({
                type: 'ADD_PRODUCT',
                qty: 1,
                price: cart.price
            })
        }else{
            showStockError(`Estoque insuficiente (estoque atual: ${cart.stock})`)
        }
    }

    //redirect to checkout page
    const finalizar = () => {
        history.push(`/order`);
    }

    //show modal msg error
    const showStockError = (msg) => {
        setMsg(msg);
        setShowAlert(true);
    }

    const emptyCart = () => {
        dispatch({
            type: 'CLEAR_CART'
        })
    }
// console.log(cartItems)
    return (
        <React.Fragment>

            <Navbar className="justify-content mb-3 topo">
                <Navbar.Brand><b>Tosquidão E-commerce</b></Navbar.Brand>
            </Navbar>

            <Container>

                {cartItems.map(item => (
                    <Form key={item.productId}>
                        <Form.Group className="row align-items-center">
                            <Form.Label as={Col} md={2}>
                                <img src={`/images/img${item.productId}.png`} alt={item.title} className="thumb"/>
                            </Form.Label>
                            <Form.Label as={Col} md={5}>
                                {item.description===null?' - ': item.description}
                            </Form.Label>
                            <Form.Label as={Col} md={2}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                    item.price===null?' - ': (item.price * item.qty).toFixed(2)
                                )}
                            </Form.Label>
                            <InputGroup as={Col} md={3}>
                                <InputGroup.Prepend>
                                    <Button variant="light" onClick={e => decrement()}><Dash /></Button>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    id="qtyItens"
                                    value={item.qty}
                                    placeholder="Insira a quantidade"
                                    onChange={e => onlyNumbers(e.target.value) ? changeQty(e.target.value) : cart.qty}
                                    maxLength={2}
                                />
                                <InputGroup.Append>
                                    <Button variant="light" onClick={e => increment()} title="Adicionar mais"><Plus /></Button>
                                </InputGroup.Append>
                                <Col md={1}/>
                                <Button variant="light" onClick={e => increment()} title="Remover item"><Trash /></Button>
                            </InputGroup>
                        </Form.Group>
                        <hr/>
                    </Form>
                ))}
                <Row>
                    <Col md={{ span: 2, offset: 7 }}>
                        R$ {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice.toFixed(2))}
                    </Col>
                    <Col md={3}>
                        <Button variant="success" onClick={finalizar} >
                            Finalizar Compra
                        </Button>
                    </Col>
                </Row>
            </Container>
            
            </React.Fragment>
    )
}
