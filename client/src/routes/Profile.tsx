import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { web3Context, navContext } from "../context";
import { Campaign } from "../types";
import { Campaigns } from "../components";

const Profile = () => {
    const web3 = useContext(web3Context);
    const { search } = useContext(navContext);

    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);
    const [allCampaigns, setAllCampaigns] = useState<Array<Campaign>>([]);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const address = (await web3.provider!.getSigner()).address;

        web3.fetchCampaigns!()
            .then((campaigns: Array<Campaign>) => {
                const filteredCampaigns = campaigns.filter(
                    (campaign) => campaign.owner == address
                );
                setCampaigns(filteredCampaigns);
                setAllCampaigns(filteredCampaigns);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                toast.error(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (search!) {
            setCampaigns(
                allCampaigns.filter((campaign) =>
                    campaign.title.toLowerCase().includes(search!)
                )
            );
        } else {
            setCampaigns(allCampaigns);
        }
    }, [search]);

    useEffect(() => {
        if (web3.provider) {
            fetchCampaigns();
        }
    }, [web3.provider]);

    return (
        <div>
            <Campaigns
                title="Your Campaigns"
                isLoading={isLoading}
                campaigns={campaigns}
            />
        </div>
    );
};

export default Profile;
