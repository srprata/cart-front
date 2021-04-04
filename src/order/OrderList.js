import React, { useState } from 'react';
import { Table, Container, Row, Col, Alert } from 'react-bootstrap';
//Graphql
import { GET_ORDERS } from '../queries/orderQueries';
import { useQuery } from "@apollo/client";
//Components
import Topo from '../Topo';
import AlertMsg from '../generic/AlertMsg';
//Redux
import { useSelector } from 'react-redux'

export default function OrderList() {

    const cart = useSelector(state => state);
    const[showAlert, setShowAlert] = useState(cart.msg !== undefined ? true : false);

    const { loading, error, data } = useQuery(GET_ORDERS);

    if(loading){
        return(
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                    <Alert key={1} variant="info">Carregando pedidos....</Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    if(error){
        return(
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Alert key={1} variant="danger">Xiii...estamos com algum problema para retornar os pedidos</Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <React.Fragment>

            <Topo info=' - Carrinho' />

            <AlertMsg showAlert={showAlert} setShowAlert={setShowAlert} msg={cart.msg !== undefined ? cart.msg : null} />
        
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Total de Itens</th>
                        <th>Preço Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.getOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.totalItens}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.totalPrice.toFixed(2))}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </React.Fragment>
    )
}
