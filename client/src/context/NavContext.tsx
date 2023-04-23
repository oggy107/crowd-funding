import { createContext, FC, useState } from "react";

import { NavLinkNames } from "../types";

interface NavContext {
    active: NavLinkNames | undefined;
    setActive: React.Dispatch<React.SetStateAction<NavLinkNames>> | undefined;
    search: string | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const defaultNavContext: NavContext = {
    active: undefined,
    setActive: undefined,
    search: undefined,
    setSearch: undefined,
};

export const navContext = createContext(defaultNavContext);

interface NavProviderProps {
    children: React.ReactNode;
}

export const NavProvider: FC<NavProviderProps> = ({ children }) => {
    const [active, setActive] = useState<NavLinkNames>(NavLinkNames.DASHBOARD);
    const [search, setSearch] = useState<string>("");

    return (
        <navContext.Provider value={{ active, setActive, search, setSearch }}>
            {children}
        </navContext.Provider>
    );
};
