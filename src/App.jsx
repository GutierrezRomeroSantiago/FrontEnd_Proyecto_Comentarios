import { useState } from 'react'
import { MovieDetails} from "./pages/MovieDetails"
import { LandingPage } from "./pages/LandingPage";
import { NewsPage } from "./pages/NewsPage";
import { WeekPage } from "./pages/WeekPage";
import { DailyPage } from "./pages/DailyPage";
import { Toolbar } from "./components/Toolbar";
import { LoginPage } from "./pages/LoginPage";
import { Registro } from "./pages/Registro";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { render } from 'react-dom';
import Cookies from 'universal-cookie' 


export function App() {

  //const [logged, setlogged] = useState(false);
  const [username, setusername] = useState("");
  
  
  const a = async function handleCallback(childData, childName) {
    const cookies = new Cookies();
    cookies.set('estado', 'true', { path: '/', expires: new Date(Date.now()+2592000) });
    cookies.set('usuario', childData, { path: '/', expires: new Date(Date.now()+2592000) });
    cookies.set('nombre', childName, { path: '/', expires: new Date(Date.now()+2592000) });
    console.log(cookies.get('usuario'));
    window.location.href="/";
}

   function renderLogin() {
    return (
      <LoginPage parentCallback = {a}/>
    )
  }

  function renderRegistro() {
    return (
      <Registro/>
    )
  }

  function renderApp() {
    return (
    <Router>
        <header>

            <Toolbar />

        </header>
      <main>
        <Switch>
        <Route exact path="/login">
            <LoginPage />
        </Route>
        <Route exact path="/registro">
            <Registro />
        </Route>
        <Route exact path="/estrenos">
            <NewsPage />
        </Route>
        <Route exact path="/diario">
            <DailyPage />
        </Route>
        <Route exact path="/semanal">
            <WeekPage />
        </Route>
          <Route exact path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </main>
    </Router>
  )
    }

    function render() {
      const cookies = new Cookies();
      if ((cookies.get('estado') == 'true')) {
        return renderApp();
      } else if ((cookies.get('registro') == 'true')) {
        return renderRegistro();
     } else {
        return renderLogin();
      }
    }
    return render()
}