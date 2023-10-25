import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import { useMediaQuery } from "react-responsive";
import LeftSidebar from "../LeftSideBar";
import Icon from "../Icon";
import Burger from "./Burger";
import RightSidebar from "../RightSideBar";
import '../../styles/global.css'
import { Link } from "react-router-dom";

type LayoutProps = {
    collapsedSidebar?: boolean;
    hideRightSidebar?: boolean;
    backUrl?: string;
    children: React.ReactNode;
};

const Layout = ({
    collapsedSidebar,
    hideRightSidebar,
    backUrl,
    children,
}: LayoutProps) => {
    const [visibleSidebar, setVisibleSidebar] = useState<any>(
        collapsedSidebar || false
    );
    const [visibleRightSidebar, setVisibleRightSidebar] =
        useState<boolean>(true);

    const isDesktop = useMediaQuery({
        query: "(max-width: 1179px)",
    });

    const handleClickOverlay = () => {
        setVisibleSidebar(true);
        setVisibleRightSidebar(false);
        clearQueueScrollLocks();
        enablePageScroll();
    };

    useEffect(() => {
        setVisibleSidebar(collapsedSidebar || isDesktop);
    }, [isDesktop, collapsedSidebar]);

    return (
        <>
            <div>
                <title>Brainwave</title>
            </div>
            <div
                className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${visibleSidebar
                    ? "pl-24 md:pl-0"
                    : collapsedSidebar
                        ? "pl-24 md:pl-0"
                        : "pl-80 xl:pl-24 md:pl-0"
                    }`}
            >
                <LeftSidebar
                    value={visibleSidebar}
                    setValue={setVisibleSidebar}
                    visibleRightSidebar={visibleRightSidebar}
                    collapsedSidebar={collapsedSidebar}
                />
                <div
                    className={`flex py-6 md:py-0 ${hideRightSidebar
                        ? "min-h-screen min-h-screen-ios"
                        : "h-screen h-screen-ios"
                        }`}
                >
                    <div
                        className={`relative flex grow max-w-full bg-n-1 rounded-[1.25rem] md:rounded-none dark:bg-n-6 ${!hideRightSidebar &&
                            "pr-[22.5rem] 2xl:pr-80 lg:pr-0"
                            }`}
                    >
                        <div
                            className={`relative flex flex-col grow max-w-full ${!hideRightSidebar && "md:pt-18"
                                }`}
                        >
                            {!hideRightSidebar && (
                                <Burger
                                    className={`
                                ${!visibleSidebar && "md:hidden"}
                            `}
                                    visibleRightSidebar={visibleRightSidebar}
                                    onClick={() =>
                                        setVisibleRightSidebar(
                                            !visibleRightSidebar
                                        )
                                    }
                                />
                            )}
                            {hideRightSidebar && collapsedSidebar && (
                                <Link
                                    className="absolute top-6 right-6 flex justify-center items-center w-10 h-10 border-2 border-n-4/25 rounded-full text-0 transition-colors hover:border-transparent hover:bg-n-4/25"
                                    to={backUrl || "/"}
                                >
                                    <Icon className="fill-n-4" name="close" />
                                </Link>
                            )}
                            {children}
                        </div>
                        {!hideRightSidebar && (
                            <RightSidebar
                                className={`
                                ${!visibleSidebar &&
                                    "md:translate-x-64 md:before:absolute md:before:z-30 md:before:inset-0"
                                    }
                            `}
                                visible={visibleRightSidebar}
                            />
                        )}
                    </div>
                </div>
                <div
                    className={twMerge(
                        `fixed inset-0 z-10 bg-n-7/80 invisible opacity-0 md:hidden ${(!visibleSidebar && collapsedSidebar) ||
                        (visibleRightSidebar && "invisible opacity-0")
                        }`
                    )}
                    onClick={handleClickOverlay}
                ></div>

            </div>
        </>
    );
};

export default Layout;
