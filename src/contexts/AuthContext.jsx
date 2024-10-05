import React, { createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
    session: JSON.parse(localStorage.getItem("session")) || null,
    users: JSON.parse(localStorage.getItem("users")) || []
};

const actionTypes = {
    SET_SESSION: 'SET_SESSION',
    REMOVE_SESSION: 'REMOVE_SESSION',
    UPDATE_USERS: 'UPDATE_USERS'
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_SESSION:
            localStorage.setItem("session", JSON.stringify(action.payload));
            return { ...state, session: action.payload };
        case actionTypes.REMOVE_SESSION:
            localStorage.removeItem("session");
            return { ...state, session: null };
        case actionTypes.UPDATE_USERS:
            localStorage.setItem("users", JSON.stringify(action.payload));
            return { ...state, users: action.payload };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const savedSession = JSON.parse(localStorage.getItem("session"));
        if (savedSession) {
            dispatch({ type: actionTypes.SET_SESSION, payload: savedSession });
        }
    }, []);

    const register = (name, career, email, password) => {
        const existingUser = state.users.find(u => u.email === email);

        if (!existingUser) {
            const newUser = { name, career, email, password };
            const updatedUsers = [...state.users, newUser];
            dispatch({ type: actionTypes.UPDATE_USERS, payload: updatedUsers });
            return true;
        }
        return false;
    };

    const login = (email, password) => {
        const foundUser = state.users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const token = Math.random().toString(36).substring(2);
            const sessionData = {
                name: foundUser.name,
                career: foundUser.career,
                email: foundUser.email,
                token
            };
            dispatch({ type: actionTypes.SET_SESSION, payload: sessionData });
            return true;
        }
        return false;
    };

    const logout = () => {
        dispatch({ type: actionTypes.REMOVE_SESSION });
    };

    const updateUser = (name, career, email, password) => {
        const checkPass = state.users.find(u => u.password === password);

        if (checkPass) {
            const updatedUsers = state.users.map(u =>
                u.email === state.session.email ? { ...u, name, career, email, password } : u
            );
            dispatch({ type: actionTypes.UPDATE_USERS, payload: updatedUsers });

            const updatedSession = {
                name,
                career,
                email,
                token: state.session.token
            };
            dispatch({ type: actionTypes.SET_SESSION, payload: updatedSession });
            return true;
        }
        return false;
    };

    const recovery = (email) => {
        const foundUser = state.users.find(u => u.email === email);

        if (foundUser) {
            const pass = Math.random().toString(36).substring(2);
            foundUser.password = pass;
            const updatedUsers = state.users.map(u => u.email === email ? foundUser : u);
            dispatch({ type: actionTypes.UPDATE_USERS, payload: updatedUsers });
            return pass;
        }
        return false;
    };

    const updatePassword = (email, lastPassword, newPassword) => {
        const checkPass = state.users.find(u => u.password === lastPassword);
        const foundUser = state.users.find(u => u.email === email);

        if (checkPass) {
            if (foundUser) {
                foundUser.password = newPassword;
                const updatedUsers = state.users.map(u => u.email === email ? foundUser : u);
                dispatch({ type: actionTypes.UPDATE_USERS, payload: updatedUsers });
                return true;
            }
            return false;
        }
        return false;
    };

    return (
        <AuthContext.Provider
            value={{
                session: state.session,
                signed: !!state.session,
                login,
                register,
                logout,
                updateUser,
                updatePassword,
                recovery,
                users: state.users
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
