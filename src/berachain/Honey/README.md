# 🍯 Berachain's native stablecoin: Honey Token

![cover](./assets/cover.png)

### Introduction

As we wait for Berachain's mainnet, we can take a look at some of the features that are useful in the testnet. One such topic is the Berachain native token called *Honey*. ERC20, the Ethereum token standard, has long been the main focus of tokenization on the EVM base blockchain. However, with the emergence of new standards and improvements, developers are constantly seeking ways to enhance token functionality while optimizing gas usage. 

Here, we'll delve into the Honey Token, a modern and gas-efficient ERC20 token implementation, and explore its features and benefits. According to the docuemntation is based of Solmate's ERC20 implementation which includes extensions for behaviors specified in EIP-2612, allowing for gas-less approvals via the permit function

- [Solmate ERC20](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol)

Taking a look at the state variables of the smart contracts, some important variables include, the allowance which is a mechanism that permits token holders to delegate spending permissions to other addresses without transferring ownership of tokens. It involves a mapping that records approved spending allowances granted by token holders to specific addresses. Another security nonce is a sequential number associated with each account, incremented with each transaction, primarily used in conjunction with the permit function to prevent replay attacks by ensuring each approval is unique. Together, these features enhance the security and flexibility of token transfers in decentralized finance applications.

## 📝 Understanding Honey Contract

While we may not have access to the source code of the Honey Token, the provided documentation offers valuable insights into its workings. Let's explore two key variables:

**IERC20BankModule**

```solidity
IERC20BankModule private immutable erc20BankModule = IERC20BankModule(0x0000000000000000000000000000000000696969);
```

The `IERC20BankModule` or the **ERC20 Bank** is a *precompiled* contracts that facilitates the conversion between ERC20 tokens and Cosmos coins within the Cosmos ecosystem. The interface offers a range of functions designed to enable users to transfer tokens between ERC20 and Cosmos formats effortlessly. Additionally, read methods like coinDenomForERC20Address and erc20AddressForCoinDenom allow users to query corresponding denominations for Token ERC20 tokens and Cosmos coins. Write methods such as transferCoinToERC20 and transferERC20ToCoin enable token transfers between different formats, while the performBankTransfer function facilitates bank transfers between addresses. You can read more about the [ERC20 Bank](https://docs.berachain.com/developers/precompiles/erc20-bank).

```solidity
IBankModule private immutable bankModule = IBankModule(0x4381dC2aB14285160c808659aEe005D51255adD7);
```

The `bankModule` variable in the ERC20 Honey Token provides access to the Cosmos SDK Bank module, which handles coin transfers and balances within the Cosmos ecosystem. This interface offers various functions and events to interact with the bank module seamlessly.

For instance, the `getBalance` function retrieves the balance of a specific account for a given coin denomination, while `getAllBalances` returns all balances for an account across different denominations. Similarly, `getSupply` and `getAllSupply` methods provide information about the total supply of a single coin or all coins, respectively.

The `send` function allows users to send coins from their account to another address, emitting a `Transfer` event upon successful completion. Additionally, events such as `Message`, `CoinSpent`, `CoinReceived`, `Coinbase`, and `Burn` provide visibility into various actions within the bank module, including coin transfers, spending, receiving, minting, and burning.

In summary, the `bankModule` interface enhances the functionality of the ERC20 Honey Token by enabling seamless integration with the Cosmos ecosystem, facilitating coin transfers, balance inquiries, and providing transparency through event emissions.

For comprehensive documentation on all methods and functions, refer to the official [Berachain Documentation](https://docs.berachain.com/developers/contracts/honey).

#### Metadata
- **name**: A string representing the name of the token.
- **symbol**: A string representing the symbol of the token.
- **decimals**: An immutable uint8 defining the number of decimal places of the token.

#### State Variables
- **totalSupply**: A uint256 representing the total token supply.
- **balanceOf**: A mapping that relates each address with its respective token balance.
- **allowance**: A mapping to keep track of how much one address allows another to spend on its behalf.
- **nonces**: A mapping used for tracking nonces for the permit method, part of EIP-2612.

#### EIP-2612 Storage
- **INITIAL_CHAIN_ID**: An immutable value storing the chain ID to prevent certain attacks.
- **INITIAL_DOMAIN_SEPARATOR**: A precomputed EIP-712 domain separator that reflects the initial chain ID.

#### Functions
- **approve**: Allows a token holder to grant a spending allowance to another address.
- **transfer**: Moves an amount of tokens from the caller's address to another address.
- **transferFrom**: Moves an amount of tokens from one address to another, using an allowance.
- **permit**: Provides an alternative to approve with a method that can be called by third parties. This uses EIP-712 signing to enable this behavior without gas costs for the signing user.


## 🐻 Using Solide to Interact with Berachain

You can easily interact with the Berachain Honey Token contract using Solide, an online Solidity IDE. 

### Steps:

1. **Load the Contract in Solide IDE**: Start by accessing the Solide IDE [here](https://solidewidget.azurewebsites.net/?url=https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol). Compile the contract and load it in Solide.

2. **Verify Contract Information**: Once loaded, verify that you are interacting with the correct contract. You can do this by calling the `name()` function, which should return `Honey`, and the `symbol()` function, which should return `HONEY`.

3. **Interact with Balances**: Explore the contract's balance-related functions. For example, you can check the balance of a specific address by calling the `balance()` function and providing the address as input.

    ```solidity
    balance(0x6104Cc2aE49b58BDF00Fc49300c5342Af0fcd347)
    ```

    This will display the total amount of Honey tokens held by the specified address.

4. **Transfer Tokens**: Experiment with transferring tokens between addresses. Use the `transfer()` function to send tokens from one address to another.

### Security Considerations

The contract uses unchecked math for balance updates because the ERC20 specification guarantees that overflows and underflows cannot occur under normal operation, given the totalSupply acts as an invariant.

**Permit Function (EIP-2612)**
The `permit` function is notable as it allows for approvals to be done through a signed message, rather than an Berachain EVM transaction from the owner's address. This can allow wallet software to pay for the gas of an approval transaction themselves, rather than requiring the token's owner to do so, provided they sign a message agreeing to the allowance.

This permit feature makes use of the following components:

- `DOMAIN_SEPARATOR`: An on-the-fly computed value for other chains based on the EIP-712 domain, ensuring integrity across different network environments.
- `computeDomainSeparator`: A function calculating the domain separator dynamically for cases where the initial domain separator does not match the current chain due to chain reorganizations across forks.


### 📚 Resources
- [Documentation](https://docs.berachain.com/developers/contracts/honey)
- [ABI](https://github.com/berachain/doc-abis/blob/main/DeployedContracts/Honey.abi.json)
- [Honey Token in Explorer](https://artio.beratrail.io/address/0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B)