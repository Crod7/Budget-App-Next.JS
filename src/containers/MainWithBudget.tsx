import AddPurchase from "../components/AddPurchase";
import PurchaseHistory from "../components/PurchaseHistory";

// Color Mode Imports
import { useColorMode } from '@chakra-ui/react';



const MainWithBudget: React.FC = () => {

    // Color Mode
    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode

    return (
        <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg  max-w-[800px] mx-auto`}>
            <AddPurchase />
            <PurchaseHistory />
        </div>
    )



}

export default MainWithBudget;
