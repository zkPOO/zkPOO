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

  const talentLayerId = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const talentLayerService = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  const talentLayerEscrow = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";
  const groupId = 42;

  const { semaphore } = await run("deploy:semaphore");

  const token = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

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
