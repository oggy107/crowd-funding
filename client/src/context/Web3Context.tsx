import { FC, createContext, ReactNode, useState, useEffect } from "react";
import { JsonRpcApiProvider, ethers } from "ethers";

import { metaMaskError } from "../constants";
import { CampaignForm, Campaign, Donation } from "../types";
import CrowdFunding from "../contract/CrowdFunding.json";

interface Web3ContextProps {
    children: ReactNode;
}

interface Web3Context {
    connect: (() => Promise<void>) | undefined;
    provider: JsonRpcApiProvider | undefined;
    publishCampaign: ((form: CampaignForm) => Promise<void>) | undefined;
    fetchCampaigns: (() => Promise<any>) | undefined;
    donateToCampaign:
        | ((id: number, amount: bigint) => Promise<void>)
        | undefined;
    getDonations:
        | ((id: number) => Promise<Array<Donation> | undefined>)
        | undefined;
}

const web3ContextDefault: Web3Context = {
    connect: undefined,
    provider: undefined,
    publishCampaign: undefined,
    fetchCampaigns: undefined,
    donateToCampaign: undefined,
    getDonations: undefined,
};

export const web3Context = createContext<Web3Context>(web3ContextDefault);

export const Web3Provider: FC<Web3ContextProps> = ({ children }) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider>();
    const ethereum = window.ethereum;

    useEffect(() => {
        initialCheck();

        if (ethereum) {
            const accountWasChanged = (accounts: any) => {
                if (!accounts.length) {
                    setProvider(undefined);
                }
            };

            ethereum.on("accountsChanged", accountWasChanged);
            ethereum.on("networkChanged", () => {
                window.location.reload();
            });
        }
    }, []);

    const handleError = (error: any) => {
        // console.error(error);

        if (error.error) {
            if (error.error.code === metaMaskError.resourceUnavailable.code) {
                throw new Error(metaMaskError.resourceUnavailable.message);
            }
        } else if (error.info.error) {
            if (
                error.info.error.code === metaMaskError.userRejectedRequest.code
            ) {
                throw new Error(metaMaskError.userRejectedRequest.message);
            }
        } else {
            throw new Error("Something went wrong");
        }
    };

    const initialCheck = () => {
        if (ethereum) {
            ethereum
                .request({ method: "eth_accounts" })
                .then((accounts: any) => {
                    if (accounts.length > 0) {
                        setProvider(new ethers.BrowserProvider(ethereum));
                    }
                });
        }
    };

    const getContract = async () => {
        if (provider) {
            const signer = await provider.getSigner();

            const GOERLI = "0xdDd1fe94f72e221A4BFd7700d5a6dD05De24912E";
            const SEPOLIA = "0xa14e3A60d284C705F77F45617beADD55C3C61e23";

            const network = (await provider.getNetwork()).name;

            const contractAddress = network === "goerli" ? GOERLI : SEPOLIA;

            return new ethers.Contract(
                contractAddress,
                CrowdFunding.abi,
                signer
            );
        }
    };

    const connect = async () => {
        if (!ethereum) throw new Error("Metamask not found. Please install it");

        try {
            const provider = new ethers.BrowserProvider(ethereum);
            await provider.send("eth_requestAccounts", []);
            setProvider(provider);
        } catch (error: any) {
            handleError(error);
        }
    };

    const publishCampaign = async (form: CampaignForm) => {
        if (provider) {
            try {
                await (await getContract())!.createCampaign(
                    (
                        await provider.getSigner()
                    ).address,
                    form.title,
                    form.description,
                    ethers.parseUnits(form.target, 18),
                    new Date(form.deadline).getTime() / 1000,
                    form.image
                );
                console.log("success");
            } catch (error: any) {
                handleError(error);
            }
        }
    };

    const fetchCampaigns = async () => {
        if (provider) {
            try {
                const campaigns: Array<Array<string>> =
                    await (await getContract())!.getCampaigns();

                const parsedCampaigns = campaigns.map((campaign, index) => {
                    return {
                        owner: campaign[0],
                        title: campaign[1],
                        description: campaign[2],
                        target: ethers.formatEther(campaign[3]),
                        deadline: Number(campaign[4]),
                        amountCollected: ethers.formatEther(campaign[5]),
                        image: campaign[6],
                        id: index,
                    } as Campaign;
                });

                if ([...parsedCampaigns][0]) {
                    return [...parsedCampaigns];
                } else {
                    return [];
                }
            } catch (error: any) {
                handleError(error);
            }
        }
    };

    const donateToCampaign = async (id: number, amount: bigint) => {
        if (provider) {
            try {
                await (await getContract())!.fundToCampaign(id, {
                    value: amount,
                });
            } catch (error) {
                handleError(error);
            }
        }
    };

    const getDonations = async (id: number) => {
        if (provider) {
            try {
                let donators: Array<string>;
                let donationAmounts: Array<string>;

                [donators, donationAmounts] =
                    await (await getContract())!.getFunders(id);

                const parsedDonators = [...donators.map((donator) => donator)];

                const parsedDonationAmounts = [
                    ...donationAmounts.map((donation) => donation),
                ];

                const donations: Array<Donation> = [];

                donators.forEach((donator, index) => {
                    donations.push({
                        donator: donator,
                        donation: ethers.formatEther(
                            parsedDonationAmounts[index]
                        ),
                    } as Donation);
                });

                return donations;
            } catch (error) {
                handleError(error);
            }
        }
    };

    return (
        <web3Context.Provider
            value={{
                connect,
                provider,
                publishCampaign,
                fetchCampaigns,
                donateToCampaign,
                getDonations,
            }}
        >
            {children}
        </web3Context.Provider>
    );
};
