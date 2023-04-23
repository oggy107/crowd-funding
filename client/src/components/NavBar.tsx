import { useState, useContext, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CustomButton } from "./";
import { logo, menu, thirdweb, search } from "../assets";
import { navlinks } from "../constants";
import { NavLinkNames } from "../types";
import { web3Context, navContext } from "../context";
import { toast } from "react-toastify";

const NavBarButton = () => {
    const navigate = useNavigate();
    const web3 = useContext(web3Context);
    const { setActive } = useContext(navContext);

    const handleClick = () => {
        if (web3.provider) {
            navigate("/create-campaign");
            setActive!(NavLinkNames.CAMPAIGN);
        } else {
            if (web3.connect) {
                web3.connect()
                    .then(() => {
                        toast.success("Connected to Metamask");
                    })
                    .catch((error: Error) => {
                        toast.error(error.message);
                    });
            }
        }
    };

    return (
        <CustomButton
            btnType="button"
            title={web3.provider ? "Create a campaign" : "Connect"}
            styles={web3.provider ? "bg-primary_2" : "bg-secondary_2"}
            handleClick={() => {
                handleClick();
            }}
        />
    );
};

const NavBar = () => {
    const navigate = useNavigate();
    const { setActive, active } = useContext(navContext);
    const [toggleDrawer, setToggleDrawser] = useState(false);

    // close drawer on scroll
    const handleScroll = useCallback(() => {
        setToggleDrawser(false);
    }, []);

    useEffect(() => {
        if (toggleDrawer) {
            document.addEventListener("scroll", handleScroll);
        } else {
            document.removeEventListener("scroll", handleScroll);
        }
    }, [toggleDrawer]);

    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
            <div className="lg:flex-1 flex flex-row md:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-full">
                <input
                    type="text"
                    className="w-full font-epilogue font-normal text-[14px] bg-transparent outline-none text-white placeholder:text-placeholder"
                    placeholder="Search for campaigns"
                />
                <div className="w-[72px] h-full rounded-full bg-primary_2 flex justify-center items-center cursor-pointer ">
                    <img
                        src={search}
                        alt="search-logo"
                        className="w-[15px] h-[15px] object-contain"
                    />
                </div>
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                <NavBarButton />
                <Link
                    to="/profile"
                    onClick={() => {
                        setActive!(NavLinkNames.PROFILE);
                    }}
                >
                    <div className="w-[52px] h-[52px] flex justify-center items-center cursor-pointer bg-[#2c2f32] rounded-full">
                        <img
                            src={thirdweb}
                            alt="user"
                            className="w-[60%] h-[60%] object-contain"
                        />
                    </div>
                </Link>
            </div>

            {/* small screen navigation */}
            <div className="sm:hidden flex justify-between items-center relative">
                {/* overlay to close drawer on clikcing somewhere else */}
                <div
                    className={`absolute w-full h-screen top-[50px] z-10 ${
                        toggleDrawer == false && "hidden"
                    }`}
                    onClick={() => {
                        setToggleDrawser(false);
                    }}
                ></div>
                <div
                    className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer bg-[#2c2f32] rounded-[10px]"
                    onClick={() => {
                        setToggleDrawser(false);
                        navigate("/");
                        setActive!(NavLinkNames.DASHBOARD);
                    }}
                >
                    <img
                        src={logo}
                        alt="user"
                        className="w-[60%] h-[60%] object-contain"
                    />
                </div>
                <img
                    src={menu}
                    alt="menu"
                    className="w-[34px] h-[34px] object-contain cursor-pointer"
                    onClick={() =>
                        setToggleDrawser((prev) => {
                            return !prev;
                        })
                    }
                />

                <div
                    className={`absolute top-[60px] right-0 left-0 bg-primary z-10 shadow-secondary py-4 rounded-[10px] ${
                        !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
                    } transition-all duration-700`}
                >
                    <ul className="mb-4">
                        {navlinks.map((navLink) => {
                            return (
                                <li
                                    key={navLink.name}
                                    className={`flex p-4 ${
                                        active === navLink.name &&
                                        "bg-[#3a3a43]"
                                    }`}
                                    onClick={() => {
                                        setActive!(navLink.name);
                                        setToggleDrawser(false);
                                        navigate(navLink.link);
                                    }}
                                >
                                    <img
                                        src={navLink.imgUrl}
                                        alt={navLink.name}
                                        className={`w-[24px] h-[24px] object-contain ${
                                            active === navLink.name
                                                ? "grayscale-0"
                                                : "grayscale"
                                        }`}
                                    />
                                    <p
                                        className={`ml-5 flex items-center font-epilogue font-semibold text-[14px] ${
                                            active === navLink.name
                                                ? "text-[#1dc071]"
                                                : "text-[#808191]"
                                        }`}
                                    >
                                        {navLink.name}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex justify-center">
                        <NavBarButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
