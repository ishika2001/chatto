import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import '../../styles/global.css'
import DashboardSidebar from "./DashboardSidebar";
import { Navbar } from "./Navbar";
import { Content } from "./Content";

type DashboardLayoutProps = {
    collapsedSidebar?: boolean;
    hideRightSidebar?: boolean;
    backUrl?: string;
    children: React.ReactNode;
};

const DashboardLayout = ({
    collapsedSidebar,
    hideRightSidebar,
    backUrl,
    children,
}: DashboardLayoutProps) => {
    const [visibleSidebar, setVisibleSidebar] = useState<any>(
        collapsedSidebar || false
    );
    const isDesktop = useMediaQuery({
        query: "(max-width: 1179px)",
    });

    useEffect(() => {
        setVisibleSidebar(collapsedSidebar || isDesktop);
    }, [isDesktop, collapsedSidebar]);

    return (
        <>
            <div className="overflow-hidden">
                <div className="bg-white shadow-2xl h-16 ">
                    <Navbar />
                </div>
                <div className={`flex flex-row h-screen w-screen pr-6  md:p-0 md:bg-n-1 md:overflow-hidden`}>
                    <DashboardSidebar value={visibleSidebar} />
                    <div className="flex-grow overflow-y-auto scroll-smooth scrollbar-none p-6 bg-white text-black">
                        <Content />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
