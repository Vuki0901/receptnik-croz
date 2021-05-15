import react, { useState } from "react";
import {
    Modal,
    InputGroup,
    FormControl,
    Button
} from "react-bootstrap";

export default function NewRecipe(props){
    const initial = {
        naziv: "",
        sastojci: [
            ["", ""]
        ]
    }
    const [CurrentRecipe, setCurrentRecipe] = useState(initial);
    const [BrojSastojaka, setBrojSastojaka] = useState(1);


    const SastojciUpdater = (i, x, val) => {
        //i - indeks sastojka koji se ažurira
        //x - sastojak ili količina - 0 ili 1
        //val - nova vrijednost
        const sastojci = [...CurrentRecipe.sastojci]
        //Ako se unosi podatak u novo dodano polje
        if (!sastojci[i]){ 
            for(let j = sastojci.length-1; j < i; j++) {
                sastojci.push(["", ""])
            } 
        }
        sastojci[i][x] = val;
        setCurrentRecipe({
            ...CurrentRecipe,
            sastojci: sastojci
        });
    }

    return (
        <Modal show={props.show}>   
            <Modal.Header>
                <Modal.Title>Novi Recept</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl placeholder="Naziv Recepta" value={CurrentRecipe.naziv || ""} onChange={e => setCurrentRecipe({...CurrentRecipe, naziv:e.target.value})}/>
                <hr />
                {
                    [...Array(BrojSastojaka)].map((e, i) => {return (
                        <InputGroup key={i} style={{marginBottom: "5px"}}>
                            <FormControl placeholder="Sastojak" onChange={e => SastojciUpdater(i, 0, e.target.value)}/>
                            <FormControl placeholder="Količina" onChange={e => SastojciUpdater(i, 1, e.target.value)}/>
                        </InputGroup>
                    )})
                }
                <Button style={{marginTop: "20px"}} variant="outline-success" onClick={() => setBrojSastojaka(BrojSastojaka + 1)}>
                    + Dodaj Sastojak
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setBrojSastojaka(1);
                    props.toggleShow({show: false});
                }}>Zatvori</Button>
                <Button variant="warning" onClick={() => {
                    props.add(CurrentRecipe)
                    props.toggleShow({show: false})
                    setBrojSastojaka(1);
                    setCurrentRecipe(initial)}}>
                    Spremi
                </Button>
            </Modal.Footer>
        </Modal>
    )
}