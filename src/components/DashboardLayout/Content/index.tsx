import { useContext, useState } from 'react'
import Icon from "../../Icon"
import DataTable from "react-data-table-component";
import { UserContext } from '../../../App';
import AddNewTagModal from '../../AddNewTagModal';

interface DataRow {
    id: number;
    title: string;
    details: string;
    status: boolean;
    tag: string;
    createdAt: string;
    expired_at: string;
}
const columns = [
    {
        name: 'Tags',
        selector: (row: DataRow) => {
            const tag = row.tag;
            if (tag) {
                return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
            }
            return '';
        },
        sortable: true,
        width: "12%",
    },
    {
        name: 'Title',
        selector: (row: DataRow) => {
            const title = row.title;
            if(title){
                return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
            }
            return '';
        },
        sortable: true,
        width: "12%",
    },
    {
        name: 'Details',
        selector: (row: DataRow) => {
            const details = row.details;
            if(details){
                return details.charAt(0).toUpperCase() + details.slice(1).toLowerCase();
            }
            return '';
        },
        sortable: true,
        width: "12%",
    },
    {
        name: 'Status',
        selector: (row: DataRow) => (row.status ? "true" : "false"),
        sortable: true,
        width: "12%",
    },
    {
        name: 'Created At',
        selector: (row: DataRow) => {
            const formattedDate = new Date(row.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).replace(/(\w{3}) (\d{2}), (\d{4})/, "$2 $1, $3");

            const formattedTime = new Date(row.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });

            return `${formattedDate}, ${formattedTime}`;
        },
        sortable: true,
        width: "25%",
    },
    {
        name: 'Expired At',
        selector: (row: DataRow) => {
            const formattedDate = new Date(row.expired_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).replace(/(\w{3}) (\d{2}), (\d{4})/, "$2 $1, $3");

            const formattedTime = new Date(row.expired_at).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });

            return `${formattedDate}, ${formattedTime}`;
        },
        sortable: true,
        width: "25%",
    },
];

export const Content: React.FC = () => {
    // const { renderTagData, setRenderTagData} = useContext(UserContext);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const { mainData, visibleAddBtn } = useContext(UserContext);
    const typedMainData: DataRow[] = mainData;
    const customDataTableStyles = {
        rows: {
            style: {
                minHeight: "40px",
                fontFamily: 'Inter',
            },
        },
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: 700,
                backgroundColor:"light-blue"
            },
        },
        cells: {
            style: {
                paddingRight: "0px",
                fontSize: "14px",
            },
        },
        TableCol: {
            style: {
                background: "black",
            },
        },
    };
    return (
        <div className='overflow-y-auto scroll-smooth scrollbar-none'>
            <div className="flex justify-between">
                <span>Tags</span>
                {
                    visibleAddBtn ?  <div className="left-0 right-0" onClick={() => setVisibleModal(true)}>
                    <div className="btn-blue w-full cursor-pointer px-3 py-0" >
                        <Icon name="plus" />
                        <span>Add Tag</span>
                    </div>
                </div> : ""
                }
            </div>
            <DataTable
                columns={columns}
                data={typedMainData}
                customStyles={customDataTableStyles}
                pagination
                highlightOnHover/>
            <div>
                <AddNewTagModal
                    visible={visibleModal}
                    setVisibleModal={setVisibleModal}
                    onClose={() => setVisibleModal(false)}
                    // renderTagData={renderTagData}
                    // setRenderTagData={setRenderTagData}
                     />
            </div>
        </div>
    );
}
