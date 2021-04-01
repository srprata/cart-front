import React from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

export default function ErrorAlert({ showAlert, setShowAlert, msg }) {
    return (
        <React.Fragment>
            <Modal show={showAlert} onHide={setShowAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>Putz</Modal.Title>
                </Modal.Header>
                <Modal.Body align="center">
                <Alert show={showAlert} variant="danger">
                    <Alert.Heading>{msg}</Alert.Heading>
                </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAlert(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
