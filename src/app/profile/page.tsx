'use client'

import React, { useEffect, useState } from "react";
import { useUserContext, useSaveUserSettingsContext, useUserSettingsContext, useCardsContext, useSaveCardContext, useDeleteCardContext } from "../../context/userContext";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import CardGeneration, { CardData } from "@/components/cardGeneration";


const Profile = () => {
    const user = useUserContext();
    const userSettings = useUserSettingsContext();
    const saveUserSettings = useSaveUserSettingsContext();
    const cards = useCardsContext();
    const saveCard = useSaveCardContext();

    const [charfirstname, setCharFirstName] = useState("");
    const [charlastname, setCharLastName] = useState("");
    const [charimage, setCharImage] = useState("");
    const [anime, setAnime] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [cardList, setCardList] = useState<CardData[]>([]);

    useEffect(() => {
        if (userSettings) {
            setCharFirstName(userSettings.character_fname);
            setCharLastName(userSettings.character_lname);
            setCharImage(userSettings.character_image);
            setAnime(userSettings.character_anime);
            setDescription(userSettings.description);
        }
    }, [userSettings]);

    useEffect(() => {
        if (cards) {
            setCardList(cards);
        }
    }, [cards]);

    const handleSaveUser = () => {
        if (saveUserSettings != null) {
            const newCard: CardData = {
                charfirstname,
                charlastname,
                charimage,
                anime,
                description,
                isEditing: false,
            };

            const isDuplicate = cardList.some(card =>
                card.charfirstname === newCard.charfirstname &&
                card.charlastname === newCard.charlastname &&
                card.charimage === newCard.charimage &&
                card.anime === newCard.anime &&
                card.description === newCard.description
            );

            if (!isDuplicate && saveCard) {
                saveCard(newCard);
            }

            saveUserSettings(charfirstname, charlastname, charimage, anime, description);
            setIsEditing(false);
            resetFields();
        }
    };

    const resetFields = () => {
        setCharFirstName("");
        setCharLastName("");
        setCharImage("");
        setAnime("");
        setDescription("");
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharFirstName(e.target.value);
    };
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharLastName(e.target.value);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharImage(e.target.value);
    };
    const handleAnimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnime(e.target.value);
    };
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    return (
        <>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Character Profile
                    </Typography>
                    <TextField
                        type="text"
                        placeholder="Character Firstname"
                        value={charfirstname}
                        onChange={handleFirstNameChange}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Character Lastname"
                        value={charlastname}
                        onChange={handleLastNameChange}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Character Image"
                        value={charimage}
                        onChange={handleImageChange}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Anime Link"
                        value={anime}
                        onChange={handleAnimeChange}
                    />
                    <br />
                    <TextField
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <br />
                    <Button onClick={handleSaveUser}>Save User</Button>
                </Box>
                <CardGeneration />
            </Container>
        </>
    );
}

export default Profile;
