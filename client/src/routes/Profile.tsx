import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { web3Context } from "../context";
import { Campaign } from "../types";
import { Campaigns } from "../components";

const Profile = () => {
    const web3 = useContext(web3Context);
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const address = (await web3.provider!.getSigner()).address;

        web3.fetchCampaigns!()
            .then((campaigns: Array<Campaign>) => {
                setCampaigns(
                    campaigns.filter((campaign) => campaign.owner == address)
                );
                setIsLoading(false);
            })
            .catch((error: Error) => {
                toast.error(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (web3.provider) {
            fetchCampaigns();
        }
    }, [web3.provider]);

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            <Campaigns
                title="Your Campaigns"
                isLoading={isLoading}
                campaigns={campaigns}
            />
        </div>
    );
};

export default Profile;
