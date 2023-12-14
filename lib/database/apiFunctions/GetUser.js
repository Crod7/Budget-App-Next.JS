// This grabs the latest user data from the database
async function GetUser(email) {
    try {
        const response = await fetch(`/api/database/users/GetUser?email=${email}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error getting user:", error);
        return;
    }
}

export default GetUser;