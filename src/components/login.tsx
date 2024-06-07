import React from "react";
import { useUserContext, googleSignIn, logOut } from "../context/userContext";
import { Box } from "@mui/material";

const Login = () => {
    const user = useUserContext();
    // const [inputUser, setInputUser] = useState("");
    // const [inputPassword, setInputPassword] = useState("");

    return (
        <main>
            <div style={{ borderStyle: "solid", padding: 20, margin: 5 }}>
                <p>
                    <b>Welcome to my cool website, please click here on the profile icon and select Profile to see your profile</b>
                </p>
            </div>
            <Box component="div" sx={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
                { }
            </Box>
        </main>
    );
};

export default Login;