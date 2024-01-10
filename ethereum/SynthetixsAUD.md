# Synthetix AUD Stablecoin Smart Contract Overview

## Overview

The `sAUD` smart contract is designed to serve as a decentralized mechanism for tracking the price of Australian Dollars (AUD) in Wei, relying on price feeds supplied by an external oracle. The contract ensures that the price is updated only by the owner, providing transparency and control over the price oracle mechanism.

## Key Features

1. **Price Tracking:** The contract maintains the current price of 1 AUD in Wei through the `priceInWei` variable.

2. **Oracle Integration:** Utilizes the `OracleInterface` to interact with an external oracle contract, enabling the retrieval of accurate and up-to-date price feeds.

3. **Owner-Controlled Price Update:** The contract allows the owner to trigger the update of the AUD price, ensuring that the price oracle mechanism remains under control.

4. **Conversion Function:** Users can convert a specified amount of AUD to Wei based on the current price using the `convertAUDtoWei` function.

## Internal Functions

1. **`constructor(address _owner, address _oracleAddress)`**
   - Initializes the contract with the provided owner's address and the address of the oracle contract.
   - Calls the `updateAUDPrice` function during deployment to set the initial AUD price.

2. **`updateAUDPrice()`**
   - Fetches the latest price of 1 AUD in Wei from the connected oracle.
   - Updates the `priceInWei` variable with the new price.
   - Emits the `PriceUpdated` event with the updated price.

3. **`convertAUDtoWei(uint amountInAUD) → uint`**
   - Converts the specified amount of AUD to Wei based on the current price.
   - Ensures that the amount to convert is greater than zero.
   - Uses SafeMath or equivalent for safe arithmetic operations to prevent overflow.

## Events

1. **`PriceUpdated(uint newPrice)`**
   - Emitted whenever the AUD price is updated.
   - Provides the new price of 1 AUD in Wei as an argument.

## Security Considerations

1. **Owner Privileges:** The contract ensures that only the owner can trigger the update of the AUD price, preventing unauthorized modifications.

2. **Oracle Reliability:** The security of the price feed depends on the reliability and trustworthiness of the connected oracle. Users should carefully choose a reputable oracle service.

3. **Safe Arithmetic:** The contract uses safe arithmetic operations, such as those provided by SafeMath, to prevent overflow during conversion calculations.

4. **Input Validation:** Functions that take user inputs, such as `convertAUDtoWei`, validate that the inputs are within acceptable ranges to avoid unexpected behavior.

## Conclusion

The `sAUD` contract provides a transparent and owner-controlled mechanism for tracking the price of Australian Dollars in Wei. By leveraging an external oracle, it ensures accurate and reliable price feeds. Users can confidently convert AUD to Wei based on the latest price, and the owner maintains control over the price update process. As with any financial contract, users are advised to exercise caution and perform due diligence when selecting an oracle service.