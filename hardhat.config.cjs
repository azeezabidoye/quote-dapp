require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: { chainI: 1337 },
    morphTestnet: {
      url: "https://rpc-quicknode-holesky.morphl2.io",
      accounts: [PRIVATE_KEY],
      chainId: 2810,
      gasPrice: 2000000000,
    },
  },
};
