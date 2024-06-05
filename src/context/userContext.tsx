'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth, db } from "../../private/firebase"
import { signOut, signInWithPopup, GoogleAuthProvider, User, } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";

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

type AuthUser = User | null;

const UserContext = createContext<{ user: AuthUser; userSettings: UserSettings | null; saveUserSettings: Function } | undefined>(undefined);

//provider component to wrap around <main> in page.tsx
export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser>(null);
    const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

    function saveUserSettings(character_fname: string, character_lname: string, character_image: string, character_anime: string, description: string,) {
        console.log(user);
        console.log(userSettings);

        if (user != null) {
            setUserSettings({
                id: user.uid,
                character_fname: character_fname,
                character_lname: character_lname,
                character_image: character_image,
                character_anime: character_anime,
                description: description,


            });
            console.log(`User settings from saveUserSettings ${userSettings}`);
        }
    }

    useEffect(() => {
        writeUserSettings(userSettings);
    }, [userSettings])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => findUser(user));
        return unsubscribe;
    }, []);

    async function findUser(user: User | null) {
        setUser(user);

        if (user !== null) {
            setUserSettings(await findUserSettings(user.uid));
        } else {
            setUserSettings(null);
        }
    }



    return (
        <UserContext.Provider value={{ user, userSettings, saveUserSettings }}>
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
        console.log(`This is failing ${userSettings}`);
        setDoc(doc(db, "users", userSettings.id), {
            character_fname: userSettings.character_fname,
            character_lname: userSettings.character_lname,
            character_image: userSettings.character_image,
            character_anime: userSettings.character_anime,
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