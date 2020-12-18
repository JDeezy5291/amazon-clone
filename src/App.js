import './App.css';
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Checkout from './Components/Checkout/Checkout';
import Payment from './Components/Payment/Payment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51Hzq6DDgCLwFmBmIOxjlTlCZlRm6TvKqtB5lrM8Lsv9KACIfTxJSj0Um64MTFZUkTAm48TACdX0ILkhzAaraZEtP00smkLuoQr')

function App() {
  const [{}, dispatch] = useStateValue()
  // const [showMenu, setShowMenu] = useState(false)
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 759);

    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         const ismobile = window.innerWidth < 759;
    //         if (ismobile !== isMobile) setIsMobile(ismobile);
    //     }, false);
    // }, [isMobile]);

    

  useEffect(() => {
    //will only run once when app component loads
    // attach listener when app loads
    auth.onAuthStateChanged(authUser => {
      console.log('user is >>>', authUser)

      if (authUser) {
        // user logged in
        // send info about user into data layer
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  
  

  return (
    <Router>
      {/* <div className={`app ${isMobile && showMenu ? "shadow" : null}`}> */}
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
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
