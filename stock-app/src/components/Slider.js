import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Slider = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const maxRetries = 5;
      let retries = 0;

      while (retries < maxRetries) {
        try {
          const options = {
            method: 'GET',
            url: 'https://yfapi.net/v6/finance/quote/marketSummary',
            headers: {
              'x-api-key': apiKey
            }
          };

          const response = await axios.request(options);
          setData(response.data.marketSummaryResponse.result);
          setLoading(false);
          setError(null);
          break; // Exit while loop if request is successful
        } catch (err) {
          if (err.response && err.response.status === 429) {
            setError('Too many requests. Please try again later.');
            retries += 1;
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
          } else {
            setError('Error loading data. Please try again later.');
            break; // Exit on other errors
          }
        }
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='slider'>
          <div>
            {data &&
              data.map((item, index) => {
                return item.regularMarketChange.raw > 0 ? (
                  <span className='slider-market-raw' key={index}>
                    <span className='slider-name'>{item.shortName}</span>
                    {" "}
                    {item.regularMarketPrice.fmt}
                    <span style={{ color: "green" }}>
                      {" "}
                      +{item.regularMarketChange.fmt} {" "}
                      (+{item.regularMarketChangePercent.fmt})
                    </span>
                  </span>
                ) : (
                  <span className='slider-market-raw' key={index}>
                    <span className='slider-name'>{item.shortName}</span>
                    {" "}
                    {item.regularMarketPrice.fmt}
                    <span style={{ color: "red" }}>
                      {" "}
                      {item.regularMarketChange.fmt} {" "}
                      ({item.regularMarketChangePercent.fmt})
                    </span>
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
