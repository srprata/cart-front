import React, { useState } from 'react'
import { Form, Button, Col, Container, Navbar } from 'react-bootstrap'
//Redux
// import { useSelector } from 'react-redux'
//Graphql
// import { useMutation } from "@apollo/client";
// import { SAVE_ORDER } from '../queries/orderQueries'
import { onlyNumbers } from '../generic/functions';

export default function Order() {

    const [creditCard, setCreditCard] = useState()
    
    // const cart = useSelector(state => state)

    // const [save_order] = useMutation(SAVE_ORDER);

    //validate creditcard
    const validateCreditCard = () => {
        switch (creditCard) {
            case '0000':
                alert('Cartão inválido')
                break;
            case '4444':
                alert('Cartão válido')
                break;
            default:
                alert('Digite 4444 para finalizar a compra')
                break;
        }
    }

    return (
        <Container fluid>
            <Navbar className="bg-light justify-content mb-3">
                <Navbar.Brand><b>Tosquidão E-commerce - Dados para pagamento</b></Navbar.Brand>
            </Navbar>
            <Form>
                <Form.Group>
                    {/* <Form.Label><b>Cartão:</b></Form.Label> */}
                    <Col md={4}>
                    <Form.Control
                        type="text"
                        id="qtyItens"
                        placeholder="Digite os 4 primeiros dígitos do cartão"
                        value={creditCard}
                        onChange={e => onlyNumbers(e.target.value) ? setCreditCard(e.target.value) : ''}
                        maxLength={4}
                    />
                    </Col>
                    {/* <Col md={9}></Col> */}
                </Form.Group>
                <Form.Group controlId="price">
                    <Col>
                        <Button variant="success" onClick={e => validateCreditCard()}>Comprar</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}
