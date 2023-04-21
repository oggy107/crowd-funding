import { useState, FormEvent, useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { CampaignForm } from "../types";
import { web3Context } from "../context";

const CreateCampaign = () => {
    const web3 = useContext(web3Context);

    const [isLoading, setIsLoading] = useState(false);

    const defaultForm: CampaignForm = {
        deadline: "",
        description: "",
        image: "",
        name: "",
        title: "",
        target: "",
    };

    const [form, setForm] = useState<CampaignForm>(defaultForm);

    const handleChange = (key: keyof CampaignForm, value: string) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const inputDeadLine = new Date(form.deadline).getTime() / 1000;
        const currentTime = new Date().getTime() / 1000;

        if (inputDeadLine < currentTime) {
            toast.error("deadline must be a date in future");
        } else {
            checkIfImage(form.image, async (exists) => {
                if (exists) {
                    setIsLoading(true);
                    web3.publishCampaign!(form)
                        .then(() => {
                            toast.success("Campaign published");
                            setIsLoading(false);
                            setForm(defaultForm);
                        })
                        .catch((error: Error) => {
                            toast.error(error.message);
                            setIsLoading(false);
                        });
                } else {
                    toast.error("Form image is invalid");
                }
            });
        }
    };

    return (
        <div className="bg-[#1c1c24] flex items-center justify-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && <Loader />}
            <div className="flex items-center justify-center sm:min-w-[380px] bg-[#3a3a43] p-4 rounded-[10px]">
                <h1 className="font-epilogue font-bold text-white sm:text-[25px] text-[18px] leading-[38px]">
                    Start a Campaign
                </h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full mt-[65px] flex flex-col gap-[30px]"
            >
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        lableName="Your Name *"
                        placeholder="John Doe"
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => {
                            handleChange("name", e.target.value);
                        }}
                    />
                    <FormField
                        lableName="Compaign Title *"
                        placeholder="My Campaign"
                        inputType="text"
                        value={form.title}
                        handleChange={(e) => {
                            handleChange("title", e.target.value);
                        }}
                    />
                </div>
                <FormField
                    lableName="Your Story *"
                    placeholder="I am broke :("
                    value={form.description}
                    isTextArea
                    handleChange={(e) => {
                        handleChange("description", e.target.value);
                    }}
                />

                <div className="bg-sky-500 py-[30px] px-4 rounded-[10px] flex items-center gap-5">
                    <img
                        src={money}
                        alt="money"
                        className="w-[40px] h-[40px] object-contain"
                    />
                    <h1 className="font-epilogue font-bold text-[25px] text-white leading-[38px]">
                        You will get the 100% of raised amount
                    </h1>
                </div>

                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        lableName="Goal *"
                        placeholder="ETH 0.50"
                        inputType="number"
                        value={form.target}
                        handleChange={(e) => {
                            handleChange("target", e.target.value);
                        }}
                    />
                    <FormField
                        lableName="End Date *"
                        placeholder="End Date"
                        inputType="date"
                        value={form.deadline}
                        handleChange={(e) => {
                            handleChange("deadline", e.target.value);
                        }}
                    />
                </div>

                <FormField
                    lableName="Campaign Image *"
                    placeholder="image URL of your campaign"
                    inputType="text"
                    value={form.image}
                    handleChange={(e) => {
                        handleChange("image", e.target.value);
                    }}
                />

                <CustomButton
                    btnType="submit"
                    title={web3.provider ? "submit a new campaign" : "Connect"}
                    handleClick={() => {
                        if (web3.provider) handleSubmit;
                        else connect();
                    }}
                    styles="bg-[#1dc071] text-white w-fit mx-auto mt-[40px] text-[20px]"
                />
            </form>
        </div>
    );
};

export default CreateCampaign;
