// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

error Closed(string msg, uint256 campaignId);

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] funders;
        uint256[] fundedAmount;
    }

    mapping (uint256 => Campaign) public campaigns;

    uint256 public campaignCounter;

    modifier onlyWhenOpen(uint256 _id) {
        if (campaigns[_id].deadline < block.timestamp)
            revert Closed("This campaign has been closed", _id);

        _;
    }

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) external returns(uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in future");

        Campaign storage campaign = campaigns[campaignCounter];

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;

        campaignCounter += 1;

        return campaignCounter - 1;
    }

    function fundToCampaign(uint256 _id) public payable onlyWhenOpen(_id) {
        Campaign storage campaign = campaigns[_id];

        (bool success,) = payable(campaign.owner).call{value: msg.value}("");
        require(success, "Unable to fund this campaign");

        campaign.amountCollected += msg.value;
        campaign.funders.push(msg.sender);
        campaign.fundedAmount.push(msg.value);
    }

    function getTotalAmountCollected(uint256 _id) external view returns (uint256) {
        return campaigns[_id].amountCollected;
    }

    function getFunders(uint256 _id) external view returns(address[] memory, uint256[] memory){
        return (campaigns[_id].funders, campaigns[_id].fundedAmount);
    }

    function getCampaigns() external view returns(Campaign[] memory) {
        Campaign[] memory ret = new Campaign[](campaignCounter);

        for (uint256 i; i < campaignCounter; ++i) 
            ret[i] = campaigns[i];

        return ret;
    }
}