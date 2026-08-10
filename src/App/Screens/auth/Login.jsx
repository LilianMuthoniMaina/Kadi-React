import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    const contextValues = useContext(GlobalContext);
    const navigate = useNavigate()

    /*console.log(contextValues);*/

    const handleSubmit = async() => {
        try {
            setErrorMsg("");
            setLoading("....  Loading");
            const res = await axios({
                url:"http://127.0.0.1:5001/auth/login",
                method: "POST",
                data:{ password,email },
            });
            const data = res.data;
            const player = data.player;
            const token = data.token;

            /*console.log("player", player);
            console.log("token", token);*/

            

            navigate("/game");
        
            }  catch (e) {
            /*console.log(e);*/
            const status_code = e?.response?.status;
            /*const res_data = e?.response?.data;*/

        //console.log("Status code is", status_code);
        //console.log("Res data is", res_data);

            if (res_data?._message){
                alert(`Error Login in ${res_data._message}`);
            } else {
                alert("Something went wrong. Please try again")
            }
    }       finally {
            setLoading("");}
    }
    return (
        <div className="bg-[#0e0e0e] min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-20">
      {/* ambient glows */}
      <div className="absolute bg-[rgba(142,255,113,0.05)] blur-[60px] right-[-39px] rounded-[12px] size-[600px] top-[-88px] pointer-events-none" />
      <div className="absolute bg-[rgba(233,0,54,0.05)] blur-[60px] bottom-[-88px] left-[-39px] rounded-[12px] size-[600px] pointer-events-none" />

      <div className="relative w-full max-w-[448px] flex flex-col gap-12">
        {/* Header */}
        <div className="relative pl-5 flex flex-col gap-2">
          <div className="absolute left-0 top-0 w-1 h-12 bg-[#8eff71] rounded-sm" />
          <p className="font-bold text-[#8eff71] text-[10px] tracking-[3px] uppercase">
            TERMINAL ACCESS v.4.02
          </p>
          <h1 className="font-black text-white text-[48px] leading-[58px]">
            Identify
            <br />
            <span className="text-[#8eff71]">Yourself</span>
          </h1>
        </div>

        {/*Login part*/}
        <div className="backdrop-blur-[10px] bg-[rgba(26,25,25,0.6)] border border-[rgba(73,72,71,0.1)] rounded-[8px] p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-2">
            <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                Encrypted ID(Email)
            </label>
            <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="KADI_PLAYER@MATRIX.NET"
                  className="w-full bg-black border border-[rgba(73,72,71,0.2)] rounded-[6px] px-4 py-[18px] text-white text-sm tracking-[0.7px] placeholder:text-[rgba(173,170,170,0.3)] outline-none"
            />
            </div>
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase"> Cipher Protocol(Password)</label>
                <button type="button" className="text-[9px] text-[rgba(142,255,113,0.6)] tracking-[0.9px] uppercase">
                    Forgot?
                </button>
            </div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black border border-[rgba(73,72,71,0.2)] rounded-[6px] px-4 py-[18px] text-sm tracking-[0.7px] placeholder:text-[rgba(173,170,170,0.3)] outline-none"
            />
        </div>
        {errorMsg && (
            <p className="text-[#ff7073] text-xs">{errorMsg}</p>
        )}

        {/*Submission*/}
        
        <button
            onClick={handleSubmit}
            disabled={!! loading}
            className="bg-[#8eff71] text-[#0d6100] font-bold text-sm tracking-[2.8px] uppercase w-full py-5 rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? loading : "Initialize Session"}
        </button>

        
        <div className="border-t border-[rgba(73,72,71,0.1)] pt-6 flex flex-col gap-4 items-center">
        <p className="text-[#adaaaa] text-[11px] tracking-[0.55px]">NEW OPERATIVE?</p>
        <button onClick={() => navigate('/signup')} className="text-white text-[18px]">
            Request Recruitment <span className="text-[#8eff71]">Join Now</span>
        </button>
        </div>
    </div>
    </div>
    </div>
        
   )
}
export default Login;