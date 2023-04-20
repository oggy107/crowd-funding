import {
    createCampaign,
    dashboard,
    logout,
    payment,
    profile,
    withdraw,
} from "../assets";
import { NavLinkNames, NavLink, MetaMaskError } from "../types";

export const navlinks: Array<NavLink> = [
    {
        name: NavLinkNames.DASHBOARD,
        imgUrl: dashboard,
        link: "/",
        disabled: false,
    },
    {
        name: NavLinkNames.CAMPAIGN,
        imgUrl: createCampaign,
        link: "/create-campaign",
        disabled: false,
    },
    // {
    //     name: NavLinkNames.PAYMENT,
    //     imgUrl: payment,
    //     link: "/",
    //     disabled: true,
    // },
    // {
    //     name: NavLinkNames.WITHDRAW,
    //     imgUrl: withdraw,
    //     link: "/",
    //     disabled: true,
    // },
    {
        name: NavLinkNames.PROFILE,
        imgUrl: profile,
        link: "/profile",
        disabled: false,
    },
    // {
    //     name: NavLinkNames.LOGOUT,
    //     imgUrl: logout,
    //     link: "/",
    //     disabled: true,
    // },
];

export const metaMaskError: MetaMaskError = {
    invalidInput: {
        code: -32000,
        standard: "EIP-1474",
        message: "Invalid input.",
    },
    resourceNotFound: {
        code: -32001,
        standard: "EIP-1474",
        message: "Resource not found.",
    },
    resourceUnavailable: {
        code: -32002,
        standard: "EIP-1474",
        message: "Resource unavailable.",
    },
    transactionRejected: {
        code: -32003,
        standard: "EIP-1474",
        message: "Transaction rejected.",
    },
    methodNotSupported: {
        code: -32004,
        standard: "EIP-1474",
        message: "Method not supported.",
    },
    limitExceeded: {
        code: -32005,
        standard: "EIP-1474",
        message: "Request limit exceeded.",
    },
    parse: {
        code: -32700,
        standard: "JSON RPC 2.0",
        message:
            "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
    },
    invalidRequest: {
        code: -32600,
        standard: "JSON RPC 2.0",
        message: "The JSON sent is not a valid Request object.",
    },
    methodNotFound: {
        code: -32601,
        standard: "JSON RPC 2.0",
        message: "The method does not exist / is not available.",
    },
    invalidParams: {
        code: -32602,
        standard: "JSON RPC 2.0",
        message: "Invalid method parameter(s).",
    },
    internal: {
        code: -32603,
        standard: "JSON RPC 2.0",
        message: "Internal JSON-RPC error.",
    },
    userRejectedRequest: {
        code: 4001,
        standard: "EIP-1193",
        message: "User rejected the request.",
    },
    unauthorized: {
        code: 4100,
        standard: "EIP-1193",
        message:
            "The requested account and/or method has not been authorized by the user.",
    },
    unsupportedMethod: {
        code: 4200,
        standard: "EIP-1193",
        message:
            "The requested method is not supported by this Ethereum provider.",
    },
    disconnected: {
        code: 4900,
        standard: "EIP-1193",
        message: "The provider is disconnected from all chains.",
    },
    chainDisconnected: {
        code: 4901,
        standard: "EIP-1193",
        message: "The provider is disconnected from the specified chain.",
    },
};
