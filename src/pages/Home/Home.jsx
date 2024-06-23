import React from "react";
import "./Home.css"
import { Link } from "react-router-dom";

function Home(){
    const [allCoins , setAllCoins ] = React.useState([]);
    const [displayCoins, setDisplay] = React.useState([]);
    const [input, setInput] = React.useState("");

    function fetchAll(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
            }
          };
          fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
            .then(response => response.json())
            .then(response => { setAllCoins(response);
                setDisplay( response);
            } )
            .catch(err => console.error(err));
    }


    React.useEffect(
        () => {
             fetchAll()
        }, [] )

    function handleChange(event){
        setInput(event.target.value)
        if (event.target.value === ""){
            setDisplay(allCoins)
        }
        else {
            setDisplay( allCoins.filter(
                (item) => { return item.name.toLowerCase().includes(event.target.value.toLowerCase())}
            ))
        }
    }

    function handleSubmit(event){
        event.preventDefault()
    }

    function getTop10(index){
        return displayCoins.slice(index, index+10)
    }

    return (
        <div className="home">
            <div className="hero">
                <h1>Largest <br/> Crypto Coins by Market Capitalization</h1>
                <p>Track Your Favorite Cryptocurrencies: Create Custom Watchlists with Our Secure Crypto Tracking App 
                </p>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} value={input} type="text" placeholder="Search Coin"  required/>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p>24H Change</p>
                    <p className="market-cap">Market Cap</p>
                </div>
                {getTop10(0).map( (coin, index) => {
                        return (
                        <Link to={"/coin/"+coin.id} className="table-layout" key={index}> 
                            <p> {coin.market_cap_rank} </p>
                            <div className="logo-name"> 
                                <img src={coin.image} alt = "Coin logo"/>
                                <p> {coin.name + " - " + coin.symbol} </p>                        
                            </div>
                            <p> ${coin.current_price} </p>
                            <p className={coin.price_change_percentage_24h > 0 ? "green" : "red"}
                            > { Math.floor(coin.price_change_percentage_24h * 100)/100 }% </p>
                            <p className="market-cap"> ${coin.market_cap.toLocaleString()} </p>
                        </Link>
                        )
                    } )}
             </div>
        </div>
    )
}

export default Home