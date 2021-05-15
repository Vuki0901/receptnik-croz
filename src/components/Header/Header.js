import react from "react";

import {
    AiOutlineUser
} from "react-icons/ai";
import {
    Container,
    Navbar,
    Nav,
    Row,
    Col,
    Button
} from "react-bootstrap";

import "./Header.css";

export default function Header(props){
    return (
        <Container id="HeaderBox">
            <Row>
                <Col md={2}>
                    <Navbar>
                        <Navbar.Brand id="Title">RECEPTNIK</Navbar.Brand>
                    </Navbar>
                </Col>
                <Col md={10}>
                    <Nav id="UserBoard" className="">
                        <Nav.Item>
                            <AiOutlineUser />
                        </Nav.Item>
                        <Nav.Item>
                            <p>{props.loggedIn ? "KorisnickoIme1234" : null}</p>
                        </Nav.Item>
                        <Nav.Item>
                            <Button onClick={() => props.switch(!props.loggedIn)} variant="dark">
                                {props.loggedIn ? "ODJAVA" : "PRIJAVA"}
                            </Button>
                        </Nav.Item>
                                     
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}