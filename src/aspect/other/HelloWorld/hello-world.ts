import {
  allocate,
  entryPoint,
  execute,
  IPostContractCallJP,
  PostContractCallInput,
  sys,
  uint8ArrayToHex,
} from "@artela/aspect-libs";

// 1. implement IPostContractCallJP
class Aspect implements IPostContractCallJP {

  isOwner(sender: Uint8Array): bool {
    // implement me
    // if return false，bind、unbind、upgrade Aspect will be block
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
const aspect = new Aspect();
entryPoint.setAspect(aspect);

// 3.must export it
export { execute, allocate };