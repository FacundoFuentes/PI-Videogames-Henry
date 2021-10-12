import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import VideogameDetails from "./components/VideogameDetails/VideogameDetails";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";

let expr = new RegExp('[/].+')

function App() {

  return (
    <>
      {/* <Route path={expr}> */}
      <NavBar />
      {/* </Route> */}
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
      <HomePage/>
        </Route>
        <Route exact path="/details/:id">
      <VideogameDetails/>
        </Route>
        <Route exact path="/create">
      <CreateVideogame/>
        </Route>
        <Route>
          <h1>404 - Pagina no encontrada</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
