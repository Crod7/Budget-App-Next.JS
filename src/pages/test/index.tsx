import React, { useState } from "react";

interface User {
    username: string;
    email: string;
}

const SomePage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);

    const createUser = async (userData: User) => {
        try {
            const response = await fetch("/api/database/users/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const errorData = await response.json();
                console.error("Error calling the API:", errorData);
            }
        } catch (error) {
            console.error("Error calling the API:", error);
        }
    };

    const handleCreateUserClick = () => {
        const userData: User = {
            username: "exampleUser",
            email: "user@example.com",
            // Add more user data properties as needed
        };
        createUser(userData);
    };

    return (
        <div>
            <button onClick={handleCreateUserClick}>Create User</button>
            {message ? <p>{message}</p> : <p>Loading...</p>}
        </div>
    );
};

export default SomePage;
