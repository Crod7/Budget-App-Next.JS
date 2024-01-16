import BudgetSetup from "../components/BudgetSetup";

// Color Mode Imports
import { useColorMode } from '@chakra-ui/react';




const MainWithBudget: React.FC = () => {

    // Color Mode
    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode

    return (
        <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-2 py-4 px-12 rounded-lg  max-w-[800px] mx-auto`}>
            <BudgetSetup />
        </div>
    )



}

export default MainWithBudget;
