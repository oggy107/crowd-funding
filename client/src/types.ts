export enum NavLinkNames {
    DASHBOARD = "Dashboard",
    CAMPAIGN = "campaign",
    PAYMENT = "payment",
    WITHDRAW = "withdraw",
    PROFILE = "profile",
    LOGOUT = "logout",
}

export interface NavLink {
    name: NavLinkNames;
    imgUrl: string;
    link: string;
    disabled: boolean;
}

export interface CampaignForm {
    name: string;
    title: string;
    description: string;
    target: string;
    deadline: string;
    image: string;
}

interface MetaMaskSingleError {
    code: number;
    standard: string;
    message: string;
}

export interface MetaMaskError {
    invalidInput: MetaMaskSingleError;
    resourceNotFound: MetaMaskSingleError;
    resourceUnavailable: MetaMaskSingleError;
    transactionRejected: MetaMaskSingleError;
    methodNotSupported: MetaMaskSingleError;
    limitExceeded: MetaMaskSingleError;
    parse: MetaMaskSingleError;
    invalidRequest: MetaMaskSingleError;
    methodNotFound: MetaMaskSingleError;
    invalidParams: MetaMaskSingleError;
    internal: MetaMaskSingleError;
    userRejectedRequest: MetaMaskSingleError;
    unauthorized: MetaMaskSingleError;
    unsupportedMethod: MetaMaskSingleError;
    disconnected: MetaMaskSingleError;
    chainDisconnected: MetaMaskSingleError;
}

export interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    image: string;
    id: number;
}

export interface Donation {
    donator: string;
    donation: string;
}
