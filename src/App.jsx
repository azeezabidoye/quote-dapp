import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import QuoteDAppABI from "./artifacts/contracts/QuoteDapp.sol/QuoteDapp.json"; // Import the ABI

const contractAddress = "0xF1a2D02114Ea3F9fF1C25d491BDDC2Ba0554B220"; // Replace with your contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, QuoteDAppABI.abi, signer);

function App() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    const count = await contract.getQuoteCount();
    const quotesArray = [];

    for (let i = 0; i < count; i++) {
      const quote = await contract.getQuote(i);
      quotesArray.push(quote);
    }

    setQuotes(quotesArray);
  };

  const addQuote = async (e) => {
    e.preventDefault();
    await contract.addQuote(username, content);
    loadQuotes();
  };

  return (
    <div>
      <h1>Quote DApp</h1>
      <form onSubmit={addQuote}>
        <input
          type="text"
          placeholder="Your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Favorite Quote"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit Quote</button>
      </form>
      <h2>All Quotes</h2>
      {quotes.map((quote, index) => (
        <p key={index}>
          {/* {quote[0]}: "{quote[1]}" */}
          {quote[0]}:
        </p>
      ))}
    </div>
  );
}

export default App;
