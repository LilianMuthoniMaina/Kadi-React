import { useNavigate } from "react-router-dom";
const recentActivity = [
    {id:1, title: "Texas Hold'em - able #42", amount: '+12,450', win: true, time: '14 mins ago', tag: 'Victory'},
    {id:2, title: 'Tournament - High Stakes', amount: '-5000', win: false, time: '2 hours ago', tag: 'Folded'},
    { id: 3, title: "Texas Hold'em - Neon Lounge", amount: '+42,000', win: true, time: 'Yesterday', tag: 'All-In Win'}
]

export default function Profile(){
    const navigate = useNavigate()
    const level = 42;
    const xp = 2450;
    const xpTarget = 3000;
    const xpPercent = Math.round((xp / xpTarget) * 100);

    return(
        <div className="bg-[#0e0e0e] min-h-screen w-full flex flex-col gap-8 pt-24 pb-32 px-6">
            <div className="flex flex-col gap-4">
                <div className="flex gap-6 items-end">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-[rgba(142,255,113,0.2)] blur-[12px] opacity-75 rounded-[12px]" />
                        <div className="relative size-24 rounded-[12px] border-2 border-[#8eff71] bg-[#1a1919] flex items-center justify-center text-3xl">🃏</div>
                        <div className="absolute -bottom-1 -right-1 bg-[#8eff71] px-2 py-0.5 rounded-[12px]">
                            <span className="text-[#064200] text-[10px] font-bold uppercase">Pro</span>
                        </div>
                    </div>
                     <div className="flex-1 pb-2">
                        <h1 className="font-black text-white text-[30px] leading-[36px]">Ace_Viper</h1>
                        <p className="text-[#8eff71] text-[10px] tracking-[2px] uppercase">Diamond League Elite</p>
                    </div>
                </div>

                <div className="bg-[#1a1919] border border-[rgba(73,72,71,0.1)] rounded-[8px] p-[17px] flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                        <h3 className="font-bold text-white text-[18px]">Level {level}</h3>
                        <span className="text-[#adaaaa] text-[10px] tracking-[1px] uppercase">{xp.toLocaleString()} / {xpTarget.toLocaleString()} XP</span>
                    </div>
                    <div className="bg-[#262626] h-[6px] rounded-[12px] overflow-hidden">
                        <div className="bg-[#8eff71] h-full shadow-[0px_0px_15px_0px_rgba(142,255,113,0.6)]"
                            style={{ width: `${xpPercent}%` }} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-[#201f1f] border border-[rgba(142,255,113,0.05)] rounded-[8px] p-[25px] relative overflow-hidden">
                    <div className="absolute -right-16 -top-16 bg-[rgba((142,255,113,0.05)] blur-[32px] rounded-full size-32" />
                    <div className="flex items-center justify-between relative">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#adaaaa] text-[10px] tracking-[1px] uppercase">Total Wins</span>
                            <h2 className="font-black text-[#ffdd79] text-[36px]">1,284</h2>
                        </div>
                        <span className="text-[#ffdd79] text-2xl opacity-50">🏆</span>
                    </div>
                </div>

                {/*won games part*/}
                <div className="bg-[#1a1919] border border-[rgba(73,72,71,0.05)] rounded-[8px] p-[21px] flex flex-col gap-2">
                    <span className="text-[#adaaaa] text-[10px] tracking-[1px] uppercase">Win Rate</span>
                    <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#8eff71] text-[24px]">64.2%</span>
                        <span className="text-[#8eff71] text-xs">▲</span>
                    </div>
                </div>

                {/*games */}
            <div className="bg-[#1a1919] border border-[rgba(73,72,71,0.05)] rounded-[8px] p-[21px] flex flex-col gap-2">
                <span className="text-[#adaaaa] text-[10px] tracking-[1px] uppercase">Games Played</span>
                <h4 className="font-bold text-white text-[24px]">2,001</h4>
            </div>

            <div className="col-span-2 bg-[#1a1919] border border-[rgba(73,72,71,0.05)] rounded-[8px] p-[17px] flex items-center justify-between">
                <div>
                    <span className="text-[#adaaaa] text-[10px] tracking-[1px] uppercase">History - Games Lost</span>
                    <h4 className="font-bold text-[#ff7073] text-[20px]">717</h4>
                </div>
                <div className="flex gap-1 items-end h-10">
                    <div className="w-1 rounded-full bg-[rgba(255,112,115,0.2)]" style={{ height: '24px' }} />
                    <div className="w-1 rounded-full bg-[rgba(255,112,115,0.4)]" style={{ height: '32px' }} />
                    <div className="w-1 rounded-full bg-[rgba(255,112,115,0.2)]" style={{ height: '16px' }} />
                    <div className="w-1 rounded-full bg-[#ff7073]" style={{ height: '40px' }} />
                    <div className="w-1 rounded-full bg-[rgba(255,112,115,0.6)]" style={{ height: '20px' }} />
                </div>
              </div>
        </div>

        {/*activity*/}
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-black text-white text-[20px]">Recent Activity</h2>
                <button className="text-[#8eff71] text-[10px] tracking-[1px] uppercase border-b border-[rgba(142,255,113,0.3)] pb-1">
                    View All
                </button>
        </div>

        <div className="flex flex-col gap-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="bg-[#131313] rounded-[8px] p-4 flex gap-4 items-center">
              <div className={`size-12 rounded-[4px] flex items-center justify-center text-lg ${item.win ? 'bg-[rgba(142,255,113,0.1)]' : 'bg-[rgba(255,112,115,0.1)]'}`}>
                {item.win ? '🏆' : '💔'}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-start justify-between text-sm">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className={`font-black ${item.win ? 'text-[#8eff71]' : 'text-[#ff7073]'}`}>{item.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#adaaaa] text-[10px] tracking-[0.5px] uppercase">{item.time}</span>
                  <span className={`text-[10px] font-bold uppercase ${item.win ? 'text-[rgba(142,255,113,0.6)]' : 'text-[rgba(255,112,115,0.6)]'}`}>
                    {item.tag}
                  </span>
                </div>
             </div>
            </div>))}
        </div>
    </div>
    </div>
  );
}