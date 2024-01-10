# Aave Oracle Documentation

## Overview

The `AaveOracle` smart contract is a critical component of Protocol V3, designed to fetch asset prices, manage price sources, and update the fallback oracle for the Aave Market. The protocol exclusively uses Chainlink Aggregators as the source of all asset prices, ensuring reliable and accurate data. Deprecated fallback oracles from V1 and V2 are no longer maintained, emphasizing the transition to the robust V3 oracle system.

## Key Features

1. **Chainlink Aggregator Integration**: The contract leverages Chainlink Aggregators as the primary source of asset prices for the Aave Market.

2. **Fallback Oracle Transition**: The protocol has transitioned away from deprecated fallback oracles from V1 and V2, now relying on a new and improved fallback oracle mechanism in V3.

3. **Asset Price Querying**: Users can query the price of a specific asset or multiple assets in BASE_CURRENCY of the Aave Market. All V3 markets utilize USD-based oracles returning values with 8 decimals.

4. **Asset Source Management**: The contract allows for the dynamic setting or updating of price sources for a list of assets, providing flexibility in managing the oracle system.

## Internal Functions

### `_setAssetsSources`

- **Description**: Internal function to set or update the sources for a given list of assets.
- **Parameters**:
  - `assets`: An array containing the addresses of the assets.
  - `sources`: An array containing the addresses of the sources (Chainlink Aggregators) for each asset.

### `_setFallbackOracle`

- **Description**: Internal function to set or update the fallback oracle.
- **Parameters**:
  - `fallbackOracle`: The address of the fallback oracle to be used in case of inconsistencies in Chainlink data.

### `_onlyAssetListingOrPoolAdmins`

- **Description**: Modifier restricting access to functions to only asset listing admins or pool admins.

## External Methods

### `getAssetPrice`

- **Description**: Returns the price of the supported asset in BASE_CURRENCY of the Aave Market.
- **Parameters**:
  - `asset`: The address of the asset for which the price is queried.
- **Return Value**:
  - `uint256`: Price in BASE_CURRENCY of the Aave market.

### `getAssetsPrices`

- **Description**: Returns the prices of the supported assets in BASE_CURRENCY of the Aave Market.
- **Parameters**:
  - `assets`: An array containing the addresses of the assets for which prices are queried.
- **Return Value**:
  - `uint256[]`: Prices in BASE_CURRENCY of the Aave market.

### `getSourceOfAsset`

- **Description**: Returns the address of the price source for a specific asset.
- **Parameters**:
  - `asset`: The address of the asset for which the price source is queried.

### `getFallbackOracle`

- **Description**: Returns the address of the fallback oracle.

## Write Methods

### `setAssetSources`

- **Description**: Sets the price source for a given list of assets. Can be called only by POOL_ADMIN or ASSET_LISTING_ADMIN.
- **Parameters**:
  - `assets`: An array containing the addresses of the assets for which the source is being set.
  - `sources`: An array containing the addresses of the sources for each asset.

### `setFallbackOracle`

- **Description**: Sets or updates the fallback oracle. Can be called only by POOL_ADMIN or ASSET_LISTING_ADMIN.
- **Parameters**:
  - `fallbackOracle`: The address of the fallback oracle.

## Events

1. **`AssetSourceUpdated` Event**
   - **Parameters**:
     - `asset`: The address of the asset for which the source is updated.
     - `source`: The new address of the source (Chainlink Aggregator).

2. **`FallbackOracleUpdated` Event**
   - **Parameters**:
     - `fallbackOracle`: The new address of the fallback oracle.

3. **`BaseCurrencySet` Event**
   - **Parameters**:
     - `baseCurrency`: The address of the base currency (if not USD).
     - `baseCurrencyUnit`: The unit of the base currency.

## Security Considerations

1. **Access Control**: Access to critical functions is restricted to asset listing admins and pool admins, ensuring secure management of oracle-related operations.

2. **Fallback Mechanism**: The fallback oracle provides a fail-safe mechanism, enhancing the resilience of the oracle system in case of data inconsistencies or unavailability.

3. **Chainlink Integration**: Integration with Chainlink Aggregators as the primary source ensures reliable and accurate price data.

## Conclusion

The `AaveOracle` contract serves as a fundamental element within the Aave protocol, offering decentralized applications accurate and reliable asset prices. With a seamless integration of Chainlink Aggregators, a robust fallback oracle mechanism, and the ability to dynamically manage asset sources, the contract plays a pivotal role in the Aave V3 oracle system. Users can confidently query asset prices, contributing to the stability and functionality of various decentralized finance applications built on the Aave platform.