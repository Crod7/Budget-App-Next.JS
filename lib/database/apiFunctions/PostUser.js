async function PostUser(argumentForBody) {

    try {
        const response = await fetch("/api/database/users/PostUser", {
            method: "POST",
            body: JSON.stringify(argumentForBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error creating user:", error);
    }
};

export default PostUser;
