import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const SUITS = ['♠️', '❤️', '♦️', '♣️']
const RED_SUITS = new Set(['❤️', '♦️'])

function createDeck() {
    const deck = []
    for (const suit of SUITS){
        for(const rank of RANKS){
            deck.push({rank, suit, isRed: RED_SUITS.has(suit) })
        }
    }
    return deck;
}

function shuffle(arr){
    const a = [...arr]
    for(let i=a.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i +1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function rankVal(r) {
    const m = {
        '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8,
        '9':9, '10':10, 'J':11, 'Q':12, 'K':13, 'A':14
    }
    return m[r]
}

function combos(arr, k) {
    if(k === 0) return [[]]
    if(arr.length < k) return []
    const [h, ...t] = arr
    return [
        ...combos(t, k-1).map(c => [h, ...c]),
        ...combos(t, k),
    ]
}

function score5(cards) {
    const rv = cards.map(c => rankVal(c.rank)).sort((a,b) => b - a)
    const suits = cards.map(c => c.suit)
    const isFlush = new Set(suits).size === 1
    const isStraight = rv[0] - rv[4] === 4 && new Set(rv).size === 5
    const isAceLow = JSON.stringify(rv) === JSON.stringify([14,5,4,3,2])
    const isSt = isStraight || isAceLow

    const cnt = {}
    for(const r of rv) cnt[r] = (cnt[r] ?? 0) + 1
    const groups = Object.values(cnt).sort((a,b) => b-a)
    const top = rv[0]

    if (isFlush && isSt) return { score: 8000000 + top, name: top === 14 && isStraight ? 'Royal Flush' : 'Straight Flush' };
  if (groups[0] === 4) return { score: 7000000 + top, name: 'Four of a Kind' };
  if (groups[0] === 3 && groups[1] === 2) return { score: 6000000 + top, name: 'Full House' };
  if (isFlush) return { score: 5000000 + top, name: 'Flush' };
  if (isSt) return { score: 4000000 + top, name: 'Straight' };
  if (groups[0] === 3) return { score: 3000000 + top, name: 'Three of a Kind' };
  if (groups[0] === 2 && groups[1] === 2) return { score: 2000000 + top, name: 'Two Pair' };
  if (groups[0] === 2) return { score: 1000000 + top, name: 'Pair' };
  return { score: top, name: 'High Card' };
}

function bestHand(cards){
    if (cards.length <5){
        const rv = cards.map(c => rankVal(c.rank)).sort((a, b) => b-a)
        const cnt = {}
        for (const r of rv) cnt[r] = (cnt[r] ?? 0) + 1;
    const groups = Object.values(cnt).sort((a, b) => b - a);
    if (groups[0] >= 3) return { score: 3000000 + rv[0], name: 'Three of a Kind' };
    if (groups[0] === 2 && groups[1] === 2) return { score: 2000000 + rv[0], name: 'Two Pair' };
    if (groups[0] === 2) return { score: 1000000 + rv[0], name: 'Pair' };
    return { score: rv[0], name: 'High Card' };
  }
  let best = { score: -1, name: 'High Card' };
  for (const combo of combos(cards, 5)) {
    const r = score5(combo);
    if (r.score > best.score) best = r;
  }
  return best;

    
}

{/*Game pArt*/}
function initGame(){
    const deck = shuffle(createDeck())
    const playerHand = [deck[0], deck[2]]
    const opponentHand = [deck[1], deck[3]]
    const communityCards = deck.slice(4,9)

    return {
        playerHand,
        opponentHand,
        communityCards,
        visibleCommunity: 0,
        pot: 200,
        playerChips: 1900,
        phase: 'preflop'
    }
}

export default function PokerGame(){
    const navigate = useNavigate()
    const [game, setGame] = useState(initGame)
    const playerBest = bestHand([...game.playerHand, ...game.communityCards.slice(0, game.visibleCommunity)])

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
                        <path d="M-15 181-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                    {game.playerHand.map((card, i) => (
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