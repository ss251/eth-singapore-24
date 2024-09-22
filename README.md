# RealVotes: Sybil-Resistant Voting Platform

Secure, anonymous voting powered by World ID and Oasis.

## Overview

RealVotes is a decentralized voting platform that leverages Worldcoin's World ID for sybil-resistant, privacy-preserving verification. Users can participate in voting securely and anonymously, ensuring one-person-one-vote without compromising privacy.

## Tech Stack

- **Oasis Network**: Smart contracts for voting and storage of World ID proofs.
- **Worldcoin World ID**: KYC and sybil-resistant identity verification.
- **Nouns Project**: Dynamic SVG generation for user avatars.
- **Hardhat + Ethers**: Smart contract development and deployment.
- **Next.js**: Framework for the frontend application.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Metamask or a compatible Ethereum wallet
- Access to the Worldcoin Developer Portal

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/realvotes.git
cd realvotes
```

### 2. Install Dependencies

Navigate to both `contracts` and `frontend` directories and install dependencies:

```bash
# In the root directory
cd contracts
npm install
cd ../frontend
npm install
```

### 3. Environment Variables

#### Contracts Configuration (contracts/.env)

Create a `.env` file in the `contracts` directory with the following variables:

```
ETHERSCAN_API_KEY=your_etherscan_api_key
AMOY_URL=https://polygon-amoy.g.alchemy.com/v2/your_alchemy_key
BASE_SEPOLIA_ALCHEMY_URL=https://base-sepolia.g.alchemy.com/v2/your_alchemy_key
PRIVATE_KEY=your_private_key
WORLD_ID_APP_ID=your_worldcoin_app_id
WORLD_ID_ACTION_ID=your_worldcoin_action_id
WORLD_ID_ROUTER_ADDRESS=worldcoin_router_address
```

#### Frontend Configuration (frontend/.env.local)

Create a `.env.local` file in the `frontend` directory with the following variables:

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_APP_ID=your_worldcoin_app_id
NEXT_PUBLIC_ACTION=your_worldcoin_action_id
NEXT_PUBLIC_CONTRACT_ADDRESS=contract_address
NEXT_PUBLIC_OASIS_VERIFICATION_STORAGE_ADDRESS=verification_storage_contract_address
NEXT_PUBLIC_OASIS_VOTING_CONTRACT_ADDRESS=voting_contract_address
NEXT_PUBLIC_OASIS_RPC_URL=https://testnet.sapphire.oasis.dev
```

### 4. Worldcoin Setup

To enable World ID verification:

1. Register an Application in the Worldcoin Developer Portal to receive your `app_id`.
2. Create an Action associated with your app to receive your `action_id`.
3. Update the environment variables with your `app_id` and `action_id`.

### 5. Deploy Contracts

Navigate to the `contracts` directory:

```bash
cd contracts
```

Compile Contracts:

```bash
npx hardhat compile
```

Deploy to Oasis Testnet:

```bash
npx hardhat run scripts/deploy_oasis.ts --network oasisTestnet
```

Note the deployed contract addresses and update your frontend `.env.local` accordingly.

### 6. Running the Frontend

Navigate to the `frontend` directory:

```bash
cd frontend
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage

1. **Connect Wallet**: Connect your Ethereum wallet using Metamask or WalletConnect.
2. **Verify Identity**: Click on "Verify with World ID" to complete the sybil-resistant verification.
3. **Vote**: Participate in existing proposals or create new ones.

## Additional Information

### Nouns Project Integration

The app uses the Nouns Project for dynamically generating SVG avatars based on user addresses, adding a visual element to the voting experience.

### Security Considerations

- **Private Keys**: Never commit your private keys or sensitive information to version control.
- **Worldcoin Verification**: Ensures that each user can vote only once without revealing their identity.

## Troubleshooting

- **Wrong Network**: Ensure you're connected to the Oasis Sapphire Testnet in your wallet.
- **Environment Variables**: Double-check that all required environment variables are set correctly.
- **Dependencies**: Make sure all dependencies are installed by running `npm install` in both `contracts` and `frontend` directories.

Get coding and enjoy secure, sybil-resistant voting with RealVotes!
