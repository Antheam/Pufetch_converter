import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const App = () => {
  const [conversionRate, setConversionRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ethers", ethers);
    console.log("e", ethers.formatUnits);

    const fetchConversionRate = async () => {
      try {
        // Initialize InfuraProvider with your Infura API key
        const provider = new ethers.InfuraProvider(
          "mainnet",
          "febcab1c71744fd8b02f0918d387e9b0"
        );

        // Define the contract address and ABI
        const contractAddress = "0xD9A442856C234a39a81a089C06451EBAa4306a72";
        const abi = [
          "function totalAssets() view returns (uint256)",
          "function totalSupply() view returns (uint256)",
        ];

        // Create contract instance
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Fetch totalAssets and totalSupply from the contract
        const totalAssets = await contract.totalAssets();
        const totalSupply = await contract.totalSupply();
        console.log("total", totalSupply);

        // Convert BigNumber values to human-readable format, assuming 18 decimals
        const totalAssetsFormatted = ethers.formatUnits(totalAssets, 18); // Converts to a string number
        const totalSupplyFormatted = ethers.formatUnits(totalSupply, 18);
        console.log("t", totalAssetsFormatted);

        // Convert formatted strings to floating-point numbers for division
        const rate =
          parseFloat(totalAssetsFormatted) / parseFloat(totalSupplyFormatted);

        // Set conversion rate in state
        setConversionRate(rate);
      } catch (err) {
        console.error("Error fetching conversion rate:", err);
        setError("Failed to fetch conversion rate");
      }
    };

    fetchConversionRate();
  }, []);

  return (
    <div>
      <h1>pufETH Conversion Rate</h1>
      {error ? (
        <p>{error}</p>
      ) : conversionRate !== null ? (
        <p>{conversionRate}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
