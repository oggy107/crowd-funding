import chai from "chai";
import hre from "hardhat";
import { CrowdFunding } from "../typechain-types";
import { solidity } from "ethereum-waffle";

chai.use(solidity);

const localNetworks = ["hardhat", "ganache", "local"];

if (!localNetworks.includes(hre.network.name)) {
    throw new Error(
        "Tests are only available for local networks like hardhat and ganache"
    );
}

const AMOUNT = hre.ethers.utils.parseEther("2");
const DEAD_LINE = Math.floor(Date.now() / 1000) + 10;
const ACCOUNTS = hre.ethers.provider.listAccounts();
let crowdFunding: CrowdFunding;

describe("Crowd Funding", () => {
    before(async () => {
        const SIGNER = (await hre.ethers.getSigners())[0];

        const crowdFundingFactory = await hre.ethers.getContractFactory(
            "CrowdFunding",
            SIGNER
        );

        crowdFunding = await crowdFundingFactory.deploy();

        await crowdFunding.deployed();
    });

    it("should be able to create new campaigns", async () => {
        const accounts = await ACCOUNTS;

        await crowdFunding.createCampaign(
            accounts[5],
            "This is first dummy campaign",
            "This is description of first dummy campaign",
            AMOUNT,
            DEAD_LINE,
            "first-dummy.jpg"
        );

        await crowdFunding.createCampaign(
            accounts[3],
            "This is second dummy campaign",
            "This is description of second dummy campaign",
            AMOUNT,
            DEAD_LINE,
            "second-dummy.jpg"
        );

        const campaignCounter = (
            await crowdFunding.campaignCounter()
        ).toString();

        const campaigns = await crowdFunding.getCampaigns();

        chai.assert.equal(
            campaignCounter,
            "2",
            "campaignCounter is not set to 2"
        );
        chai.assert.equal(
            campaigns[0].title,
            "This is first dummy campaign",
            "the title does not match up with what was set"
        );
        chai.assert.equal(
            campaigns[1].owner,
            accounts[3],
            "the owner does not match up with what was set"
        );
        chai.assert.equal(
            campaigns[1].amountCollected.toString(),
            "0",
            "amountCollected is not set to 0"
        );
        chai.expect(campaigns[0].funders).empty;
    });

    it("should be able to fund", async () => {
        const ID = 0;
        const localAccount = (await ACCOUNTS)[3];
        const signerAddress = await crowdFunding.signer.getAddress();
        const localAmount = hre.ethers.utils.parseEther("3");
        const totalAmountFunded = hre.ethers.utils.parseEther("7");
        const campaign = await crowdFunding.campaigns(ID);

        let funders, fundedAmount;

        [funders, fundedAmount] = await crowdFunding.getFunders(ID);

        chai.expect(funders).empty;
        chai.expect(fundedAmount).empty;

        const ownerBalanceBeforeFunding = await hre.ethers.provider.getBalance(
            campaign.owner
        );

        await crowdFunding.fundToCampaign(ID, { value: AMOUNT });
        await crowdFunding.fundToCampaign(ID, { value: AMOUNT });
        await crowdFunding
            .connect(await hre.ethers.getSigner(localAccount))
            .fundToCampaign(ID, { value: localAmount });

        const ownerBalanceAfterFunding = await hre.ethers.provider.getBalance(
            campaign.owner
        );

        chai.assert.equal(
            (await crowdFunding.getTotalAmountCollected(ID)).toString(),
            (
                ownerBalanceAfterFunding.toBigInt() -
                ownerBalanceBeforeFunding.toBigInt()
            ).toString(),
            "total amount funded did not reflected in campaign owners account"
        );

        [funders, fundedAmount] = await crowdFunding.getFunders(ID);

        chai.assert.equal(
            funders[0],
            signerAddress,
            "funder address is not correct"
        );
        chai.assert.equal(
            funders[2],
            localAccount,
            "funder address is not correct"
        );
        chai.assert.equal(
            fundedAmount[2].toString(),
            localAmount.toString(),
            "funder amount is not correct"
        );
        chai.assert.equal(
            (await crowdFunding.getTotalAmountCollected(ID)).toString(),
            totalAmountFunded.toString(),
            "totalAmountCollected is not equal to totalAmountFunded"
        );
    });

    it("should revert after deadline has passed", function (done) {
        this.timeout(10 * 1000 + 10000);

        console.log(`\tWaiting to hit the deadline: ${DEAD_LINE}`);

        const interval = setInterval(() => {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`\t=>: ${Math.floor(Date.now() / 1000)}`);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            console.log();
            chai.expect(
                crowdFunding.fundToCampaign(0, { value: AMOUNT })
            ).to.be.reverted.then(() => {
                done();
            });
        }, 10 * 1000 + 5000);
    });
});
