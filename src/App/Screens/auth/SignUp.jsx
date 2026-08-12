import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import GlobalContext from "../../GlobalContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const contextValues = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if(!agreed) {
      setErrorMsg("Agree to Terms of Engagement")
      return
    }
    try {
      setErrorMsg("")
      setLoading("...  Loading")
      const res = await axios({
        url: "http://127.0.0.1:5001/auth/signup",
        method:"POST",
        data: { name, email, password },
      })
      const data = res.data
      if (data?._message) {
        setErrorMsg(data._message)
        return
      }
      navigate("/Login")
    } catch (e) {
      const res_data = e?.response?.data
      setErrorMsg(res_data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading("")
    }
  }
  return (
      <div className="bg-[#0e0e0e] min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-20">
        <div className="asolute bg-[rgba(142,255,113,0.05)] blur-[60px] right-[-20px] rounded-[12px] size-[500px] top-[-90px] pointer-events-none" />
        <div className="absolute bg-[rgba(255,112,115,0.05)] blur-[60px] bottom-[-90px] left-[20px] rounded-[-12px] size-[600px] pointer-events-none" />
        <div className="relative w-full max-w-[448px] flex flex-col gap-6">
          {/*the card */}
          <div 
           className="backdrop-blur-[10px] rounded-[16px] p-8 flex flex-col gap-8 border border-[rgba(255,255,255,0.05)]"
           style={{ backgroundImage: "linear-gradient(135deg, rgba(32,31,31,0.6) 0%, rgba(26,25,25,0.8) 100%" }}>

            {/* thee header */}
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-white text-[30px] leading-[36px]">Create Identity</h1>
              <p className="text-[#adaaaa] text-sm">
                Initialize your player profile to join the high-stakes circuit.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                  Player Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg width="20" height="20" viewbox="0 0 20 20" fill="none">
                    <circle cx="10" cy="6.5" r="3.5" stroke="#ADAAAA" strokewidth="1.5" />
                    <path d="M3 17c0-3.3 3.13-6 7-6s7 2.7 7 6" stroke="#ADAAAA" strokeWidth="1.15" strokeLinecap="round" />
                    </svg></div>
                    <input
                      required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your alias"
                  className="w-full bg-black border border-[rgba(73,72,71,0.3)] rounded-[8px] pl-12 pr-4 py-[18px] text-white text-[16px] placeholder:text-[#6b7280] outline-none"
                />
                </div>
              </div>
              {/*Email section*/}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                  E-mail address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translation-y-1/2 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 5.833A1.667 1.667 0 014.167 4.167h11.666A1.667 1.667 0 0117.5 5.833v8.334a1.667 1.667 0 01-1.667 1.666H4.167A1.667 1.667 0 012.5 14.167V5.833z" stroke="#ADAAAA" strokeWidth="1.5" />
                      <path d="M2.5 5.833L10 10.833l7.5-5" stroke="#ADAAAA" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-black border border-[rgba(73,72,71,0.3)] rounded-[8px] pl-12 pr-4 py-[18px] text-white text-[16px] placeholder:text-[#6b7280] outline-none"
                />
                </div>
              </div>
              {/* thee password */}
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="16" height="21" viewBox="0 0 16 21" fill="none">
                    <path d="M11 9V6.5a3 3 0 00-6 0V9M3 9h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8a1 1 0 011-1z" stroke="#ADAAAA" strokeWidth="1.5" />
                  </svg>
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black border border-[rgba(73,72,71,0.3)] rounded-[8px] pl-12 pr-4 py-[18px] text-white text-[16px] placeholder:text-[#6b7280] outline-none"/>
              </div>
              </div>

              {/*the Terms area checkbox*/}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 size-4 rounded-[2px bg-[#262626] border border-[rgba(73,72,71,0.5)] accent-[#8eff71]" />
                <p className="text-[@adaaaa] text-[11px] leading-[15px]">
                  I agree to the <span className="text-[#8eff71]">Terms of Engagement</span> and
                  acknowledge the high-stakes risk protocols.
                </p>
              </div>
              {errorMsg && <p className="text-[#ff7073] text-xs">{errorMsg}</p>}

              <button
              onClick={handleSubmit}
              disabled={!!loading}
              className="bg-[#8eff71] text-[#064200] font-black text-sm tracking-[1.6px] uppercase w-full py-5 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? loading : "Create Account"}
            </button>
            </div>
            <div className="flex gap-1 justify-center text-sm">
              <span className="text-[#adaaaa]">Already identified?</span>
              <button onClick={() => navigate('/Login')} className="font-bold text-[#8eff71]">
                Login to Hub
              </button>
             </div>
            </div>

          {/*footer */}
          <div className="flex items-center justify-between px-2">
            <span className="text-[9px] text-[rgba(173,170,170,0.4)] tracking-[3.6px] uppercase">
              SECURITY ENCRYPTED
            </span>
            <div className="flex gap-1">
              <div className="size-1 rounded-full bg-[rgba(142,255,113,0.4)" />
              <div className="size-1 rounded-full bg-[rgba(142, 255,133,0.2" />
              <div className="size-1 rounded-full bg-[rgba(142,255,113,0.1)]" />
            </div>
            <span className="text-[9px] text-[rgba(173,170,170,0.4)] tracking-[3.6px] uppercase">
              V.2.0.4.KADI
            </span>

          </div>
      </div>
        
    </div>
    )
  }
  
  export default SignUp;