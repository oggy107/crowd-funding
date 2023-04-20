import { InputHTMLAttributes, ChangeEventHandler } from "react";

interface FormFieldProps {
    lableName: string;
    inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
    placeholder?: string;
    isTextArea?: boolean;
    value: string;
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const FormField = ({
    lableName,
    inputType,
    placeholder,
    isTextArea,
    value,
    handleChange,
}: FormFieldProps) => {
    return (
        <label className="flex flex-col flex-1 w-full">
            {lableName && (
                <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                    {lableName}
                </span>
            )}
            {isTextArea ? (
                <textarea
                    required
                    rows={10}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="py-4 sm:px-[25px] sm:min-w-[300px] px-[15px] outline-none border border-[#3a3a43] font-epilogue bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]"
                />
            ) : (
                <input
                    required
                    type={inputType}
                    step="0.1"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={`py-4 sm:px-[25px] sm:min-w-[300px] px-[15px] outline-none border border-[#3a3a43] font-epilogue bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] ${
                        inputType === "date" &&
                        "invalid:text-[14px] invalid:font-medium invalid:leading-[22px] invalid:text-opacity-[0.35] invalid:text-[#808190] invalid:mb-[10px]"
                    }`}
                />
            )}
        </label>
    );
};

export default FormField;
