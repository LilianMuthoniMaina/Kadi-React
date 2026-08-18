import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screens/game/Home";
import {useState} from "react";
import Login from "./Screens/auth/Login";
import SignUp from "./Screens/auth/SignUp";
import ForgotPassword from "./Screens/auth/ForgotPassword"

import Test from "./Screens/game/Test";
import GlobalContext from "./GlobalContext";
import PokerGame from "./Screens/game/PokerGame";

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
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/game" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/game/test" element={<Test />} />
            <Route path="/game/play" element={<PokerGame />} />
            </Routes>
            </BrowserRouter>
            </GlobalContext.Provider>
    )
}

export default App;