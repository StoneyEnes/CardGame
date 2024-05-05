import './App.css'
import { useEffect, useState } from "react";

function App() {
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const [gameStart, setGameStart] = useState("wait");

    const Cards = [
        {
            id: 1,
            name: "card1",
            partner: 2,
            open: false,
        },
        {
            id: 2,
            name: "card2",
            partner: 1,
            open: false,
        },
        {
            id: 3,
            name: "card3",
            partner: 4,
            open: false,
        },
        {
            id: 4,
            name: "card4",
            partner: 3,
            open: false,
        },
        {
            id: 5,
            name: "card5",
            partner: 6,
            open: false,
        },
        {
            id: 6,
            name: "card6",
            partner: 5,
            open: false,
        }
    ];

    const [shuffledCards, setShuffledCards] = useState([]);

    useEffect(() => {
        if (gameStart === "playing") {
            setShuffledCards(shuffle([...Cards]));
        }
    }, [gameStart]);

    const [selectedCard, setSelectedCard] = useState([]);
    const [foundedCards, setFoundedCards] = useState([]);

    useEffect(() => {
        if (selectedCard.length === 2) {
            const [firstCard, secondCard] = selectedCard;
            if (firstCard.partner === secondCard.id || firstCard.id === secondCard.partner) {
                setFoundedCards([...foundedCards, firstCard, secondCard]);
                setSelectedCard([]);
            } else {
                setTimeout(() => {
                    setSelectedCard([]);
                }, 1000);
            }
        }
    }, [selectedCard]);

    useEffect(() => {
        if (foundedCards.length === Cards.length) {
            setGameStart("finish")
            setFoundedCards([])
        }
    }, [foundedCards]);

    return (
        <div className="w-full h-full bg-neutral-500 grid grid-cols-3 place-items-center justify-items-center">
            {
                gameStart === "finish" &&
                <div className="w-full h-full items-center justify-center flex absolute bg-black/40">
                    <div
                        className="absolute w-[100rem] h-[40rem] gap-y-10 flex-col rounded-lg bg-yellow-100 text-black text-4xl items-center justify-center flex m-4">
                        Oyun Bitti
                        <button onClick={() => setGameStart("playing")} className="bg-green-300 p-4 rounded-lg">Oyunu
                            Yeniden Başlat</button>
                    </div>
                </div>
            }



            {gameStart === "wait" &&
                <div className="w-full h-full items-center justify-center flex absolute bg-black/40">
                    <div className="absolute w-[100rem] h-[40rem] gap-y-10 flex-col rounded-lg bg-yellow-100 text-black text-4xl items-center justify-center flex m-4">
                        Oyun Beklemede
                        <button onClick={() => setGameStart("playing")} className="bg-green-300 p-4 rounded-lg">Oyunu Başlat</button>
                    </div>
                </div>
            }



            {shuffledCards.map((value, key) => (
                <button key={key}
                        disabled={selectedCard.length >= 2 || foundedCards.includes(value)}
                        className={`gap-y-4 items-center justify-center flex flex-col w-64 h-64 bg-blue-200  rounded-lg ${foundedCards.includes(value) ? 'bg-blue-950' : 'bg-blue-100'}`}>
                    {(selectedCard[0]?.id === value.id || selectedCard[1]?.id === value.id || foundedCards.includes(value)) ?
                        <div>
                            <p className="text-4xl">{value.id}</p>
                            <p className="text-2xl">{value.name}</p>
                        </div> :
                        <button onClick={() => setSelectedCard([...selectedCard, value])}>
                            <p className="text-2xl">Kartı Seçmek İçin Tıklatın</p>
                        </button>
                    }
                </button>
            ))}
        </div>
    )
}

export default App;
