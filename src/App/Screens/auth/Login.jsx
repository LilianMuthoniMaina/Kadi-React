import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("")


    const contextValues = useContext(GlobalContext);
    const navigate = useNavigate()

    console.log(contextValues);

    const handleSubmit = async() => {
        try {
            setLoading("....  Loading");
            const res = await axios({
                url:"http://127.0.0.1:5001/auth/login",
                method: "POST",
                data:{
                    password,
                    email,
                },
            });
            const data = res.data;
            const player = data.player;
            const token = data.token;

            console.log("player", player);
            console.log("token", token);

            contextValues.setPlayer(player);
            contextValues.setToken(token);

            navigate("/game");
        
        }   catch (e) {
            console.log(e);
            const status_code = e?.response?.status;
            const res_data = e?.response?.data;

        //console.log("Status code is", status_code);
        //console.log("Res data is", res_data);

            if (res_data?._message){
                alert(`Error Login in ${res_data._message}`);
            }
    }       finally {
            setLoading("");}
    }
    return (
        <div>
            <h1> Login page</h1>
        <div>
            <p>
                <label>Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e => setEmail(e.target.value))}
                  />
        </p>
        <p>
            <label> Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
        </p>
        <p>
            <button onClick={handleSubmit}>Submit</button>

        </p>
        </div>
        <h4></h4>
        </div>
    )
}
export default Login;