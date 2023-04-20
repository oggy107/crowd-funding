import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { NavLinkNames } from "../types";
import { navContext } from "../context";

interface IconProps {
    styles: string;
    name?: string;
    imgUrl: string;
    active?: string;
    disabled?: boolean;
    handleClick?: () => void;
}

const Icon = ({
    styles,
    active,
    name,
    disabled,
    imgUrl,
    handleClick,
}: IconProps) => {
    return (
        <div
            className={`w-[48px] h-[48px] rounded-[10px] ${
                active && active === name && "bg-[#2c2f32]"
            } flex justify-center items-center ${
                !disabled && "cursor-pointer"
            } ${styles}`}
            onClick={handleClick}
        >
            {!active ? (
                <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
            ) : (
                <img
                    src={imgUrl}
                    alt="fund_logo"
                    className={`w-1/2 h-1/2 ${active !== name && "grayscale"}`}
                />
            )}
        </div>
    );
};

const SideBar = () => {
    const navigate = useNavigate();
    const { active, setActive } = useContext(navContext);

    return (
        <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
            <Link to="/">
                <Icon
                    styles="w-[52px] h-[52px] bg-[#2c2f32]"
                    imgUrl={logo}
                    disabled={false}
                    name="logo"
                    handleClick={() => {
                        setActive!(NavLinkNames.DASHBOARD);
                    }}
                />
            </Link>
            <div className="flex-1 flex flex-col justify-between items-center bg-primary rounded-[20px] w-[76px] py-4 mt-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    {navlinks.map((navLink) => {
                        return (
                            <Icon
                                key={navLink.name}
                                name={navLink.name}
                                styles="w-[40px] h-[40px]"
                                imgUrl={navLink.imgUrl}
                                active={active}
                                disabled={navLink.disabled}
                                handleClick={() => {
                                    if (!navLink.disabled) {
                                        setActive!(navLink.name);
                                        navigate(navLink.link);
                                    }
                                }}
                            />
                        );
                    })}
                </div>
                {/* <Icon styles="bg-primary shadow-secondary" imgUrl={sun} /> */}
            </div>
        </div>
    );
};

export default SideBar;
