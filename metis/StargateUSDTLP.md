# Stargate Protocol: USDT Liquidity Pool on Metis

# Overview
The Stargate Protocol is a decentralized finance (DeFi) smart contract designed for managing cross-chain liquidity pools. It enables users to seamlessly swap and transfer assets between different blockchain networks. The protocol introduces innovative features such as dynamic fee calculations, credit-based liquidity adjustments, and efficient handling of multi-chain interactions.

# Key Features
## 1. Cross-Chain Liquidity
Stargate allows the creation and management of liquidity pools across multiple blockchain networks. Each pool is uniquely identified by a shared pool ID and is connected to other pools through ChainPaths.

## 2. Dynamic Fee Calculation
The protocol employs a fee system with basis points (BP) to determine fees for minting and swapping. The minting fee is customizable and contributes to the overall protocol fee balance, while the swapping fee is dynamically calculated based on the destination pool and user-specific factors.

## 3. Credit-Based Liquidity Adjustments
Stargate introduces a credit system to optimize liquidity adjustments. Users accrue credits based on their interactions, and these credits are distributed among ChainPaths to maintain balanced liquidity. The Delta algorithm is employed to efficiently allocate credits and optimize gas usage.

## 4. Emergency Controls
The protocol includes features such as the ability to stop swapping in extreme cases (`stopSwap`), customizable Delta parameters for batch processing, and ownership controls through the `onlyRouter` modifier to enhance security and control.

## Internal Functions
### 1. `mint`
Allows the minting of liquidity tokens, adjusting credits and fees accordingly.

### 2. `swap`
Enables users to swap assets between pools on different chains, considering dynamic fees and credit adjustments.

### 3. `redeemLocal` and `redeemRemote`
Functions for redeeming assets locally or on remote chains, maintaining ChainPath balances.

### 4. `creditChainPath` and `sendCredits`
Functions to distribute and receive credits across ChainPaths.

### 5. `createChainPath` and `setWeightForChainPath`
Functions to manage ChainPaths, including creation, activation, and weight adjustments.

### 6. `setFee`, `setFeeLibrary`, `setSwapStop`, `setDeltaParam`
Functions for adjusting protocol parameters, including fees, fee library, swap stop status, and Delta parameters.

## Events
Stargate emits various events to provide transparency and facilitate monitoring, including events for minting, burning, swapping, credit distribution, and parameter updates.

## Security Considerations
1. **Modifiers**: The `onlyRouter` modifier restricts certain functions to be accessible only by the designated router address, enhancing security.
2. **Emergency Controls**: The `stopSwap` feature allows the protocol to halt swapping in emergency situations, providing a security mechanism.
3. **External Calls**: The contract utilizes safe external calls to transfer tokens, reducing the risk of reentrancy attacks.

## Conclusion
The Stargate Protocol introduces an innovative approach to cross-chain liquidity management, offering dynamic fee calculations, credit-based adjustments, and robust security features. Users can leverage this protocol for efficient and secure asset transfers across diverse blockchain networks. It is essential for users to review and understand the associated risks before interacting with the contract.