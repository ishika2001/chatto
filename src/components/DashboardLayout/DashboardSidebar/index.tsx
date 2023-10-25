import { itemList } from "../../../constants/itemList";
import { Logo } from "../../Logo";
import ItemList from "./ItemList";

type LeftSidebarProps = {
    value: boolean;
    setValue?: any;
    collapsedSidebar?: boolean;
    visibleRightSidebar?: boolean;
};
const DashboardSidebar = ({
    value,
}: LeftSidebarProps) => {
    return (
        <div className="w-64 pb-58 bg-white">
            <div
                className={`right-0 left-0 flex items-baseline h-30 pl-7 pr-6 ${value ? "justify-center md:px-4" : "justify-between"
                    }`}>
                {!value && <Logo dark/>}
            </div>
            <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
                <ItemList visible={value} items={itemList} />
            </div>
        </div>
    )
}
export default DashboardSidebar;
