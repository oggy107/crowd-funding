import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";
import { Campaign } from "../types";

interface FundCardProps {
    campaign: Campaign;
    handleClick: (campaign: Campaign) => void;
}

const FundCard = ({ campaign, handleClick }: FundCardProps) => {
    return (
        <div
            className="sm:w-[288px] w-full bg-primary shadow-secondary cursor-pointer rounded-[15px] overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02]"
            onClick={() => {
                handleClick(campaign);
            }}
        >
            <img
                src={campaign.image}
                alt="img"
                className="w-full h-[158px] object-cover"
            />

            <div className="flex flex-col p-4">
                <div className="flex items-center mb-[18px]">
                    <img
                        src={tagType}
                        alt="tag"
                        className="w-[17px] h-[17px] object-contain"
                    />
                    <p className="font-epilogue font-medium ml-[12px] mt-[2px] text-[12px] text-secondary">
                        Education
                    </p>
                </div>
                <div className="block">
                    <h3 className="font-epilogue font-semibold text-left text-white text-[16px] leading-[26px] truncate">
                        {campaign.title}
                    </h3>
                    <p className="mt-[5px] font-epilogue font-normal text-secondary text-left leading-[18px] truncate">
                        {campaign.description}
                    </p>
                </div>
                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div>
                        <h4 className="font-epilogue font-semibold text-left text-secondary_2 text-[14px] leading-[22px]">
                            {campaign.amountCollected}
                        </h4>
                        <p className="mt-[3px] font-epilogue text-[12px] text-secondary text-left leading-[18px] sm:max-w-[120px] truncate">
                            Raised of {campaign.target}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-epilogue font-semibold text-left text-secondary_2 text-[14px] leading-[22px]">
                            {daysLeft(campaign.deadline)}
                        </h4>
                        <p className="mt-[3px] font-epilogue text-[12px] text-secondary text-left leading-[18px] sm:max-w-[120px] truncate">
                            Days Left
                        </p>
                    </div>
                </div>
                <div className="flex items-center mt-[20px] gap-[12px]">
                    <div className="w-[30px] h-[30px] bg-[#2c2f32] rounded-full flex justify-center items-center">
                        <img
                            src={thirdweb}
                            alt="thirdweb"
                            className="w-1/2 h-1/2 object-contain"
                        />
                    </div>
                    <p className="flex-1 font-epilogue truncate font-normal text-[12px] text-secondary">
                        by
                        <span className="text-secondary_2 ml-1">
                            {campaign.owner}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FundCard;
