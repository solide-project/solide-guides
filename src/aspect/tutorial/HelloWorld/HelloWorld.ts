import {
    allocate,
    entryPoint,
    execute,
    IPostContractCallJP,
    IPostTxExecuteJP,
    PostContractCallInput,
    PostTxExecuteInput,
    sys,
    uint8ArrayToHex,
  } from "@artela/aspect-libs";
  
  /**
   * Please describe what functionality this aspect needs to implement.
   *
   * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
   * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
   */
  class HelloWorldAspect implements IPostContractCallJP, IPostTxExecuteJP {
    postTxExecute(input: PostTxExecuteInput): void {
      throw new Error("Method not implemented.");
    }
    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param sender address of the transaction
     * @return true if check success, false if check fail
     */
    isOwner(sender: Uint8Array): bool {
      return true;
    }
  
    /**
     * postContractCall is a join-point which will be invoked after a contract call has finished.
     *
     * @param input input to the current join point
     */
    postContractCall(input: PostContractCallInput): void {
      let txData = uint8ArrayToHex(input.call!.data);
  
      // if call `world` function then revert, 30b67baa is method signature of `world`
      if (txData.startsWith("30b67baa")) {
        sys.revert("the function `world` not available");
      }
    }
  }
  
  // 2.register aspect Instance
  const aspect = new HelloWorldAspect();
  entryPoint.setAspect(aspect);
  
  // 3.must export it
  export {execute, allocate};
  