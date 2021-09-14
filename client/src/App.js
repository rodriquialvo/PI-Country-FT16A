import './App.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import { Home } from './components/Home';
import { ActivityCreate } from './components/ActivityCreate';
import {Details} from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
    </div>
    <Route exact path = "/" component = {LandingPage}/>
    <Route exact path="/home" component= {Home} />    
    <Route path="/crear" component = {ActivityCreate} />
    <Route path="/home/:id" component={Details} />
    </BrowserRouter>
  );
}

export default App;
