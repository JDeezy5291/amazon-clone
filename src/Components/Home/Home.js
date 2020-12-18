import React from 'react'
import Product from '../Product/Product'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img  
                    className="home__image"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/2020/Other/RB-3195_SVOD_DiamondFallBack2/Amazon_GW_DesktopTallHero_3P_ENG_RB-3195_SVOD_DiamondFallback2_v2_1500x600._CB416678521_.jpg"
                    alt="home image"
                />
                <div className="home__row">
                    <Product 
                        id='12321341'
                        title='The Dark Knight Trilogy (Special Edition) (Blu-ray)'
                        price={19.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/91S9ot3Z4lL._SX342_.jpg'
                        rating={5} 
                    />
                    <Product 
                        id="49538094"
                        title='Synergee Open 15kg and 20kg Black Phosphate and Chrome Olympic Barbell. Rated 1000lbs for Weightlifting, Powerlifting and Crossfit'
                        price={249.95}
                        image='https://images-na.ssl-images-amazon.com/images/I/71yvCwzZ8pL._AC_SL1500_.jpg'
                        rating={5} 
                    />
                </div>
                <div className="home__row">
                    <Product
                        id="4903850"
                        title="Batman Arkham Collection (Standard Edition) (Xbox One)"
                        price={42.98}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/81j2zn6kQJL._SL1500_.jpg"
                    />
                    <Product
                        id="23445930"
                        title="Think and Grow Rich: The Landmark Bestseller Now Revised and Updated for the 21st Century"
                        price={7.96}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/61y04z8SKEL._SX349_BO1,204,203,200_.jpg"
                    />
                    <Product
                        id="3254354345"
                        title="Sunny Health & Fitness Power Zone Strength Rack Power Cage"
                        price={369.00 }
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/71PnLYIP8XL._AC_SL1500_.jpg"
                    />
                    </div>

                    <div className="home__row">
                    <Product
                        id="90829332"
                        title="LG 38WK95C-W 38-Inch Class 21:9 Curved UltraWide WQHD+ Monitor with HDR 10"
                        price={930.05}
                        rating={4}
                        image="https://images-na.ssl-images-amazon.com/images/I/41yMNBgMohL._AC_SL1143_.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
