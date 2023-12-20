import BudgetSetup from "../components/BudgetSetup";
import Navbar from "../components/Navbar";
import UserData from "../types/UserData";


interface Props {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    setLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}


const MainWithBudget: React.FC<Props> = ({ userData, setUserData, setLoadingScreen }) => {


    return (
        <div>
            <Navbar userData={userData} setUserData={setUserData} setLoadingScreen={setLoadingScreen} />
            <BudgetSetup userData={userData} setUserData={setUserData} setLoadingScreen={setLoadingScreen} />
        </div>
    )



}

export default MainWithBudget;
