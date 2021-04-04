import React, { useState } from 'react'
import { Form, Button, Col, Container, Card } from 'react-bootstrap'
//Redux
import { useSelector, useDispatch } from 'react-redux'
//Graphql
import { useMutation } from "@apollo/client";
import { SAVE_ORDER } from '../queries/orderQueries'
import { onlyNumbers } from '../generic/functions';
//Components
import Topo from '../Topo';
import AlertMsg from '../generic/AlertMsg';
//Navigation
import { useHistory, Link } from 'react-router-dom';
import '../topo.css'

export default function Order() {

    const [creditCard, setCreditCard] = useState('');
    const[showAlert, setShowAlert] = useState(false);
    const[msg, setMsg] = useState();
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.items);

    //test if cart is empty, if it is redirect to home page
    if(cartItems.length === 0){
        history.push('/');
    }

    let totalPrice = 0;
    let totalItems = 0;

    cartItems.forEach(element => {
        //problem with mutation __typename
        delete element.__typename;
        totalItems += element.qty;
        totalPrice += element.qty * element.price;
    });

    const [save_order] = useMutation(SAVE_ORDER);

    //validate creditcard
    const validateCreditCard = () => {
        switch (creditCard) {
            case '1111111111111111':
                showAlertBox('Cartão inválido');
                break;
            case '4444444444444444':
                saveOrder();
                break;
            default:
                showAlertBox('Digite tudo 4 para finalizar a compra')
                break;
        }
    }

    //show modal msg error
    const showAlertBox = (msg) => {
        setMsg(msg);
        setShowAlert(true);
    }

    const saveOrder = e => {
        save_order({
            variables: {
                products: cartItems,
                totalPrice: totalPrice,
                totalItens: totalItems
            }
        })
        .then(response => {
            dispatch({
                type: 'CLEAR_CART',
                msg: 'Compra efetuada com sucesso'
            });
            history.push(`/ordersList`);
            // showAlertBox('Parabéns! Compra realizada com sucesso!');

        })
        .catch(response => {
            showAlertBox('Ocorreu um erro ao tentar realizar o pagamento! Por favor tente novamente!');
            console.log(response)
        })
    }

    return (

        <React.Fragment>

            <Topo info=' - Checkout' />
            
            <Container fluid>

                <AlertMsg showAlert={showAlert} setShowAlert={setShowAlert} msg={msg} />

                <Form>
                    <Form.Group as={Col} className="row align-items-center">
                        <Col xs={12} md={5} lg={3} className="mb-2">
                            <Form.Control
                                type="text"
                                id="qtyItens"
                                placeholder="Digite os 16 dígitos do cartão"
                                value={creditCard}
                                onChange={e => onlyNumbers(e.target.value) ? setCreditCard(e.target.value) : ''}
                                maxLength={16}
                            />
                        </Col>
                        <Col xs={12} md={1} lg={2} className="mb-2">
                            <Button variant="success" onClick={e => validateCreditCard()}>Concluir Compra</Button>
                        </Col>
                        <Col xs={12} md={{ span: 4, offset: 2 }} lg={3} className="mb-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Resumo</Card.Title>
                                    <Card.Subtitle className="text-muted">
                                        <br/>
                                        <div className="div">
                                            Itens: {totalItems}
                                            <Link to='/cart' className="link"> (Visualizar Itens)</Link>
                                        </div>
                                        <br/>
                                        <div>
                                            Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice.toFixed(2))}
                                        </div>
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
    
        </React.Fragment>
    )
}
