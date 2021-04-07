import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import AlertMsg from '../generic/AlertMsg';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartAction';
import { actionsTypes } from '../types';

export default function ProductDetails({ show, close, product }) {

    const[showAlert, setShowAlert] = useState(false);
    const[msg, setMsg] = useState();
    const[showProductOnCart, setShowProductOnCart] = useState(false);
    
    const cart = useSelector(state => state.items);

    const dispatch = useDispatch();

    //add product to cart  
    const buy = () => {

        let items = addToCart(cart, product);

        if(items === true){
            setMsg(`Infelizmente não temos mais estoque para ${product.title}. Estoque atual é de ${product.stock}`);
            setShowAlert(true);
        }else{
            dispatch({
                type:actionsTypes.ADD_TO_CART,
                data: { items }
            });
            setShowProductOnCart(true);
            setTimeout(() => (setShowProductOnCart(false)), 1500);
        }
    }


    return (
        <React.Fragment>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlertMsg showAlert={showAlert} setShowAlert={setShowAlert} msg={msg}></AlertMsg>
                    {showAlert? null: (
                        <React.Fragment>
                            <Form>
                                <Form.Group controlId="img">
                                    <Form.Label column align="center"><img src={`/images/img${product.productId}.png`} alt={product.title}/></Form.Label>
                                    <Form.Label column>
                                        <b>Descrição:</b> {product.description===null?' - ': product.description}
                                    </Form.Label>
                                    <Form.Label column>
                                        <b>Valor: </b>{product.price===null?' - ': new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price.toFixed(2))}
                                    </Form.Label>
                                    {showProductOnCart ? (
                                        <Alert variant="success">
                                            Produto adicionado ao carrinho
                                        </Alert>
                                    ): null}
                                </Form.Group>
                            </Form>
                        </React.Fragment>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="secondary" onClick={close}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={e => buy()}>
                        Comprar
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}
