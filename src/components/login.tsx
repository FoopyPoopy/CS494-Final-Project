import React, { useEffect, useState } from "react";
import { useUserContext, useCardsContext, useDeleteCardContext, useToggleFavoriteContext } from "../context/userContext";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardData } from "@/types/cardData";


const Login = () => {
    const user = useUserContext();
    const cards = useCardsContext();
    const deleteCard = useDeleteCardContext();
    const toggleFavorite = useToggleFavoriteContext();
    const [cardList, setCardList] = useState<CardData[]>([]);

    useEffect(() => {
        if (cards) {
            setCardList(cards);
        }
    }, [cards]);

    const handleDeleteCard = (index: number) => {
        if (deleteCard) {
            deleteCard(index);
        }
    };

    const handleToggleFavorite = (index: number) => {
        if (toggleFavorite) {
            toggleFavorite(index);
        }
    };

    return (
        <main>
            <div style={{ borderStyle: "solid", padding: 20, margin: 5 }}>
                <p>
                    <b>Welcome to my cool website, please click here on the profile icon and select Profile to see your profile</b>
                </p>
            </div>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    padding: 2,
                }}
            >
                {cardList.map((card, index) => (
                    <Card
                        key={index}
                        sx={{
                            minWidth: 200,
                            marginRight: 2,
                            display: 'inline-block',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '150px',
                                backgroundImage: `url(${card.charimage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1"><strong>First Name:</strong> {card.charfirstname}</Typography>
                            <Typography variant="body1"><strong>Last Name:</strong> {card.charlastname}</Typography>
                            <Typography variant="body1"><strong>Anime Link:</strong> {card.anime}</Typography>
                            <Typography variant="body1"><strong>Description:</strong> {card.description}</Typography>
                            <IconButton onClick={() => handleToggleFavorite(index)}>
                                {card.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <IconButton onClick={() => handleDeleteCard(index)} disabled={card.isFavorite}>
                                <DeleteIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </main>
    );
};

export default Login;
