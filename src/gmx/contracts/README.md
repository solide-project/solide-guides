# GMX Technical Overview

*See full documentation at [https://gmx-io.notion.site/gmx-io/GMX-Technical-Overview-47fc5ed832e243afb9e97e8a4a036353](https://gmx-io.notion.site/gmx-io/GMX-Technical-Overview-47fc5ed832e243afb9e97e8a4a036353)*

**Software Architecture**

The main components of the platform are:

1. Vault
2. Routers
3. Price Feeds
4. GMX
5. GLP

Addresses for these contracts can be found at: https://gmxio.gitbook.io/gmx/contracts 

**Vault**

The [Vault](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/core/Vault.sol) contract stores deposits and handles the main trading functions. 

- Deposits: Funds are deposited into the Vault through the minting of GLP tokens. e.g. if the price of GLP is $1.50, a user can mint 1 GLP by depositing 1.50 USDC tokens.
- Withdrawals: Funds can be withdrawn from the vault through the burning of GLP tokens. e.g. if the price of GLP is $1.50, a user can burn 1 GLP to redeem 1.50 USDC tokens.
- Swaps: The vault allows swapping of the tokens held in the vault. e.g. if the price of ETH is $5000 a user can swap 1 ETH for 5000 USDC through the swap function of the vault.
- Longing: Users can open a long position using the vault. e.g. to open a long, a user can deposit 1 ETH into the vault and open a position of $25,000, if the price of ETH at the time of opening the position is $5000, then this would be a 5x long position. If the price of ETH increases by 10%, the user would make a profit of $25,000 * 10% = $2500. A snapshot of the collateral is taken when the position is opened, so in this example, the collateral would be recorded as $5000 and will not change even if the price of ETH changes. To ensure the vault has sufficient funds to pay out any profits, an amount of ETH equivalent to the position’s size is marked as reserved, for this position, 5 ETH in the vault would be reserved.
- Shorting: Users can open a short position using the vault. e.g. to open a short, a user can deposit 5000 USDC into the vault and open a position of $25,000. Stablecoins are required as collateral for shorts and similar to longs, an amount of stablecoins equivalent to the size of the position would be reserved to pay out any profits.
- Liquidations: A position can be liquidated by keepers if the losses of the position reduces the collateral to the point where `position size / remaining collateral` is more than the max allowed leverage.

**Router**

The [Router](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/core/Router.sol) contracts provide convenience functions on top of the vault. e.g. the vault requires tokens to be sent to it then the swap function called to execute the swap, the router handles transferring the tokens to the vault as well as wrapping / unwrapping of native tokens if required.

The [PositionRouter](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/core/PositionRouter.sol) contract handles a two part transaction process for increasing or decreasing long / short positions, this process helps to reduce front-running issues:

1. A user sends the request to increase / decrease a position to the PositionRouter
2. A keeper requests the index price from an aggregate of exchanges
3. The keeper then executes the position at the current index price
4. If the position cannot be executed within the allowed slippage the request is cancelled and the funds are sent back to the user

A user can execute the position on their own if three minutes have passed between the request transaction and the execution transaction. The function of the position keepers is to provide convenience and the protocol can continue to operate even without these keepers.

For swaps, the base fee is 0.25%, while price feeds update within 0.12% price movements, this helps to reduce front-running issues.

**Price Feeds** 

The [PriceFeed](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/oracle/FastPriceFeed.sol) contract accepts submissions from the price feed keeper. This keeper calculates prices using the median price of Binance, Bitfinex and Coinbase. There are two types of keepers:

- Price feed keeper: submits prices routinely for swaps
- Position keeper: submits prices when executing a position

The vault uses the price from the keeper if it is within a configured percentage of the corresponding Chainlink price. If the price exceeds this threshold then a spread would be created between the bounded price and the Chainlink price, this threshold is based on the historical max deviation of the Chainlink price from the median price of reference exchanges. For example, if the max deviation is 2.5% and the price of the token on Chainlink is $100, if the keeper price is $103, then the pricing on the vault would be $100 to $103. When opening a long position, the higher price is used and when closing the lower price is used, for short positions, the lower price is used when opening and the higher price is used for closing.

Prices from the keeper also have an expiry of five minutes, if the last price has been submitted more than five minutes ago, the Chainlink price will be used instead.

For liquidations, these can only occur if the Chainlink price reaches the liquidation price for a position.

Aside from the keeper nodes, watcher nodes are also ran to verify that the prices submitted by the keepers have not been tampered with. Watcher nodes continually compute the median price and compare this with the prices submitted by keepers, if the prices submitted by a keeper does not match the computed median price, then the watcher sends a transaction to enforce a spread between the keeper price and the Chainlink price. For example, if the keeper is operating normally and the Chainlink price is $100 while the keeper price is $101, there would be no spread and $101 would be used for pricing, if the keeper is not operating normally, and the watcher sends a transaction to enforce a spread, then the pricing used would be $100 to $101.

The keepers and watchers are currently run by separate contributors, as we become more certain of the watcher’s reliability, we can open the watcher to be run by any user to receive notifications. [Multiple watcher accounts](https://github.com/gmx-io/gmx-contracts/blob/ceb7794308eb67a5981436ebb03bcf6e25cf25d8/scripts/core/deployPriceFeed.js#L31) are currently setup to have the ability to send the transaction to enable spreads. It would also be possible to allow more users to send the transaction to enforce a spread by requiring the account to stake or lock a minimum amount of GMX tokens.

The price feed and position keepers can be further decentralized by using [Chainlink keepers](https://docs.chain.link/docs/chainlink-keepers/introduction/) or an execution environment such as [Intel SGX](https://medium.com/avalancheavax/new-avalanche-bridge-builds-on-intel-sgx-technology-in-breakthrough-for-cross-chain-8f854e0e72e0) used by Avalanche. 

As of 28 Aug 2022, additional contract level checks have been added. On each fast price update, contract variables store the percentage change in price for the update as well as the percentage change of the Chainlink price since the last update, if the cumulative percentage change in the fast prices over a duration exceeds the cumulative percentage change in the Chainlink prices by a configured threshold, the spread between the fast price and Chainlink price will be automatically enabled. The configuration for this is in `Vault.priceFeed.secondaryPriceFeed.maxCumulativeDeltaDiffs`.

As the price feed contract may be updated to improve its security, the most reliable way to find the contract address for it would be to check the value of `Vault.priceFeed`.

**GMX**

[GMX](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/gmx/GMX.sol) is the governance token of the platform, it is a regular ERC20 token that can be staked for rewards.

**GLP**

[GLP](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/gmx/GLP.sol) is the liquidity provider token of the platform, it can be minted using any of the tokens within the liquidity pool such as ETH, BTC and USDC.

The token’s price is determined by the worth of all tokens within the pool and factoring in the profits and losses of all currently opened positions.

**Access Control**

Parameters that can be adjusted by a controller account currently controlled by the contributors:

- Setting of swap and margin trading fees up to a maximum of 5%
- Setting of token weights for the GLP pool, token weights affect the dynamic fees of swaps, these fees are such that a swap which increases the balance towards the specified token weight will be lower, while a swap that moves the token weight away from the desired amounts will have higher fees, the details of the calculation can be found from `Vault.vaultUtils.getSwapFeeBasisPoints`
- Pausing of swaps or leverage trading for emergency use
- Setting of the maximum allowed leverage
- Setting of maximum total capacity for long and short positions

Parameters that can be adjusted by a [Timelock](https://github.com/gmx-io/gmx-contracts/blob/master/contracts/peripherals/Timelock.sol) controlled by contributors:

- Listing of new tokens
- Updating `Vault.priceFeed`
- Updating `Vault.vaultUtils`, the VaultUtils contract validates the opening and closing of positions and also specifies how fees are calculated
- Updating of `gov` values

The Timelock works by requiring a 24 hour gap between when the full details of an action is signalled on-chain to when the action is executed. An example flow would be:

- `Timelock.signalSetPriceFeed` is called, this specifies the Vault address and the address of the new price feed
- At least 24 hours must pass
- `Timelock.setPriceFeed` can be called, this will update the `Vault.priceFeed` value

24 hours was selected as it helps to be able to respond quickly to any issues that may occur.

The Timelock contract is monitored by contributors and can be monitored by anyone without coding by subscribing to the `Timelock.SignalPendingAction` event. This is doable using [OpenZeppelin Sentinel](https://openzeppelin.com/defender/). The Timelock contracts can be found by checking the `gov` values of contracts.

In the event of a malicious transaction being sent, it is possible for all funds in the pool to be compromised. To mitigate this, all actions which can impact user funds must pass through the signal, time gap, execute process mentioned above. If a malicious transactions is detected through the monitoring process or [Bug Bounty](https://immunefi.com/bounty/gmx/), a multi-sig consisting of advisors and community members can be used to override the `Timelock.admin` value, this would prevent the action from being executed. This also applies for actions such as pausing trading when there was no need to, in this case, the admin can be replaced by the multi-sig and trading can be re-activated.

Note that the [multi-sig](https://github.com/gmx-io/gmx-contracts/blob/ceb7794308eb67a5981436ebb03bcf6e25cf25d8/scripts/access/deployTokenManager.js#L6) can only override the admin value, it cannot bypass the time gap required for Timelock actions.

**Upgradeability**

The core logic of the GMX contracts cannot be changed, but certain peripheral functions such as fee and pricing calculations can be updated. This update is done by implementing new fee / pricing contracts and updating the core contracts to use the new contracts. For example, the Vault contract has a `priceFeed` value that can be changed by the Timelock contract described in the **Access Control** section. 

**Front Running Attack Mitigations**

Front running attacks are mitigated through the two step transaction process and swap fees.

**Flash Loan Attack Mitigations**

Opening and closing of positions as well as swaps, minting and redeeming of GLP are settled at the oracle price covered in the **Price Feeds** section since these prices are not dependent on pool composition or parameters like long / short ratios, so a flash loan would not have an impact on these functions. The dynamic fees for swaps are dependent on pool composition, however, this does not lead to positive slippage so the maximum benefit from a flash loan would be a zero fee swap which adjusts pool composition towards the desired token weights.