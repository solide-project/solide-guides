# Smart Contract Documentation: HERMES Token

## Overview
`BaseV1` is an Metis smart contract that serves as a foundational token implementation, introducing the Hermes token (symbol: HERMES). Designed with simplicity and versatility in mind, this contract facilitates token transfers, approvals, and introduces a minting mechanism. With a set minter address and a one-time minting capability, `BaseV1` establishes a fundamental building block for token-based applications on the Metis blockchain.

## Key Features
### 1. Token Standard
   - Adheres to the ERC-20 token standard, providing compatibility with a wide range of decentralized applications (DApps) and platforms.

### 2. Name and Symbol
   - Named "Hermes" with the symbol "HERMES" to uniquely identify and represent the token within the Metis ecosystem.

### 3. Minting Mechanism
   - Allows for token minting, controlled by the designated minter address.
   - The minter address is initially set to the contract deployer and can be updated using the `setMinter` function.

### 4. Transfer and Approval
   - Implements the standard ERC-20 functions `transfer` and `transferFrom` for seamless token transfers between addresses.
   - Supports the `approve` function for managing allowances and enabling delegated transfers.

### 5. Total Supply Tracking
   - Maintains a record of the total token supply, dynamically adjusted upon minting.

### 6. Security Features
   - Employs access control through the minter address to ensure that only authorized entities can mint new tokens.
   - Protects against potential overflow issues by utilizing the `type(uint).max` check when managing allowances.

## Internal Functions
### `setMinter`
   - Allows the minter address to be updated by the current minter.

### `_mint`
   - Internal function for minting new tokens and updating balances.

### `_transfer`
   - Internal function for transferring tokens between addresses and updating balances.

## Events
   - Emits the standard ERC-20 events `Transfer` and `Approval` during token transfers and allowance approvals.

## Security Considerations
   - Ensures that the minter address is initially set to the contract deployer and can only be updated by the current minter, preventing unauthorized access to minting capabilities.
   - Mitigates potential overflow issues by checking against `type(uint).max` when managing allowances.

## Conclusion
`BaseV1` establishes a fundamental ERC-20 token with basic functionalities, making it suitable for a variety of decentralized applications. Its simplicity, adherence to standards, and the ability to mint tokens provide a versatile foundation for projects seeking a straightforward token implementation on the Metis blockchain. Developers can leverage and extend `BaseV1` to meet specific requirements within their token-based applications.