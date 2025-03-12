import NavigationNew from "@/components/common/navigationNew";
import logonb from "../../public/images/logo-nt.png";

const NewHome = () => {
    return (
        <>
            <NavigationNew />
            <div className="flex flex-col gap-4 min-h-screen">
                <div>
                    Hero Section
                </div>
                <div>
                    Two cards
                </div>
            </div>
        </>
    );
};

export default NewHome;

/*
bg - gray - 900
text - gray-30
lighter text - gray-400
*/