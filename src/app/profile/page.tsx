'use client'

import React, { useEffect, useState } from "react";
import { useUserContext, useSaveUserSettingsContext, useUserSettingsContext } from "../../context/userContext";
import { Button, TextField, Typography, Box } from "@mui/material";

const Profile = () => {
    const user = useUserContext();
    const userSettings = useUserSettingsContext();
    const saveUserSettings = useSaveUserSettingsContext();
    const [charfirstname, setCharFirstName] = useState("");
    const [charlastname, setCharLastName] = useState("");
    const [charimage, setCharImage] = useState("");
    const [anime, setAnime] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    function handleSaveUser() {
        if (saveUserSettings != null) {
            saveUserSettings(charfirstname, charlastname, charimage, anime, description);
            setIsEditing(false);
        }
    }

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCharFirstName(e.target.value);
    }
    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCharLastName(e.target.value);
    }
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCharImage(e.target.value);
    }
    function handleAnimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAnime(e.target.value);
    }
    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        if (userSettings !== undefined && userSettings != null) {
            setCharFirstName(userSettings.character_fname);
            setCharLastName(userSettings.character_lname);
            setCharImage(userSettings.character_image);
            setAnime(userSettings.character_anime);
            setDescription(userSettings.description)
        }
    }, [userSettings]);

    return (
        <div style={{ borderStyle: "solid", padding: 20, margin: 5 }}>
            <img src={user?.photoURL} alt="User profile" />
            <h3>Name: {user?.displayName}</h3>
            <h3>email: {user?.email}</h3>

            {user != null ? (
                isEditing ? (
                    <Typography>
                        <TextField
                            type="text"
                            placeholder="First name"
                            value={charfirstname}
                            onChange={handleFirstNameChange}
                        />
                        <br />
                        <br />
                        <TextField
                            type="text"
                            placeholder="Last Name"
                            value={charlastname}
                            onChange={handleLastNameChange}
                        />
                        <br />
                        <br />
                        <TextField
                            type="text"
                            placeholder="Image"
                            value={charimage}
                            onChange={handleImageChange}
                        />
                        <br />
                        <br />
                        <TextField
                            type="text"
                            placeholder="Anime Link"
                            value={anime}
                            onChange={handleAnimeChange}
                        />
                        <br />
                        <br />
                        <TextField
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <br />
                        <br />
                        <Button onClick={handleSaveUser}>Save User</Button>
                    </Typography>
                ) : (
                    <Box>
                        <Typography variant="body1"><strong>First Name:</strong> {charfirstname}</Typography>
                        <Typography variant="body1"><strong>Last Name:</strong> {charlastname}</Typography>
                        <Typography variant="body1"><strong>Image:</strong> {charimage}</Typography>
                        <Typography variant="body1"><strong>Link to Anime:</strong> {anime}</Typography>
                        <Typography variant="body1"><strong>Description:</strong> {description}</Typography>
                        <Button onClick={() => setIsEditing(true)} variant="contained" color="primary">Edit Profile</Button>
                    </Box>
                )
            ) : (
                <Typography variant="body1">User not found</Typography>
            )}
        </div>
    );
}

export default Profile;