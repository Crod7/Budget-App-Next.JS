import React, { useState } from 'react';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode
import UserData from '@/src/types/UserData';
import UpdatedUser from '@/lib/database/apiFunctions/UpdateUser';
import { generateDateId } from '@/lib/functions/GenerateDateId'


interface BudgetOverviewProps {
    userData: UserData | null;
    setLoadingScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ userData, setLoadingScreen }) => {


    const { colorMode } = useColorMode(); // Get the current color mode from useColorMode
    const isDarkMode = colorMode === 'dark'; // Check if it's dark mode

    // calculates user's budget from monthly expenses
    const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
    const [currentTotal, setCurrentTotal] = useState<number>(
        userData
            ? userData.budget.income -
            userData.budget.housing -
            userData.budget.utilities -
            userData.budget.debt -
            userData.budget.car -
            userData.budget.phone -
            userData.budget.internet -
            userData.budget.subscriptions -
            userData.budget.insurance -
            userData.budget.childCare -
            userData.budget.internet
            : 0
    );

    // We generate a dateId when the page loads to avoid having a specific issue when a user attempts to make a purchase seconds before the begining of the next month(11:59pm).
    // This way the ID will remain consistent for the purchase being added.
    const dateId = generateDateId();

    const handleAddPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingScreen(true)

        // Ensure purchaseAmount is a valid integer
        const purchaseValue = parseInt(purchaseAmount.toString(), 10); if (isNaN(purchaseValue)) {
            alert('Please enter a valid integer for the purchase amount.');
            return;
        }

        // Update currentTotal by subtracting the purchaseAmount
        setCurrentTotal((prevTotal) => prevTotal - purchaseValue);

        // The purchase gets recorded in the user's purchase history
        const purchaseData = {
            purchaseAmount: purchaseAmount,
            purchaseDate: dateId
        };
        const updatedUser = {
            ...userData,
            purchaseHistory: [...(userData?.purchaseHistory || []), purchaseData],
        };
        try {
            await UpdatedUser(updatedUser)
        } catch (error) {
            console.error("UpdateUser Failed: oh no.... our table.... it's broken. Inside BudgetOverview.tsx", error)
        }
        setLoadingScreen(false)
        setPurchaseAmount(0);

    };


    if (userData) {
        return (
            <div className={`${isDarkMode ? 'dark darkModeShadow' : 'light lightModeShadow'} my-16 py-4 px-12 rounded-lg min-w-[800px] max-w-[80vw] mx-auto`}>
                <div  >
                    {currentTotal}
                </div>
                <div>
                    Add a purchase:
                    <form onSubmit={handleAddPurchase}>
                        <input
                            type="number"
                            value={purchaseAmount}
                            onChange={(e) => setPurchaseAmount(parseInt(e.target.value, 10) || 0)}
                        />
                        <button type="submit">Add Purchase</button>
                    </form>
                </div>
            </div>
        );
    }

};

export default BudgetOverview;
