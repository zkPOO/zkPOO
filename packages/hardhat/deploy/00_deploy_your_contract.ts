import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const talentLayerId = "0x8fcC971DC5B7D006e9C435D126829f18FE923E35";
  const talentLayerService = "0x14e46f6d746bc5F0B01B2AF4a2FE9cC2252A23bA";
  const talentLayerEscrow = "0xBe63C8B74369bE4aaf138558feA3c761bE066FF1";
  const groupId = 42;

  const { semaphore } = await run("deploy:semaphore");

  const token = "0x177394dF8259Fee65d53F99e7486E3F92c9F3252";

  // await deploy("Token", {
  //   from: deployer,
  //   log: true,
  //   autoMine: true,
  // });

  await deploy("Marketplace", {
    from: deployer,
    // Contract constructor arguments
    args: ["ZKPOO NFT", "POO", semaphore.address, talentLayerId, talentLayerService, talentLayerEscrow, token, groupId],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["Marketplace"];
