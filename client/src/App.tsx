import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CreateCampaign, CampaignDetails, Home, Profile } from "./routes";
import { NavBar, SideBar } from "./components";

const App = () => {
    return (
        <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
            <ToastContainer
                theme="dark"
                position="top-center"
                toastStyle={{
                    fontFamily: "Epilogue",
                    border: "1px solid #808191",
                    borderRadius: "10px",
                }}
            />
            <div className="sm:flex hidden mr-10 relative">
                <SideBar />
            </div>
            <div className="flex-1 max-sm:w-full max-w[1280px] mx-auto sm:pr-5">
                <NavBar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/create-campaign"
                        element={<CreateCampaign />}
                    />
                    <Route
                        path="/campaign-details/:id"
                        element={<CampaignDetails />}
                    />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
