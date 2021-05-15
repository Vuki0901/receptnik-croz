import react, { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./containers/Content/Content";
import './App.css';
import {
  Container
} from "react-bootstrap";

function App() {
  const [LoggedIn, setLoggedIn] = useState(true)
  return (
    <div>
      <Container fluid className="HeaderBox">
        <Header loggedIn={LoggedIn} switch={setLoggedIn}/>
      </Container>
      <Content loggedIn={LoggedIn}/>
    </div>
  );
}

export default App;
