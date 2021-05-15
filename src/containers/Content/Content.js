import react, { useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store/index";
import "./Content.css";

import { 
    BiTrash,
    BiEdit,
    BiPlus,
} from "react-icons/bi";
import {
    AiOutlineHeart,
    AiFillHeart
} from "react-icons/ai";

import {
    Container,
    Row,
    Col,
    Accordion,
    Card,
    Tabs,
    Tab
} from "react-bootstrap";

const EditRecipe = react.lazy(() => import("../EditRecipe"));
const NewRecipe = react.lazy(() => import("../NewRecipe"));
const DeleteRecipe = react.lazy(() => import("../../components/DeleteRecipe"));

export default function Content(props){
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)

    const [ShowDeleteModal, setShowDeleteModal] = useState({
        show: false,
        recipe: ""
    });
    const [NewRecipeModal, setNewRecipeModal] = useState({show: false});
    const [RecipeEditing, setRecipeEditing] = useState({
        show: false,
        recipe: null,
        id: null,
    })

    //Ako korisnik spremi prazna ili nedovrsena polja (sastojak ili kolicina prazni),
    //to polje se brise
    const emptyFieldsHandler = recipe => {
        recipe.sastojci = [...recipe.sastojci].filter(field => field[0] !== "" && field[1] !== "")
        return recipe
    }

    const addNewRecipe = noviRecept => {
        dispatch(actions.add(emptyFieldsHandler(noviRecept)))
    }

    const recipeDeleter = naziv => {
        dispatch(actions.delete(naziv))
    }

    const recipeUpdater = newRecipe => {
        const copy = [...recipes]
        copy[RecipeEditing.id] = emptyFieldsHandler(newRecipe)
        dispatch(actions.update([...copy]));
    }

    const favoriteToggler = (index, isFav) => {
        const newArr = [...recipes]
        const copy = Object.assign([], newArr[index])
        copy.fav = isFav
        newArr[index] = copy
        dispatch(actions.update([...newArr]));
    }

    const LoggedInContent = (
        <Tabs>
                <Tab eventKey="all" title="Svi Recepti" >
                    <Container className="RecipesBox">
                        <h1>Uneseni Recepti</h1>
                        <div id="AddNewRecipe" onClick={() => setNewRecipeModal({show: true})}>
                            <BiPlus/>
                            Dodaj Novi Recept
                        </div>

                        <Accordion defaultActiveKey="0">
                            {
                                recipes.map((recept, index) => {
                                    return (
                                        <Card key={index} style={{marginBottom: "5px"}}>
                                            
                                            <Accordion.Toggle as={Card.Header} eventKey={index+1} className="RecipeName">
                                                {recept.naziv}
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={index+1}>
                                                <Card.Body>
                                                    <Container fluid>
                                                        <Row>
                                                            <Col md={8}>
                                                                {
                                                                    recept.sastojci.length !== 0 ?
                                                                    recept.sastojci.map((sastojak, i) => {
                                                                        return (
                                                                            <p key={i}>
                                                                                {sastojak[0]+" -> "+sastojak[1]}
                                                                            </p>
                                                                        )
                                                                    }): null
                                                                    //console.log(recept.sastojci)
                                                                }
                                                            </Col>

                                                            <Col md={4} id="Ikonice">
                                                                    <BiTrash onClick={() => setShowDeleteModal({
                                                                        show: true,
                                                                        recipe: recept.naziv
                                                                    })}/>
                                                                    <BiEdit onClick={() =>  setRecipeEditing({show: true, recipe: recept, id: index})}/>
                                                                    {recept["fav"] ? 
                                                                    <AiFillHeart onClick={() => favoriteToggler(index, false)} className="Heart"/> : 
                                                                    <AiOutlineHeart onClick={() => favoriteToggler(index, true)} className="Heart"/>}
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                    
                                                        
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    )
                                })
                            }
                        </Accordion>
                    </Container>

                </Tab>
                <Tab eventKey="favorites" title="Favoriti">
                    <Container className="RecipesBox">
                        <h1>Favoriti</h1>
                        <Accordion defaultActiveKey="0">
                            {
                                recipes.map((recept, index) => {
                                    return recept["fav"] ? (
                                        <Card key={index}>
                                            <Accordion.Toggle as={Card.Header} eventKey={index+1} className="RecipeName">
                                                {recept.naziv}
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={index+1}>
                                                <Card.Body>
                                                    <Container fluid>
                                                        <Row>
                                                            <Col md={7}>
                                                                {
                                                                    recept.sastojci.length !== 0 ?
                                                                    recept.sastojci.map((sastojak, i) => {
                                                                        return (
                                                                            <p key={i}>
                                                                                {sastojak[0]+" -> "+sastojak[1]}
                                                                            </p>
                                                                        )
                                                                    }): null
                                                                    //console.log(recept.sastojci)
                                                                }
                                                            </Col>

                                                            <Col md={5} id="Ikonice">
                                                                    <BiTrash onClick={() => setShowDeleteModal({
                                                                        show: true,
                                                                        recipe: recept.naziv
                                                                    })}/>
                                                                    <BiEdit onClick={() =>  setRecipeEditing({show: true, recipe: recept, id: index})}/>
                                                                    {recept["fav"] ? 
                                                                    <AiFillHeart onClick={() => favoriteToggler(index, false)} className="Heart"/> : 
                                                                    <AiOutlineHeart onClick={() => favoriteToggler(index, true)} className="Heart"/>}
                                                            </Col>
                                                        </Row>
                                                    </Container>  
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ) : null
                                })
                            }
                        </Accordion>

                    </Container>
                </Tab>
        </Tabs>
    )

    const NotLoggedIn = (
        <Container id="NotLoggedIn">
            <h3>Molimo prijavite se u aplikaciju kako biste ju koristili</h3>
        </Container>
    )

    return (
        <Container id="ContentBox">
            
            {props.loggedIn ? LoggedInContent : NotLoggedIn}
            
            {/*Modal za brisanje recepta*/}
            {ShowDeleteModal.show ? 
            <Suspense fallback={<div></div>}>
                <DeleteRecipe 
                    naziv = {ShowDeleteModal.recipe}
                    show = {ShowDeleteModal.show}
                    close = {setShowDeleteModal}
                    state = {recipes}
                    del = {recipeDeleter}
                />  
            </Suspense>
            : null}

            {/*Modal za dodavanje novog recepta*/}
            <Suspense fallback={<div></div>}>
                <NewRecipe 
                    show={NewRecipeModal.show}
                    toggleShow={setNewRecipeModal}
                    add={addNewRecipe}/>
            </Suspense>
            
            {/*Modal za azuriranje recepta*/}
            {
                RecipeEditing.show ?
                <Suspense fallback={<div></div>}>
                    <EditRecipe
                        show={RecipeEditing.show}
                        recipe={RecipeEditing.recipe}
                        toggleShow={(show) => {
                            setRecipeEditing({
                                ...RecipeEditing,
                                show: show,
                            })
                        }}
                        saveRecipe={recipeUpdater}
                    />
                </Suspense> : null
            }
            
        </Container>
    )
}