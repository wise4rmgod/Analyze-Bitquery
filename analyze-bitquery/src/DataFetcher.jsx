import React, { useEffect, useState } from "react";
import axios from "axios";

const DataFetcher = ({ onDataFetched }) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Define your API endpoint
    const API_ENDPOINT = "https://graphql.bitquery.io/";
    // Define your API key
    const API_KEY = "BQYhrk6II8pRWA10TyGEqjK6623wpkJW"; // Replace with your Bitquery API key

    // Define the query variables
    const variables = {
      network: "ethereum",
      limit: 10,
      offset: 0,
      from: "2023-10-01T00:00:00Z",
      till: "2023-10-30T23:59:59Z",
    };

    // Define the GraphQL query
    const query = `
      query ($network: EthereumNetwork!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $till: ISO8601DateTime) {
        ethereum(network: $network) {
          blocks(
            options: {desc: "height", limit: $limit, offset: $offset}
            time: {since: $from, till: $till}
          ) {
            timestamp {
              time(format: "%Y-%m-%d %H:%M:%S")
            }
            height
            transactionCount
            address: miner {
              address
              annotation
            }
            reward
            reward_usd: reward(in: USD)
            rewardCurrency {
              symbol
            }
          }
        }
      }
    `;

    // Make an API request to fetch historical blockchain data from Bitquery
    axios
      .post(
        API_ENDPOINT,
        {
          query: query,
          variables: variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
          },
        }
      )
      .then((response) => {
        const data = response.data.data.ethereum.blocks;
        setHistoricalData(data);
        onDataFetched(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>{/* Display a loading indicator or data summary if needed */}</div>
  );
};

export default DataFetcher;
