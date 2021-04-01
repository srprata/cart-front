import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ErrorAlert from './ErrorAlert';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartAction';
import { actionsTypes } from '../types';

export default function ProductDetails({ show, close, product}) {

    const[showAlert, setShowAlert] = useState(false);
    const[msg, setMsg] = useState();
    
    const cart = useSelector(state => state);

    const dispatch = useDispatch();

    //add product to cart  
    const buy = () => {

        let items = addToCart(cart, product);

        if(!items){
            setMsg(`Infelizmente não temos mais estoque para ${product.title}`);
             setShowAlert(true);
        }else{
            dispatch({
                type:actionsTypes.ADD_TO_CART,
                data: { items }
            })
        }
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ErrorAlert showAlert={showAlert} setShowAlert={setShowAlert} msg={msg}></ErrorAlert>
                    {showAlert? null: (
                        <React.Fragment>
                            <Form>
                                <Form.Group controlId="img">
                                    <Form.Label column align="center"><img src={`/images/img${product.productId}.png`} alt={product.title}/></Form.Label>
                                    <Form.Label column>
                                        <b>Descrição:</b> {product.description===null?' - ': product.description}
                                    </Form.Label>
                                    <Form.Label column>
                                        <b>Valor: </b>{product.priceBRL===null?' - ': product.priceBRL}
                                    </Form.Label>
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
