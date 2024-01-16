# Arbitrum's L2 Inbox Contract Documentation

## Overview

The `Inbox` smart contract is a pivotal component of the Arbitrum rollup solution, providing a mechanism for delivering messages from Layer 1 (L1) to Layer 2 (L2). Messages can be submitted using either direct send-related functions or by creating a retryable ticket. The two approaches cater to different use cases, with direct sends offering simplicity and lower latency, while retryable tickets address potential issues like out-of-gas failures. This documentation aims to explore the message delivery flow, key functionalities, and interfaces provided by the `Inbox` contract.

## Message Delivery Methods

Arbitrum supports two primary methods for sending messages from L1 to L2:

### 1. Direct Send

Users can send messages directly by calling specific send-related functions. This method is straightforward and boasts relatively lower latency compared to the alternative.

### 2. Retryable Tickets

The second approach involves creating a retryable ticket on L1, which users later redeem on L2. The Arbitrum team introduced this method to mitigate potential out-of-gas failures associated with direct sends.

![Message Delivery Methods](insert_image_url)

## Message Flow

Messages from L1 to L2 are placed in the `Inbox`, akin to deposits. Subsequently, anyone can submit transactions to L2 through the `Inbox`. However, when the message is executed on L2, the caller remains unaware of the execution result.

![Message Flow Overview](insert_image_url)

## Sequencer Integration

A high-level overview of the message flow involves users submitting messages to the `Inbox` in the bridge component. Sequencers, who have the authority to release messages within 24 hours, play a crucial role. After this timeframe, anyone can release the message to the main sequencer inbox, preventing misbehavior by sequencers.

![Sequencer Integration](insert_image_url)

## Message Submission Interfaces

The `Inbox` contract exposes various interfaces for submitting messages:

- `sendL2MessageFromOrigin()`
- `sendL2Message()`
- `sendL1FundedUnsignedTransaction()`
- `sendUnsignedTransaction()`
- `sendContractTransaction()`
- `depositEth()`
- `createRetryableTicket()`

Currently, the most-used function is `depositETH()`. An example transaction of this function call involves sending a message with type `L1MessageType_submitRetryableTx` and emitting two events: `MessageDelivered` and `InboxMessageDelivered`.

## Implementation Details

The source code for the `Inbox` contract can be found in the Arbitrum repository at `arbitrum/packages/arb-bridge-eth/contracts/bridge/Inbox.sol`. The proxy contract is deployed at `0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f`, and `Inbox` is deployed at `0xc23e3f20340f8ef09c8861a724c29db43ba3eed4`.

## Example Transaction Flow

The primary function, `depositETH()`, serves as the entry point for users to submit messages to the bridge. The function call graph illustrates how message-related data flows from `Inbox.sol` to `Bridge.sol`. Throughout its lifecycle, two crucial events are emitted, signaling that the message was sent to the inbox and added to the queue.

![Example Transaction Flow](insert_image_url)

## Conclusion

The `Inbox` smart contract plays a vital role in enabling the seamless transfer of messages from L1 to L2 in the Arbitrum rollup. Its support for direct sends and retryable tickets, along with integration with sequencers, contributes to the robustness and flexibility of the Arbitrum solution. Understanding the various interfaces and transaction flows is essential for users and developers leveraging Arbitrum for their applications.