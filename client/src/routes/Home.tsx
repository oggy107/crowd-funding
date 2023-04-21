import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { web3Context } from "../context";
import { Campaigns } from "../components";
import { Campaign } from "../types";

const Home = () => {
    const web3 = useContext(web3Context);
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        web3.fetchCampaigns!()
            .then((campaigns: Array<Campaign>) => {
                setCampaigns(campaigns);
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
            <Campaigns
                title="All Campaigns"
                isLoading={isLoading}
                campaigns={campaigns}
            />
        </div>
    );
};

export default Home;
