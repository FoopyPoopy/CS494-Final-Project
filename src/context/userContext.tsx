'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth, db } from "../../private/firebase"
import { signOut, signInWithPopup, GoogleAuthProvider, User, } from "firebase/auth";
import { getDoc, setDoc, doc, getDocs, query, collection, deleteDoc } from "firebase/firestore";

//Establing user settings type
//UserSettings.id == User.uid
type UserSettings = {
    id: string,
    character_fname: string,
    character_lname: string,
    character_image: string,
    character_anime: string,
    description: string,
}

type CardData = {
    charfirstname: string,
    charlastname: string,
    charimage: string,
    anime: string,
    description: string,
    isEditing: boolean,
}

type AuthUser = User | null;

const UserContext = createContext<{ user: AuthUser; userSettings: UserSettings | null; saveUserSettings: Function; cards: CardData[]; saveCard: Function; deleteCard: Function } | undefined>(undefined);

//provider component to wrap around <main> in page.tsx
export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser>(null);
    const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
    const [cards, setCards] = useState<CardData[]>([]);

    useEffect(() => {
        if (user) {
            fetchUserCards(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (userSettings) {
            writeUserSettings(userSettings);
        }
    }, [userSettings]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => findUser(user));
        return unsubscribe;
    }, []);

    async function findUser(user: User | null) {
        setUser(user);

        if (user !== null) {
            setUserSettings(await findUserSettings(user.uid));
            fetchUserCards(user.uid);
        } else {
            setUserSettings(null);
        }
    }

    async function fetchUserCards(userId: string) {
        const q = query(collection(db, "users", userId, "cards"));
        const querySnapshot = await getDocs(q);
        const userCards: CardData[] = [];
        querySnapshot.forEach((doc) => {
            userCards.push(doc.data() as CardData);
        });
        setCards(userCards);
    }

    async function saveCard(card: CardData) {
        if (user) {
            const userDocRef = doc(collection(db, "users", user.uid, "cards"));
            await setDoc(userDocRef, card);
            setCards((prevCards) => [...prevCards, card]);
        }
    }

    async function deleteCard(cardIndex: number) {
        if (user) {
            const cardToDelete = cards[cardIndex];
            const q = query(collection(db, "users", user.uid, "cards"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                const data = doc.data();
                if (
                    data.charfirstname === cardToDelete.charfirstname &&
                    data.charlastname === cardToDelete.charlastname &&
                    data.charimage === cardToDelete.charimage &&
                    data.anime === cardToDelete.anime &&
                    data.description === cardToDelete.description
                ) {
                    await deleteDoc(doc.ref);
                }
            });
            setCards((prevCards) => prevCards.filter((_, index) => index !== cardIndex));
        }
    }

    function saveUserSettings(character_fname: string, character_lname: string, character_image: string, character_anime: string, description: string) {
        if (user != null) {
            const newSettings: UserSettings = {
                id: user.uid,
                character_fname: character_fname,
                character_lname: character_lname,
                character_image: character_image,
                character_anime: character_anime,
                description: description,
            };
            setUserSettings(newSettings);
        }
    }

    return (
        <UserContext.Provider value={{ user, userSettings, saveUserSettings, cards, saveCard, deleteCard }}>
            {children}
        </UserContext.Provider>
    );
}

async function findUserSettings(uid: string) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return { id: docSnap.id, character_fname: data.character_fname, character_lname: data.character_lname, character_image: data.character_image, character_anime: data.character_anime, description: data.description }
    } else {
        return null;
    }
}

function writeUserSettings(userSettings: UserSettings | null | undefined) {
    if (userSettings != null) {
        setDoc(doc(db, "users", userSettings.id), {
            character_fname: userSettings.character_fname,
            character_lname: userSettings.character_lname,
            character_image: userSettings.character_image,
            character_anime: userSettings.character_anime,
            description: userSettings.description,
        });
    }
}

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
}

export const logOut = () => {
    signOut(auth);
}

export function useUserContext() {
    const context = useContext(UserContext);
    return context?.user;
}

export function useUserSettingsContext() {
    const context = useContext(UserContext);
    return context?.userSettings;
}

export function useSaveUserSettingsContext() {
    const context = useContext(UserContext);
    return context?.saveUserSettings;
}

export function useCardsContext() {
    const context = useContext(UserContext);
    return context?.cards;
}

export function useSaveCardContext() {
    const context = useContext(UserContext);
    return context?.saveCard;
}

export function useDeleteCardContext() {
    const context = useContext(UserContext);
    return context?.deleteCard;
}
