import react from "react";

import {
    Modal,
    Button,
} from "react-bootstrap";

export default function DeleteRecipe(props){
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Upozorenje</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Obrisati recept za: {props.naziv}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    variant="secondary"
                    onClick={() => props.close({
                        show: false,
                        recipe: ""
                    })}>
                        Odustani
                </Button>
                <Button 
                    variant="warning" 
                    onClick={() => {
                        props.del(props.naziv);
                        props.close({
                            show: false,
                            recipe: ""
                        })    
                    }}>
                    Izbriši
                </Button>
            </Modal.Footer>
        </Modal>
    )
}