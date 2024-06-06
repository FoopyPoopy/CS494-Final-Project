'use client'

import React, { useEffect, useState } from "react";
import { useUserContext, useSaveUserSettingsContext, useUserSettingsContext } from "../../context/userContext";
import { Grid, Container, Card, CardContent, CardActions, Button, TextField, Typography, Box } from "@mui/material";

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
    const [charfirstname, setCharFirstName] = useState("");
    const [charlastname, setCharLastName] = useState("");
    const [charimage, setCharImage] = useState("");
    const [anime, setAnime] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [cards, setCards] = useState<CardData[]>([]);

    function handleSaveUser() {
        if (saveUserSettings != null) {
            const newCard: CardData = {
                charfirstname,
                charlastname,
                charimage,
                anime,
                description,
                isEditing: false,
            };

            // Check for duplicate card
            const isDuplicate = cards.some(card =>
                card.charfirstname === newCard.charfirstname &&
                card.charlastname === newCard.charlastname &&
                card.charimage === newCard.charimage &&
                card.anime === newCard.anime &&
                card.description === newCard.description
            );

            if (!isDuplicate) {
                setCards([...cards, newCard]);
            }

            saveUserSettings(charfirstname, charlastname, charimage, anime, description);
            setIsEditing(false);
            resetFields();
        }
    }

    function resetFields() {
        setCharFirstName("");
        setCharLastName("");
        setCharImage("");
        setAnime("");
        setDescription("");
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

    const handleEditCard = (index: number) => {
        const newCards = cards.map((card, i) => {
            if (i === index) {
                card.isEditing = true;
            }
            return card;
        });
        setCards(newCards);
    };

    const handleSaveCard = (index: number) => {
        const newCards = cards.map((card, i) => {
            if (i === index) {
                card.isEditing = false;
            }
            return card;
        });
        setCards(newCards);
    };

    const handleDeleteCard = (index: number) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
    };

    const handleCardChange = (index: number, field: keyof CardData, value: string) => {
        const newCards = cards.map((card, i) => {
            if (i === index) {
                return { ...card, [field]: value };
            }
            return card;
        });
        setCards(newCards);
    };

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
        <>
            <div style={{ borderStyle: "solid", padding: 20, margin: 5 }}>
                <img src={user?.photoURL ?? ""} alt="User profile" />
                <h3>Name: {user?.displayName}</h3>
                <h3>Email: {user?.email}</h3>

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

            <Container>
                <Grid container spacing={2}>
                    {cards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card style={{ marginTop: 20, height: "100%", display: 'flex', flexDirection: 'column' }}>
                                {card.charimage && (
                                    <div style={{
                                        backgroundImage: `url(${card.charimage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '50%',
                                    }} />
                                )}
                                <CardContent style={{ height: '50%', overflow: 'auto' }}>
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