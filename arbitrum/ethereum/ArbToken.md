# Register Upkeep In Contract (programmatically) Guide

## Overview

The `L1ArbitrumToken` is a smart contract written in Solidity, which serves as the Layer 1 (L1) representation of an Arbitrum token. It is designed to be interoperable with the Arbitrum Layer 2 (L2) network Nova network. The contract supports functionality for minting and burning tokens, registering tokens on both the Arbitrum Nova networks, and facilitating token transfers between users.

## Key Features

### 1. Arbitrum Integration
The contract facilitates the seamless integration of the Arbitrum Nova networks. It allows the token to be registered on both networks using the `registerTokenOnL2` function.

### 2. Minting and Burning
Authorized gateways, specifically the Arbitrum gateway, can mint and burn tokens on the L1 network using the `bridgeMint` and `bridgeBurn` functions, respectively.

### 3. ERC-20 Compatibility
The contract extends the OpenZeppelin ERC-20 and ERC-20 Permit standards, providing a standard interface for token transfers and permitting.

### 4. Permissioned Functions
Certain functions, such as `bridgeMint` and `bridgeBurn`, are restricted to be executed only by the Arbitrum gateway through the use of the `onlyArbOneGateway` modifier.

## Internal Functions

### 1. `initialize`
- **Parameters:** `_arbOneGateway`, `_novaRouter`, `_novaGateway`
- **Purpose:** Initializes the contract with required addresses for the Arbitrum gateway, Nova router, and Nova gateway.

### 2. `isArbitrumEnabled`
- **Purpose:** Indicates whether the contract is expecting gateway registration on the Arbitrum network.

### 3. `bridgeMint`
- **Parameters:** `account`, `amount`
- **Purpose:** Allows the Arbitrum gateway to mint tokens on the L1 network.

### 4. `bridgeBurn`
- **Parameters:** `account`, `amount`
- **Purpose:** Allows the Arbitrum gateway to burn tokens on the L1 network.

### 5. `registerTokenOnL2`
- **Parameters:** `novaParams` (Registration parameters structure)
- **Purpose:** Registers the token on both the Arbitrum Nova networks, involving interactions with the Nova gateway and router.

## Events

### 1. `Mint`
- **Parameters:** `account`, `amount`
- **Purpose:** Triggered when tokens are minted on the L1 network.

### 2. `Burn`
- **Parameters:** `account`, `amount`
- **Purpose:** Triggered when tokens are burned on the L1 network.

### 3. `Approval`
- **Parameters:** `owner`, `spender`, `amount`
- **Purpose:** Triggered when token approval is granted.

## Security Considerations

### 1. Modifiers
- The `onlyArbOneGateway` modifier ensures that sensitive functions can only be executed by the authorized Arbitrum gateway.

### 2. Initialization Checks
- The contract includes checks in the `initialize` function to prevent the initialization of essential addresses with zero values.

### 3. Gateway Interaction
- Interactions with the Arbitrum gateway are permissioned, providing control over minting and burning functions.

### 4. Reentrancy Protection
- The contract uses the `ReentrancyGuard` from OpenZeppelin to protect against reentrancy attacks.

## Conclusion

The `L1ArbitrumToken` smart contract is a crucial component for enabling token interoperability between the Arbitrum Nova networks. It provides a secure and permissioned environment for minting, burning, and registering tokens, ensuring a seamless cross-network experience for users and gateways. Developers can leverage this contract as a foundation for building complex decentralized applications spanning both the Arbitrum ecosystems.