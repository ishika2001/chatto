import Layout from "../../components/Layout";
import Faq from "./Faq";
import Main from "./Main";

const PricingPage = () => {
    return (
        <Layout collapsedSidebar hideRightSidebar>
            <Main />
            <Faq />
        </Layout>
    );
};

export default PricingPage;
