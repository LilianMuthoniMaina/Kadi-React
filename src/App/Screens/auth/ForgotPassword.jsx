import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword({ onNavigate }){
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit() {
    if (!email || !newPassword || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirm) {
      setError('Cipher protocols do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Minimum 6 characters required.');
      return;
    }
    setError('');
    setDone(true);
  }
  return(
    <div className="bg-[#0e0e0e] min-h-screen w-full relative overflow-hidden flex items-center justify-center px-4 py-20">
      <div className="absolute bg-[rgba(142,255,113,0.05)] blur-[60px] right-[-39px] rounded-[12px] size-[600px] top-[-88px] pointer-events-none" />
      <div className="absolute bg-[rgba(233,0,54,0.05)] blur-[60px] bottom-[-88px] left-[-39px] rounded-[12px] size-[600px] pointer-events-none" />

      <div className="relative w-full max-w-[448px] flex flex-col gap-12">
        <div className="relative pl-5 flex flex-col gap-2">
          <div className="absolute left-0 top-0 w-1 h-12 bg-[#8eff71] rounded-sm" />
          <p className="font-bold text-[#8eff71] text-[10px] tracking-[3px] uppercase">
            CIPHER RESET PROTOCOL v1.0
          </p>
          <h1 className="font-black text-white text-[48px] leading-[58px]">
            Reset
            <br />
            <span className="text-[#8eff71]">Cipher</span>
          </h1>
        </div>

        {done ? (
          <div className="backdrop-blur-[10px] bg-[rgba(26,25,25,0.6)] border border-[rgba(73,72,71,0.1)] rounded-[8px] p-8 flex flex-col gap-6 items-center text-center">
            <div className="size-16 rounded-full bg-[rgba(142,255,113,0.1)] border border-[rgba(142,255,113,0.2)] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#8eff71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[#8eff71] text-[10px] tracking-[3px] uppercase">
                PROTOCOL UPDATED
              </p>
              <h2 className="font-black text-white text-2xl">Cipher Updated</h2>
              <p className="text-[#adaaaa] text-sm mt-1">
                Your cipher protocol has been successfully updated.
              </p>
            </div>
            <button
              onClick={() => navigate('/Login')}
              className="bg-[#8eff71] text-[#0d6100] font-bold text-sm tracking-[2.8px] uppercase w-full py-5 rounded-[6px]"
            >
                Return to Terminal
            </button>
            </div>):(
                <div className="backdrop-blur-[10px] bg-[rgba(26,25,25,0.6)] border border-[rgba(73,72,71,0.1)] rounded-[8px] p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                Encrypted ID (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="NEON_PLAYER@MATRIX.NET"
                className="w-full bg-black border border-[rgba(73,72,71,0.2)] rounded-[6px] px-4 py-[18px] text-white text-sm tracking-[0.7px] placeholder:text-[rgba(173,170,170,0.3)] outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                New Cipher Protocol
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black border border-[rgba(73,72,71,0.2)] rounded-[6px] px-4 py-[18px] text-white text-sm tracking-[0.7px] placeholder:text-[rgba(173,170,170,0.3)] outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-[#adaaaa] text-[10px] tracking-[1px] uppercase">
                Confirm Cipher Protocol
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••••••"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full bg-black border border-[rgba(73,72,71,0.2)] rounded-[6px] px-4 py-[18px] text-white text-sm tracking-[0.7px] placeholder:text-[rgba(173,170,170,0.3)] outline-none"
              />
            </div>

            {error && <p className="text-[#ff7073] text-xs">{error}</p>}

            <button
              onClick={handleSubmit}
              className="bg-[#8eff71] text-[#0d6100] font-bold text-sm tracking-[2.8px] uppercase w-full py-5 rounded-[6px]"
            >
                Update Cipher
            </button>
            </div>
            )}
            {!done && (
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/Login')}
              className="text-[rgba(173,170,170,0.5)] text-[9px] tracking-[2px] uppercase"
            >
              Return to Terminal Login
            </button>
          </div>
        )}
      </div>
    </div>

  )

}