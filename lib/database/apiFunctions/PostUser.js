// Takes user argument to make call to api to store user in database
// returns nothing, just saves data

async function PostUser(argumentForBody) {

    try {
        const response = await fetch("/api/database/users/PostUser", {
            method: "POST",
            body: JSON.stringify(argumentForBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Handle the response as needed
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

export default PostUser;
