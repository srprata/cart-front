import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { Plus, Dash } from 'react-bootstrap-icons'

export default function CartDetails({show, close, cart, setCart}) {

    //subtract qty of itens
    const subtract = () => {
        setCart({
            qty: cart.qty - 1
        })
    }

    //increment qty of itens
    const increment = () => {
        setCart({
            qty: cart.qty + 1
        })
    }

    return (
        <React.Fragment>
            {cart.productId !== null ? (
                <Modal show={show} onHide={close}>
                    <Modal.Header closeButton>
                    <Modal.Title>Resumo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="img">
                                <Form.Label column align="center"><img src={`/images/img${cart.productId}.png`} alt={cart.title}/></Form.Label>
                            </Form.Group>
                            <Form.Group controlId="title">Produto: {cart.title}</Form.Group>
                            <Form.Row>
                                    <Col>
                                        Quantidade
                                    </Col>
                                    <Col>
                                        <Dash onCLick={e => subtract()}/>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                         type="text"
                                         value={cart.qty}
                                         placeholder="Insira a quantidade"
                                         onChange={e => setCart({
                                             qty: e.target.value
                                         })}
                                         />
                                    </Col>
                                    <Col>
                                        <Plus onClick={e => increment()}/>
                                    </Col>
                                
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
                        <Button variant="success">
                            Finalizar Compra
                        </Button>
                    </Modal.Footer>
                </Modal>
            ): null}
            </React.Fragment>
    )
}
