import React from "react";
import { useUserContext, googleSignIn, logOut } from "../context/userContext";

const Login = () => {
    const user = useUserContext();
    // const [inputUser, setInputUser] = useState("");
    // const [inputPassword, setInputPassword] = useState("");

    function handleLogout() {
        logOut();
    }

    function handleGoogleLogin() {
        googleSignIn();
    }

    return (
        <div style={{ borderStyle: "solid", padding: 20, margin: 5 }}>
            <p>
                <b>Welcome to my cool website, please click here on the profile icon and select Profile to see your profile</b>
            </p>
        </div>
    );
};

export default Login;