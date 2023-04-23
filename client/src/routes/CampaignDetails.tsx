import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ethers } from "ethers";

import { web3Context } from "../context";
import { CustomButton, CountBox, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { Campaign, Donation } from "../types";

const CampaignDetails = () => {
    const web3 = useContext(web3Context);
    const { state } = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [donations, setDonations] = useState<Array<Donation>>([]);

    const campaign: Campaign = state.campaign;

    useEffect(() => {
        if (web3.provider) {
            fetchDonations();
        }
    }, [web3.provider]);

    const connect = () => {
        if (web3.connect) {
            web3.connect()
                .then(() => {
                    toast.success("Connected to Metamask");
                })
                .catch((error: Error) => {
                    toast.error(error.message);
                });
        }
    };

    const handleDonate = async () => {
        if (amount) {
            if (Number(amount) < 0) toast.error("Invalid amount");
            else {
                setIsLoading(true);
                web3.donateToCampaign!(campaign.id, ethers.parseEther(amount))
                    .then(() => {
                        toast.success(`Successfully donated ${amount} ETH`);
                        setIsLoading(false);
                        navigate("/");
                    })
                    .catch((error: Error) => {
                        toast.error(error.message);
                        setIsLoading(false);
                    });
            }
        } else {
            toast.error("Amount can not be empty");
        }
    };

    const fetchDonations = async () => {
        const donations = await web3.getDonations!(campaign.id);
        if (donations) {
            setDonations(donations);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}

            <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                <div className="flex-1 flex-col">
                    <img
                        src={campaign.image}
                        alt="fund"
                        className="w-full h-[410px] object-cover rounded-xl"
                    />
                    <div className="relative w-full h-[7px] bg-[#3a3a43] rounded-full overflow-hidden">
                        <div
                            className="absolute h-full bg-[#4acd8d]"
                            style={{
                                width: `${calculateBarPercentage(
                                    Number(campaign.target),
                                    Number(campaign.amountCollected)
                                )}%`,
                                maxWidth: "100%",
                            }}
                        ></div>
                    </div>
                </div>
                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                    <CountBox
                        title="Days Left"
                        value={daysLeft(campaign.deadline)}
                    />
                    <CountBox
                        title={`Raised of ${campaign.target}`}
                        value={campaign.amountCollected}
                    />
                    <CountBox title="Total Backers" value={donations.length} />
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                            Creator
                        </h4>
                        <div className="mt-[20px] flex flex-row flew-wrap justify-cente items-center gap-[14px]">
                            <div className="w-[52px] h-[52px] flex items-center justify-center flex-shrink-0 rounded-full bg-[#2c2f32] cursor-pointer">
                                <img
                                    src={thirdweb}
                                    alt="user"
                                    className="w-[60%] h-[60%] object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                                    {campaign.owner}
                                </h4>
                                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                                    10 Campaigns
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                            Story
                        </h4>
                        <div className="mt-[20px]">
                            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                {campaign.description}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                            Donators
                        </h4>
                        <div className="mt-[20px] flex flex-col gap-4">
                            {donations.length > 0 ? (
                                donations.map((donation, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center gap-4"
                                        >
                                            <p className="font-epilogue text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                                                {index + 1}. {donation.donator}
                                            </p>
                                            <p className="font-epilogue text-[16px] text-[#808191] leading-[26px] break-all">
                                                {donation.donation} ETH
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                    No Donators yet. Be the first one
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                        Fund
                    </h4>

                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                        <p className="font-epilogue font-medium text-[20px] text-center text-[#808191] leading-[30px]">
                            Fund the campaign
                        </p>
                        <div className="mt-[30px]">
                            <input
                                type="number"
                                placeholder="ETH 0.1"
                                step="0.01"
                                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                        </div>

                        <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                            <h4 className="font-epilogue font-semibold text-[14px] text-white leading-[22px]">
                                Back it because you believe in it.
                            </h4>
                            <p className="mt-[20px] font-epilogue leading-[22px] text-[#808181]">
                                Support the project for no reward, just because
                                it speaks to you.
                            </p>
                        </div>

                        <CustomButton
                            btnType="button"
                            title={web3.provider ? "Fund Campaign" : "Connect"}
                            styles="w-full bg-[#8c6dfd]"
                            handleClick={() => {
                                if (web3.provider) handleDonate();
                                else connect();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
