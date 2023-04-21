import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps {
    btnType: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    title: string;
    styles?: string;
    handleClick: () => void;
}

const CustomButton = ({
    btnType,
    title,
    styles,
    handleClick,
}: CustomButtonProps) => {
    return (
        <button
            type={btnType}
            className={`font-epilogue font-semibold min-h-[52px] px-4 border border-transparent rounded-[10px] text-white transition duration-500 hover:bg-transparent hover:border-[#3a3a43] ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

export default CustomButton;
