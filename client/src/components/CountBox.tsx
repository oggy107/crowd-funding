interface CountBoxProps {
    title: string;
    value: string | number;
}

const CountBox = ({ title, value }: CountBoxProps) => {
    return (
        <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#1c1c24] w-full text-center truncate rounded-t-[10px]">
                {value}
            </h4>
            <p className="font-epilogue font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full text-center truncate rounded-b-[10px]">
                {title}
            </p>
        </div>
    );
};

export default CountBox;
