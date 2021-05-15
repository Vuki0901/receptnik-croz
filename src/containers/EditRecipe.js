import react, { useState } from "react";

import { 
    BiTrash,
    BiPlus
} from "react-icons/bi";

import {
    Modal,
    InputGroup,
    FormControl,
    Button
} from "react-bootstrap";

export default function EditRecipe(props){
    const recipeEditing = {...props.recipe}
    const [Recipe, setRecipe] = useState(recipeEditing);

    const nameChangeHandler = (newName) => {
        setRecipe({
            ...Recipe,
            naziv: newName
        })
    }

    const ingredientsUpdater = (i, x, val) => {
        //i - indeks sastojka koji se ažurira
        //x - sastojak ili količina - 0 ili 1
        //val - nova vrijednost
        let sastojci = [...Recipe.sastojci]

        //Ako se unosi podatak u novo dodano polje 
        if (!(sastojci[i])){ 
            for(let j = sastojci.length-1; j < i; j++) {
                sastojci.push(["", ""])
            } 
        }
        
        let sastojak = sastojci[i].slice();
        sastojak[x] = val;
        sastojci[i] = sastojak
        setRecipe({
            ...recipeEditing,
            sastojci
        });
    }

    const deleteIngredient = (index) => {
        const sastojci = [...Recipe.sastojci.filter((el, i) => i !== index)]
        setRecipe({
            naziv: Recipe.naziv,
            sastojci
        });
    }

    const addIngredient = () => {
        const sastojci = [...Recipe.sastojci];
        sastojci.push(["", ""])
        setRecipe({
            ...Recipe,
            sastojci
        })
    }

    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>
                    Ažuriranje Recepta
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl 
                    placeholder="Naziv recepta" 
                    value={Recipe.naziv} 
                    onChange={e => nameChangeHandler(e.target.value)}
                />
                <hr />
                {
                    Recipe.sastojci.map((ingredient, i) => {
                        return (
                            <InputGroup key={i} style={{marginBottom: "5px"}}>
                                <FormControl 
                                    value={ingredient[0]}
                                    placeholder="Sastojak"
                                    onChange={e => ingredientsUpdater(i, 0, e.target.value)}/>
                                <FormControl 
                                    value={ingredient[1]}
                                    placeholder="Količina"
                                    onChange={e => ingredientsUpdater(i, 1, e.target.value)}/>
                                <Button variant="danger" onClick={() => deleteIngredient(i)}>
                                    <BiTrash />
                                </Button>
                            </InputGroup>
                        )
                    })
                }
                <Button style={{marginTop: "20px"}} variant="outline-success" onClick={() => addIngredient()}>
                    <BiPlus /> Dodaj Sastojak
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => props.toggleShow(false)}>
                    Odustani
                </Button>
                <Button
                    variant="warning"
                    onClick={() => {
                        props.saveRecipe(Recipe);
                        props.toggleShow(false);
                    }}>
                    Spremi
                </Button>
            </Modal.Footer>
        </Modal>
    )
} 