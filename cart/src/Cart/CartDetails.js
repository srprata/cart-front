import React from 'react'
import { Modal, Button, Form, Col, InputGroup } from 'react-bootstrap'
import { Plus, Dash } from 'react-bootstrap-icons'
//Redux
import { useDispatch, useSelector } from 'react-redux'
//Navegacao
import { useHistory } from 'react-router-dom';

export default function CartDetails({show, close }) {

    const cart = useSelector(state => state)

    const dispatch = useDispatch()

    const history = useHistory()

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
            alert(`Estoque insuficiente (estoque atual: ${cart.stock})`)
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
        }
        alert(`Quantidade informada não pode ser inferior a 1`)
    }

    //increment qty of itens
    const increment = () => {
        if(isProductOnStock(cart.qty + 1)){
            dispatch({
                type: 'ADD_PRODUCT',
                qty: 1,
                price: cart.price
            })
            // setProductQty(cart.qty)
        }
    }

    const onlyNumbers = (val) => {
        if ((/^\d+$/.test(val) && val !== '0') || val === '') {
            return true
        }else{
            return false
        }
    }

    const finalizar = () => {
        history.push(`/order`);
    }

    return (
        <React.Fragment>
            {cart.productId !== null ? (
                <Modal show={show} onHide={close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Resumo da compra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="img">
                                <Form.Label column align="center"><img src={`/images/img${cart.productId}.png`} alt={cart.title}/></Form.Label>
                            </Form.Group>
                            <Form.Group controlId="title">
                                <Form.Label column>
                                    Produto: {cart.title}
                                </Form.Label>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup className="mb-3">
                                        <Form.Label column  sm={3}>Quantidade:</Form.Label>
                                        <InputGroup.Prepend>
                                            <Button variant="outline-secondary" onClick={e => decrement()}><Dash /></Button>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            id="qtyItens"
                                            value={cart.qty}
                                            placeholder="Insira a quantidade"
                                            onChange={e => onlyNumbers(e.target.value) ? changeQty(e.target.value) : cart.qty}
                                            maxLength={2}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={e => increment()}><Plus /></Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="price">
                            <Form.Label column>
                                    Valor da compra: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cart.totalPrice !== null && cart.totalPrice !== undefined ? cart.totalPrice.toFixed(2) :null)}
                            </Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={close}>
                            Fechar
                        </Button>
                        <Button variant="success" onClick={finalizar}>
                            Finalizar Compra
                        </Button>
                    </Modal.Footer>
                </Modal>
            ): null}
            </React.Fragment>
    )
}
