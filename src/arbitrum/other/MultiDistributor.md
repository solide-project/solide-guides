# MultiDistributor Contract Guide

## Overview

The `MultiDistributor` smart contract is designed to efficiently manage the distribution of tokens to whitelisted users through batched claims. Developed by Lyra, the contract allows approved addresses to create batches of token claims, which users can subsequently redeem. The owner has the authority to approve or reject these claims and can manage the whitelist of addresses permitted to initiate batched claims.

## Key Features

1. **Whitelisted Addresses:** The contract supports a whitelist mechanism, allowing specified addresses to create batched claims. This feature ensures that only trusted entities can initiate distribution events.

2. **Batched Claims:** Whitelisted addresses can create batches of token claims by specifying token amounts, user addresses, the reward token, and additional details such as epoch timestamp and tag.

3. **Owner Approval:** The contract owner has the exclusive authority to approve or disapprove batches of claims. This enables an additional layer of control and ensures that only legitimate claims are processed.

4. **Claim Redemption:** Users can redeem their claims by providing a list of batch IDs they want to claim. The contract checks for approval status, and if approved, transfers the specified token amounts to the users.

5. **Claimable Amount Queries:** Users can query the contract to determine the claimable amount of a specific token for a given address, considering a list of batch IDs.

6. **Claimable ID Queries:** Users can retrieve a list of claimable batch IDs for a given address, aiding transparency and allowing users to plan their claim strategies.

## Internal Functions

- **setWhitelistAddress:** Allows the owner to add or remove addresses from the whitelist, controlling who can initiate batched claims.

- **approveClaims:** Permits the owner to approve or disapprove specific batch IDs, providing a granular control mechanism for token distribution.

- **addToClaims:** Exclusive to whitelisted addresses, this function facilitates the addition of token amounts for a batch, associating them with respective user addresses and reward tokens.

- **claim:** Enables users to redeem their claims by providing a list of batch IDs. The contract checks approval status and transfers the claimed amounts to the users.

- **getClaimableAmountForUser:** Allows users to query the contract to determine the claimable amount of a specific token for a given address.

- **getClaimableIdsForUser:** Enables users to retrieve a list of claimable batch IDs for a given address.

## Events

- **WhitelistAddressSet:** Fired when an address is added or removed from the whitelist.

- **Claimed:** Triggered when a user successfully claims tokens from a batch.

- **ClaimAdded:** Signals the addition of a batch, including details such as the reward token, user addresses, and additional information like epoch timestamp and tag.

- **ClaimApproved:** Indicates the approval of a specific batch ID by the contract owner.

## Security Considerations

- **Whitelist Mechanism:** The whitelist feature ensures that only trusted addresses can create batches, minimizing the risk of unauthorized claims.

- **Owner Approval:** The owner's exclusive approval authority enhances security by preventing unauthorized or malicious claims.

- **Batch Approval:** The ability to approve or disapprove batches provides an additional layer of control, allowing the owner to scrutinize and validate claims.

## Conclusion

The `MultiDistributor` contract introduces a robust and flexible mechanism for batched token distribution, catering to the needs of both contract deployers and end-users. Its features, including whitelisting, owner approval, and detailed event logging, contribute to a secure and transparent token distribution process. By incorporating these functionalities, the contract aims to streamline and secure the token distribution experience in decentralized applications.