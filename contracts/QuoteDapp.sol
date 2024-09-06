// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Application for creating and posting of quotes
 * @notice Users can create new posts by inserting 
 * their usernames and desired messages
 */

contract QuoteDapp {
    /**
     * @dev Event to be emmited for the creation of a new Quote
     */
    event QuoteDapp__AddNewQuote(string username, string content);

     /**
     * @dev Error to be reverted if Quote is unavailable
     */
    error QuoteNotFound();
    
    /**
     * @title Structure of the quote to be created
     * @dev This requires only the username of the creator
     * and the content they intend to create
     */
    struct Quote {
        string username;
        string content;
    }

    // Array of quotes
    Quote[] public quotes;

    /**
     * @title Function for adding a new quote
     * @param Required are the two parameters for the username and the content
     */
    function addQuote(string memory _username, string memory _content) public {
        // Add new quote to Quotes Array
        quotes.push(Quote(_username, _content));

        // Emit new event
        emit QuoteDapp__AddNewQuote(_username, _content);
    }

    /**
     * @title Function for getting quotes by their index 
     * @param Required is the index of the Quote to be retrived 
     */
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

    /**
     * @title Function for getting the number of quotes available
     * @return The total number Quotes is returned in this function 
     */
    function getQuoteCount() public view returns (uint) {
        return quotes.length;
    }
}