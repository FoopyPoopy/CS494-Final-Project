'use client'

import React, { useEffect, useState } from "react";
import { useUserContext, useSaveUserSettingsContext, useUserSettingsContext, useCardsContext, useSaveCardContext, useDeleteCardContext } from "../../context/userContext";
import { Card, CardContent, CardActions, Button, TextField, Typography, Box, Grid, Container } from "@mui/material";

interface CardData {
    charfirstname: string,
    charlastname: string,
    charimage: string,
    anime: string,
    description: string,
    isEditing: boolean,
}

const Profile = () => {
    const user = useUserContext();
    const userSettings = useUserSettingsContext();
    const saveUserSettings = useSaveUserSettingsContext();
    const cards = useCardsContext();
    const saveCard = useSaveCardContext();
    const deleteCard = useDeleteCardContext();

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

    const handleEditCard = (index: number) => {
        const newCardList = [...cardList];
        newCardList[index].isEditing = true;
        setCardList(newCardList);
    };

    const handleDeleteCard = (index: number) => {
        if (deleteCard) {
            deleteCard(index);
        }
    };

    const handleCardChange = (index: number, field: string, value: string) => {
        const newCardList = [...cardList];
        (newCardList[index] as any)[field] = value;
        setCardList(newCardList);
    };

    const handleSaveCard = (index: number) => {
        const newCardList = [...cardList];
        newCardList[index].isEditing = false;
        setCardList(newCardList);
    };

    return (
        <>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        User Profile
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
                <Grid container spacing={2}>
                    {cardList.map((card, index) => (
                        <Grid item xs={4} key={index}>
                            <Card>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundImage: `url(${card.charimage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <CardContent>
                                    {card.isEditing ? (
                                        <div>
                                            <TextField
                                                type="text"
                                                placeholder="Character Firstname"
                                                value={card.charfirstname}
                                                onChange={(e) => handleCardChange(index, 'charfirstname', e.target.value)}
                                            />
                                            <br />
                                            <br />
                                            <TextField
                                                type="text"
                                                placeholder="Character Lastname"
                                                value={card.charlastname}
                                                onChange={(e) => handleCardChange(index, 'charlastname', e.target.value)}
                                            />
                                            <br />
                                            <br />
                                            <TextField
                                                type="text"
                                                placeholder="Character Image"
                                                value={card.charimage}
                                                onChange={(e) => handleCardChange(index, 'charimage', e.target.value)}
                                            />
                                            <br />
                                            <br />
                                            <TextField
                                                type="text"
                                                placeholder="Anime Link"
                                                value={card.anime}
                                                onChange={(e) => handleCardChange(index, 'anime', e.target.value)}
                                            />
                                            <br />
                                            <br />
                                            <TextField
                                                type="text"
                                                placeholder="Description"
                                                value={card.description}
                                                onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                                            />
                                            <br />
                                            <br />
                                            <Button onClick={() => handleSaveCard(index)}>Save Card</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography variant="body1"><strong>First Name:</strong> {card.charfirstname}</Typography>
                                            <Typography variant="body1"><strong>Last Name:</strong> {card.charlastname}</Typography>
                                            <Typography variant="body1"><strong>Anime Link:</strong> {card.anime}</Typography>
                                            <Typography variant="body1"><strong>Description:</strong> {card.description}</Typography>
                                        </div>
                                    )}
                                </CardContent>
                                <CardActions>
                                    {!card.isEditing && (
                                        <Button onClick={() => handleEditCard(index)}>Edit</Button>
                                    )}
                                    <Button onClick={() => handleDeleteCard(index)}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Profile;
