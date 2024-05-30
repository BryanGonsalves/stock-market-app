import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/SingleCard';

const Cards = ({ searchString }) => {
    const [trend, setTrend] = useState(null);
    const findValue = (elem) => elem.toLowerCase().includes(searchString.toLowerCase());
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchTrend = async () => {
          try {
            const options = {
                method: 'GET',
                url: 'https://yfapi.net/v1/finance/trending/US',
                headers: {
                    'x-api-key': apiKey
                }
            };

            const response = await axios.request(options);
            setTrend(response.data.finance.result[0]);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchTrend();
      }, [apiKey]);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <>
            <div className="cards_title"><h2>Trending Equites & Indexes</h2></div>
            {
                trend ? (
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <div className="row text-center wrapper">
                                {
                                    shuffleArray(trend.quotes).slice(0, 150).map((stocks) => {
                                        if (findValue(stocks.symbol)) {
                                            return (
                                                <Card
                                                    key={stocks.symbol}
                                                    symbol={stocks.symbol}
                                                />
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                            </div>
                        </div>       
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            }            
        </>
    );
}

export default Cards;
