import React, { useEffect, useState } from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import MenuIcon from '@material-ui/icons/Menu';
import PlaceIcon from '@material-ui/icons/Place';
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { auth } from '../../firebase'

function Header(props) {
    const [{basket, user}, dispatch] = useStateValue()
    const [showMenu, setShowMenu] = useState(false)
    const handleAuthentication = () => {
        if (user) {
            auth.signOut()
        }
    }
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 759);

    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth < 759;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);


    return (
        <div className="header">
            <Link to="/">
                <img className="header__logo" 
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                    alt="amazon logo"
                />
            </Link>
            <PlaceIcon className="header__optionPlace" />
            <div
                className="header__address">
                <span className="header__optionLineOne">
                    {user ? 'Deliver to ' + user?.email : 'Hello, guest'}
                </span>
                <span className="header__optionLineTwo">
                    {user ? 'Sometown 18204' : 'Select your address'}
                </span>
            </div>
            <div className="header__search">
                <input 
                    className="header__searchInput"
                    type="text"
                />
                <SearchIcon className="header__searchIcon" />
            </div>
            <MenuIcon 
                onClick={() => setShowMenu(!showMenu)}
                className={`menuIcon`}
                // ${showMenu ? "header__navOptionsToggle" : null} 
            />
            {/* <div className={`header__nav ${showMenu ? "showMenu" : "hideMenu"}`}> */}
            
            <div className={`header__nav ${isMobile && showMenu ? "showMenu" : "hideMenu"}`}>
                {/* ${showMenu ? "showMenu" : null} */}
            {/* <div className={`header__navOptions`}> */}
            <div className={`header__nav ${isMobile && showMenu ? "header__OptionsOff" : "header__navOptions"}`}>                           
            <Link to={!user && "/login"}>
                <div 
                    onClick={handleAuthentication}
                    className="header__option ">
                    <span className="header__optionLineOne">
                        Hello, {user ? user?.email : 'guest'}
                    </span>
                    <span className="header__optionLineTwo">
                        {user ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Header
