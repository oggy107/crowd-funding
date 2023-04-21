import { createContext, FC, useState } from "react";

import { NavLinkNames } from "../types";

interface NavContext {
    active: NavLinkNames | undefined;
    setActive: React.Dispatch<React.SetStateAction<NavLinkNames>> | undefined;
}

const defaultNavContext: NavContext = {
    active: undefined,
    setActive: undefined,
};

export const navContext = createContext(defaultNavContext);

interface NavProviderProps {
    children: React.ReactNode;
}

export const NavProvider: FC<NavProviderProps> = ({ children }) => {
    const [active, setActive] = useState<NavLinkNames>(NavLinkNames.DASHBOARD);

    return (
        <navContext.Provider value={{ active, setActive }}>
            {children}
        </navContext.Provider>
    );
};
