import { ethers, network } from "hardhat";

const main = async () => {
    const signer = (await ethers.getSigners())[0];

    const crowdFundingFactory = await ethers.getContractFactory(
        "CrowdFunding",
        signer
    );

    console.log(network);

    const crowdFunding = await crowdFundingFactory.deploy();

    await crowdFunding.deployed();

    console.log(
        `\ncrowdFunding contract deployed\nto: ${
            crowdFunding.address
        }\nby: ${await crowdFunding.signer.getAddress()}\n`
    );
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
