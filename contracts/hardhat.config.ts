import * as dotenv from 'dotenv'
import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

dotenv.config()

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

const config: HardhatUserConfig = {
    solidity: "0.8.27",
    networks: {
        mumbai: {
            url: process.env.MUMBAI_URL || '',
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        amoy: {
          url: process.env.AMOY_URL || '',
          accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        baseSepolia: {
          url: process.env.BASE_ALCHEMY_URL || "https://sepolia.base.org",
          accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        optimismSepolia: {
          url: `https://opt-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
          accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
        },
        localhost: {
          url: "http://127.0.0.1:8545"
        }
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: 'USD',
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
}

export default config