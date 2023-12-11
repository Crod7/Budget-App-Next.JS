// Takes user object, uses its email to identify, sends user data with updated data to replace existing data

async function UpdateUser(user) {
    try {
        const response = await fetch(`/api/database/users/UpdateUser?email=${user.email}`, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

    } catch (error) {
        console.error("Error checking user existence:", error);
    }
}

export default UpdateUser;