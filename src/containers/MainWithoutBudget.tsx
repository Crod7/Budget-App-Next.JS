import BudgetSetup from "../components/BudgetSetup";
import Navbar from "../components/Navbar";
import UserData from "../types/UserData";


interface Props {
    setLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}


const MainWithBudget: React.FC<Props> = ({ setLoadingScreen }) => {


    return (
        <div>
            <Navbar setLoadingScreen={setLoadingScreen} />
            <BudgetSetup setLoadingScreen={setLoadingScreen} />
        </div>
    )



}

export default MainWithBudget;
