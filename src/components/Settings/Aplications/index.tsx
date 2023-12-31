import Application from "./Application";
import { applications } from "../../../constants/applications";
import { Link } from "react-router-dom";

const Applications = () => (
    <>
        <div className="flex items-center mb-8">
            <div className="mr-auto h4">Applications</div>
            <Link className="btn-blue" to="/applications">
                Add apps
            </Link>
        </div>
        <div className="py-3 base2 text-n-4">Authorized apps</div>
        <div className="mb-6">
            {applications
                .filter((x: any) => x.installed === true)
                .map((application) => (
                    <Application item={application} key={application.id} />
                ))}
        </div>
    </>
);

export default Applications;
