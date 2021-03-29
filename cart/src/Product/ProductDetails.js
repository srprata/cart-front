import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ErrorAlert from './ErrorAlert'

export default function ProductDetails({show, close, product, cart, setCart}) {

    const[showAlert, setShowAlert] = useState(false);
    const[msg, setMsg] = useState();
    
    //add product to cart
    const addCart = () => {
        if(isProductOnStock()){
            setCart({
                productId: product.productId,
                title: product.title,
                description: product.description,
                price: product.priceReal,
                qty: cart.qty + 1,
                totalPrice: cart.totalPrice + product.price
            });
        }else{
            setMsg(`Infelizmente não temos mais estoque para ${product.title}`);
            setShowAlert(true);
        }
    }

    //verify product stock
    const isProductOnStock = () => {
        return product.qty - cart.qty > 0 ? true : false;
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
                            <img src={`/images/img${product.imgId}.png`} alt={product.title}/>
                        </div>
                        <div>
                            {product.description===null?' - ': product.description}
                        </div>
                        <div>
                            {product.priceReal===null?' - ': product.priceReal}
                        </div>
                    </React.Fragment>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={e => addCart()}>
                        Comprar
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}
