import { Card, CardContent, CardActions, Button, TextField, Typography, Grid, } from "@mui/material";
import React, { useState } from "react";
import { useDeleteCardContext } from "../context/userContext";

export interface CardData {
    charfirstname: string,
    charlastname: string,
    charimage: string,
    anime: string,
    description: string,
    isEditing: boolean,
}

const CardGeneration = () => {
    const deleteCard = useDeleteCardContext();
    const [cardList, setCardList] = useState<CardData[]>([]);


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
    )
}

export default CardGeneration;