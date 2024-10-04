import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import RateHistoryChart from "./Components/RateHistoryChart";

const App = () => {
  const [conversionRate, setConversionRate] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastRate, setLastRate] = useState(null);

  useEffect(() => {
    console.log("ethers", ethers);
    console.log("e", ethers.formatUnits);

    const fetchConversionRate = async () => {
      try {
        const provider = new ethers.InfuraProvider(
          "mainnet",
          "febcab1c71744fd8b02f0918d387e9b0"
        );

        const contractAddress = "0xD9A442856C234a39a81a089C06451EBAa4306a72";
        const abi = [
          "function totalAssets() view returns (uint256)",
          "function totalSupply() view returns (uint256)",
        ];

        const contract = new ethers.Contract(contractAddress, abi, provider);

        const totalAssets = await contract.totalAssets();
        const totalSupply = await contract.totalSupply();
        console.log("total", totalSupply);

        const totalAssetsFormatted = ethers.formatUnits(totalAssets, 18);
        const totalSupplyFormatted = ethers.formatUnits(totalSupply, 18);
        console.log("t", totalAssetsFormatted);

        const rate =
          parseFloat(totalAssetsFormatted) / parseFloat(totalSupplyFormatted);

        const formattedRate = rate.toFixed(14);

        setConversionRate(rate);
        // Check if the first five decimal places have changed
        if (lastRate === null || formattedRate !== lastRate) {
          const currentTime = new Date().toLocaleTimeString();
          setHistory((prevHistory) => [
            ...prevHistory,
            { time: currentTime, rate: rate },
          ]);
          setLastRate(formattedRate);
        }
      } catch (err) {
        console.error("Error fetching conversion rate:", err);
        setError("Failed to fetch conversion rate");
      }
    };
    fetchConversionRate();

    const intervalId = setInterval(fetchConversionRate, 60000);
    return () => clearInterval(intervalId);
  }, [lastRate]);

  return (
    <div>
      <h1>pufETH Conversion Rate</h1>
      {error ? (
        <p>{error}</p>
      ) : conversionRate !== null ? (
        <>
          <p>Current Rate: {conversionRate}</p>
          <RateHistoryChart history={history} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
