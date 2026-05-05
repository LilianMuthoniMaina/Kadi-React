import { useContext } from "react";
import GlobalContext from "../../GlobalContext";

function Home() {
    const {player} = useContext(GlobalContext);
    return (
        <div>
            <h1>Home Page</h1>
            <h1>Welcome player {player?.name}</h1>
        </div>
    )
}

export default Home;