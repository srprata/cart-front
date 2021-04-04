import React, { useState } from 'react'
import { Row, Form, Container, Col, InputGroup, Button } from 'react-bootstrap'
//Icons
import { Plus, Dash, Trash } from 'react-bootstrap-icons';
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Navigation
import { useHistory } from 'react-router-dom';
//Components
import Topo from '../Topo';
import AlertMsg from '../generic/AlertMsg';
import { changeProductQty, incrementProductBy1, decrementProductBy1, removeFromCart } from '../actions/cartAction';
//Generic
import { onlyNumbers } from '../generic/functions';
//Css
import './cartDetails.css';

export default function CartDetails({ show, close }) {

    const cartItems = useSelector(state => state.items);

    const dispatch = useDispatch();

    const history = useHistory();

    const[showAlert, setShowAlert] = useState(false);
    const[msg, setMsg] = useState();

    let totalPrice = 0;

    //test if cart is empty, if it is redirect to home page
    if(cartItems.length === 0){
        history.push('/');
    }

    cartItems.forEach(element => {
        totalPrice += element.qty * element.price;
    });

    const changeQty = (item, val) => {

        let valor = val === '' ? 1 : val;

        let items = changeProductQty(cartItems, item, valor);
        
        //items( 1-product out of stock, 2-qty = 0 )
        switch(items){
            case 1:
                showAlertBox(`Não temos estoque suficiente para ${item.title} (atual: ${item.stock})`);
                break;
            case 2:
                showAlertBox(`Zero(0) não pode amigão. Mas você pode remover do carrinho!'`);
                break;
            default:
                dispatch({
                    type: 'SET_QTY',
                    data: { items }
                });
                break;
        }

    }    

    //decrement qty of itens
    const decrement = item => {

        let items = decrementProductBy1(cartItems, item);

        //items = 1, error with qty, lower than 1
        if(items === 1){
            showAlertBox('Zero(0) não pode amigão. Mas você pode remover do carrinho!');
        }else{
            dispatch({
                type: 'DECREMENT_PRODUCT',
                data: { items }
            })
        }

    }

    //increment qty of itens
    const increment = item => {

        let items = incrementProductBy1(cartItems, item);

        if(items === 1){
            showAlertBox(`Infelizmente não temos mais estoque para ${item.title} (Estoque atual: ${item.stock})`);
        }else{
            dispatch({
                type: 'INCREMENT_PRODUCT',
                data: { items }
            });
        }
    }

    const remove = item => {

        let items = removeFromCart(cartItems, item);

        if(item === 1){
            showAlertBox(`O produto selecionado (${item.title}) para ser removido não foi encontrado no seu carrinho`);
        }else{
            dispatch({
                type: 'REMOVE_FROM_CART',
                data: { items }
            });

            if(cartItems.length > 0){
                showAlertBox(`${item.title} removido do seu carrinho!`);
            }
        }

    }

    //redirect to checkout page
    const finalizar = () => {
        history.push(`/order`);
    }

    //show modal msg error
    const showAlertBox = (msg) => {
        setMsg(msg);
        setShowAlert(true);
    }

    return (
        <React.Fragment>

            <Topo info=' - Carrinho' />

            <Container fluid>

                <AlertMsg showAlert={showAlert} setShowAlert={setShowAlert} msg={msg}></AlertMsg>

                {cartItems.map(item => (
                    <Form key={item.productId}>
                        <Form.Group className="row align-items-center mb-2">
                            <Form.Label as={Col} xs={4} md={4} lg={2} className="mb-2">
                                <img src={`/images/img${item.productId}.png`} alt={item.title} className="thumb"/>
                            </Form.Label>
                            <Form.Label as={Col} xs={8} md={8} lg={4} className="mb-2">
                                {item.description===null?' - ': item.description}
                            </Form.Label>
                            <Form.Label as={Col} xs={2} sm={3} md={{ span: 3, offset: 2 }} lg={{ span: 3, offset: 0 }} className="mb-2">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                    item.price===null?' - ': (item.price * item.qty).toFixed(2)
                                )}
                            </Form.Label>
                            <InputGroup as={Col} xs={{ span: 6, offset: 2 }} md={{ span: 3, offset: 0 }} lg={2}>
                                <InputGroup.Prepend>
                                    <Button variant="light" onClick={e => decrement(item)}><Dash /></Button>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    id="qtyItens"
                                    value={item.qty}
                                    onChange={e => onlyNumbers(e.target.value) ? changeQty(item, e.target.value) : item.qty}
                                    maxLength={2}
                                />
                                <InputGroup.Append>
                                    <Button variant="light" onClick={e => increment(item)} title="Adicionar mais"><Plus /></Button>
                                </InputGroup.Append>
                                <Col xs={5} md={1} lg={0}></Col>
                            </InputGroup>
                                <Button variant="light" onClick={e => remove(item)} title="Remover item"><Trash /></Button>
                        </Form.Group>
                        <hr/>
                    </Form>
                ))}
                <Row>
                    <Col xs={4} md={{ span: 3, offset: 2 }} lg={{ span: 2, offset: 6 }} className="mb-2">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice.toFixed(2))}
                    </Col>
                    <Col xs={6} md={{ span: 3, offset: 4 }} lg={{ span: 3, offset: 1 }}>
                        <Button variant="success" onClick={finalizar} >
                            Finalizar Compra
                        </Button>
                    </Col>
                </Row>
            </Container>
            
            </React.Fragment>
    )
}
