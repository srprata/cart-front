import React from 'react'
import { Alert, Button } from 'react-bootstrap'

export default function ErrorAlert({ showAlert, setShowAlert, msg }) {
    return (
        <React.Fragment>
            <Alert show={showAlert} variant="success">
                <Alert.Heading>Ops</Alert.Heading>
                    <p>
                        {msg}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => setShowAlert(false)} variant="outline-success">
                        Fechar...Buahhh
                    </Button>
                </div>
            </Alert>
        </React.Fragment>
    )
}
