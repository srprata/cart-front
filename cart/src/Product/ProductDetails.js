import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ErrorAlert from './ErrorAlert'
//Redux
import { useDispatch, useSelector } from 'react-redux'

export default function ProductDetails({show, close, product}) {

    const[showAlert, setShowAlert] = useState(false)
    const[msg, setMsg] = useState()
    
    const cart = useSelector(state => state)

    const dispatch = useDispatch()
    
    //verify if cart is empty
    const emptyCart = () => {
        return cart.productId === null ? true: false
    }

    //verify product stock
    const isProductOnStock = () => {
        return product.stock - cart.qty > 0 ? true : false
    }
    
    //add product to cart  
    const buy = () => {
        if(isProductOnStock()){
            emptyCart() ? addProduct() : addMore()
        }else{
            setMsg(`Infelizmente não temos mais estoque para ${product.title}`);
            setShowAlert(true);
        }
    }

    //add product to cart
    const addProduct = () => {
        dispatch({
            type:'SET_PRODUCT',
            productId: product.productId,
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            qty: 1,
        });

    }

    //add more products to cart
    const addMore = () => {
        dispatch({
            type: 'ADD_PRODUCT',
            qty: 1,
            price: product.price
        })
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body align="center">
                <ErrorAlert showAlert={showAlert} setShowAlert={setShowAlert} msg={msg}></ErrorAlert>
                {showAlert? null: (
                    <React.Fragment>
                        <div>
                            <img src={`/images/img${product.productId}.png`} alt={product.title}/>
                        </div>
                        <div>
                            {product.description===null?' - ': product.description}
                        </div>
                        <div>
                            {product.priceBRL===null?' - ': product.priceBRL}
                        </div>
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
