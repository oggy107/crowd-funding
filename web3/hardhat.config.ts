import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@nomicfoundation/hardhat-chai-matchers";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
        },
        goerli: {
            url: "https://goerli.blockpi.network/v1/rpc/public",
            accounts: [process.env.PRIVATE_KEY!],
        },
    },
    gasReporter: {
        enabled: true,
    },
};

export default config;
