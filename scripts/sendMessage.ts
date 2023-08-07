import { ethers, network } from "hardhat";

async function main() {
  if(network.name !== `avalancheFuji`) {
    console.error(`❌ Must be called from Avalanche Fuji`);
    return 1;
  }

  const ccipSenderAddress = `0xBa53D9CFf23358747886151c49De9D70925105F4`;
  const ccipReceiverAddress = `0xe6EeCA86F57BDCF25c9D12Ce5AC3EB78aF6dc7aB`;
  const someText = `CCIP Masterclass`;
  const destinationChainSelector = ethers.BigNumber.from("16015286601757825753");

  const ccipSenderFactory = await ethers.getContractFactory("MyCCIPSender");
  const ccipSender = await ccipSenderFactory.attach(ccipSenderAddress);

  const tx = await ccipSender.send(
      ccipReceiverAddress, 
      someText,
      destinationChainSelector
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});