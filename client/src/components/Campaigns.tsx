import { useNavigate } from "react-router-dom";

import FundCard from "./FundCard";
import { Campaign } from "../types";
import { loader } from "../assets";

interface CampaignsProps {
    title: string;
    isLoading: boolean;
    campaigns: Array<Campaign>;
}

const Campaigns = ({ title, isLoading, campaigns }: CampaignsProps) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign: Campaign) => {
        navigate(`/campaign-details/${campaign.id}`, {
            state: { campaign },
        });
    };

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-white text-[18px] text-left">
                {title} ({campaigns.length})
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px] justify-around">
                {isLoading && (
                    <img
                        src={loader}
                        alt="loading..."
                        className="w-[100px] h-[100px] object-contain"
                    />
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[#818183] text-[14px] leading-[30px]">
                        No campaigns found.
                    </p>
                )}

                {!isLoading &&
                    campaigns.length > 0 &&
                    campaigns.map((campaign) => {
                        return (
                            <FundCard
                                campaign={campaign}
                                key={campaign.id}
                                handleClick={handleNavigate}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Campaigns;
