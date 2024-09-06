require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("hardhat-deploy");

const { PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: { chainI: 1337 },
    morphTestnet: {
      url: "https://rpc-quicknode-holesky.morphl2.io",
      accounts: [PRIVATE_KEY],
      chainId: 2810,
      gasPrice: 2000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        networks: "morphTestnet",
        chainId: 2810,
        urls: {
          apiURL: "https://explorer-api-holesky.morphl2.io/api?",
          browserURL: "https://explorer-holesky.morphl2.io/",
        },
      },
    ],
  },
};
