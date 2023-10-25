import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import DashboardLayout from "../../components/DashboardLayout";

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    const handleGoBack = () => {
        navigate(-1);
      };
    return (
        <DashboardLayout hideRightSidebar>
            <div className="p-20 2xl:px-10 md:pt-6 md:px-6 md:pb-10">
                <button
                    className="hidden absolute top-6 right-6 w-10 h-10 border-2 border-n-4/25 rounded-full text-0 transition-colors hover:border-transparent hover:bg-n-4/25 md:block"
                    onClick={handleGoBack}>
                    <Icon className="fill-n-4" name="close" />
                </button>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
