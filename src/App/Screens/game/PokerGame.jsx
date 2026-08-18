import { useNavigate } from 'react-router-dom'

const dummyPlayerHand = [
    { rank: 'A', suit: '♠️', isRed: false },
    { rank: 'K', suit:'❤️', isRed: true }
]
const dummyOpponentBack = true

export default function PokerGame(){
    const navigate = useNavigate()

    return(
        <div className="bg-[#0e0e0e] min-h-screen w-full flex flex-col relative overflow-hidden">
            <div className="absolute bg-[rgba(142,255,113,0.04)] blur-[80px] rounded-full size-[500px] top-[-100px] pointer-events-none" />
            <div className="absolute bg-[rgba(233,0,54,0.04)] blur-[80px] rounded-full size-[500px] bottom-[-100px] left-[-100px] pointer-events-none" />

            {/*heading*/}
            <div className="flex items-center justify-between px-5 pt-12 pb-4 relative z-10">
                <button
                    onClick={() => navigate('/game')}
                    className="flex items-center gap-2 text-[rgba(173,170,170,0.6)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M-15 181-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLineJoin="round" />
                    </svg>
                    <span className="text-10[px] tracking-[1.5px] uppercase">Lobby</span>
                </button>
                <div className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-[#8eff71]" />
                    <span className="text-[#8eff71] text-[10px] tracking-[1.5px] uppercase">Pre-Flop</span>
                </div>
            </div>

            {/*pc section*/}
            <div className="px-5 pt-2 pb-4 flex flex-col gap-3 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-[8px] bg-[#1a1919] border border-[rgba(73,72,71,0.3)] flex items-center text-sm">🤖</div>
                        <div>
                            <p className="text-white text-sm leading-none">Ace_Viper</p>
                            <p className="text-[#adaaaa] text-[10px] tracking-[1px] uppercase mt-0.5">Dealer</p>
                        </div>
                    </div>
                    <span className="text-[#ffdd79] text-xs">💰 1,900</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-[52px] h-[76px] rounded-[8px] bg-[#1a1919] border border-[rgba(142,255,113,0.15)]" />
                    <div className="w-[52px] h-[76px] rounded-[8px] bg-[#1a1919] border border-rgba(142,255,113,0.15)]" />
                </div>
            </div>

            {/*community cards and the pot*/}
            <div className="mx-5 bg-[#131313] border border-[rgba(73,72,71,0.15)] rounded-[16px] p-4 flex flex-col gap-4 relative z-10">
                <div className="flex items-center justify-between">
                    <p className="text-[#adaaaa] text-[10px] tracking-[1.5px] uppercase">Community Cards</p>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[#adaaaa] text-[10px] uppercase">Pot</span>
                        <span className="text-[#ffdd79] text-lg">$200</span>
                    </div> 
                </div>
                <div className="flex gap-2 justify-center">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-[52px] h-[76px] rounded-[8px] border border-dashed border-[rgba(73,72,71,0.25)]" />
                    ))}
                </div>
            </div>

            {/*player part*/}
            <div className="px-5 pt-4 flex flex-col gap-3 realtive z-10 flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-[8px] bg-[rgba(142,255,113,0.1)] border border-[rgba(142,255,113,0.2)] flex items-center justify-center text-sm">🎯</div>
                        <div>
                            <p className="text-white text-sm leading-none">You</p>
                            <p className="text-[#8eff71] text-[10px] tracking-[1px] uppercase mt-0.5">High Card</p>
                        </div>
                    </div>
                    <span className="text-[#ffdd79] text-xs">💰 1,900</span>
                </div>

                <div className="flex gap-2">
                    {dummyPlayerHand.map((card, i) => (
                        <div key={i} className="w-[52px] h-[76px] rounded-[8px] bg-[#f5f4ef] flex flex-col p-1.5">
                            <span className={`font-bold text-sm ${card.isRed ? 'text-[#d32f2f]' : 'text-[#1a1919]'}`}>{card.rank}</span>
                            <span className={`text-base ${card.isRed ? 'text-[#d32f2f]' : 'text-[#1a1919]'}`}>{card.suit}</span>
                        </div>
                    ))}
                </div>
                </div>

            {/*buttons*/}
            <div className="px-5 pb-10 pt-2 flex gap-3 relative z-10">
                <button className="flex-1 py-4 rounded-[10px] border border-[rgba(255,112,115,0.3] bg-[rgba(255,112,115,0.08)] text-[#ff7073] text-sm tracking-[1.5px] uppercase">
                    Fold
                </button>
                <button className="flex-[1.4] py-4 rounded-[10px] bg-[rgba(142,255,113,0.1)] border border-[rgba(142,255,113,0.3)] text-[#8eff71] text-sm tracking-[1.5px] uppercase">
                    Check
                </button>
                <button className="flex-1 py-4 rounded-[10px] bg-[#8eff71] text-[#064200] text-sm tracking-[1.5px] uppercase">
                    Raise
                </button>
                
            </div>
        </div>
    )
}