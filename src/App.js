import './App.css';
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <h1>checkout</h1>
          </Route>
          {/* Default Route. must be at bottom */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
