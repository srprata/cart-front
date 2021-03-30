import React, { useState } from 'react'
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
//Redux
import { useSelector } from 'react-redux'
//Graphql
import { useMutation } from "@apollo/client";
import { SAVE_ORDER } from '../Queries/orderQueries'

export default function Order() {

    const [creditCard, setCreditCard] = useState()
    
    const cart = useSelector(state => state)

    const [save_order] = useMutation(SAVE_ORDER);

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
        <React.Fragment>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <InputGroup className="mb-3">
                            <Form.Label column  sm={3}>Cartão:</Form.Label>
                            <Form.Control
                                type="text"
                                id="qtyItens"
                                placeholder="Digite os 4 primeiros dígitos do cartão"
                                onChange={e => setCreditCard(e.target.value)}
                                maxLength={4}
                            />
                        </InputGroup>
                        <Button variant="success" onClick={e => validateCreditCard()}>Comprar</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </React.Fragment>
    )
}
