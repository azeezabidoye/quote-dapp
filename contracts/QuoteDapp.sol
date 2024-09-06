// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract QuoteDapp {
    // Events 
    event QuoteDapp__AddNewQuote(string username, string content);

    // Errors
    error QuoteNotFound();
    
    // Structure of the Quote to be posted
    struct Quote {
        string username;
        string content;
    }

    // Array of quotes
    Quote[] public quotes;

    // Function for adding a new quote
    function addQuote(string memory _username, string memory _content) public {
        // Add new quote to Quotes Array
        quotes.push(Quote(_username, _content));

        // Emit new event
        emit QuoteDapp__AddNewQuote(_username, _content);
    }

    // Function for getting quotes by their index 
    function getQuote(uint _index) public view returns (string memory, string memory) {
        // Check for availability of quote
        if (_index > quotes.length) {
            revert QuoteNotFound();
        }

        // Create a new variable to store found quote
        Quote storage quote = quotes[_index];

        // Return quote if found 
        return (quote.username, quote.content);
    }

    // Function for getting the number of quotes available
    function getQuoteCount() public view returns (uint) {
        return quotes.length;
    }
}