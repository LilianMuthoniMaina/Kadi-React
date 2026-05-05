import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screens/game/Home";
import {useState} from "react";
import Login from "./Screens/auth/Login";
import SignUp from "./Screens/auth/SignUp";

import Test from "./Screens/game/Test";
import GlobalContext from "./GlobalContext";

function App() {
    const [token, setToken] = useState(null);
    const [player, setPlayer] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                token: token,
                setToken: setToken,
                player: player,
                setPlayer: setPlayer,
            }}>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/game" element={<Home />} />
            <Route path="/game/test" element={<Test />} />
            </Routes>
            </BrowserRouter>
            </GlobalContext.Provider>
    )
}

export default App;