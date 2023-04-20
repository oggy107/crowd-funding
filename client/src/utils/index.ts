export const daysLeft = (deadline: number) => {
    const now = Math.floor(new Date().getTime() / 1000);

    return Math.floor((deadline - now) / (3600 * 24));
};

export const calculateBarPercentage = (
    goal: number,
    raisedAmount: number
): number => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

// TODO: convert following function into prototype

export const checkIfImage = (
    url: string,
    callback: (result: boolean) => void
): void => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};
