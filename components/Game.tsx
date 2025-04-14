'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function Home() {
    const [player, setPlayer] = useState<any>(null);
    const [guess, setGuess] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState<{ guess: string; correct: boolean }[]>([]);
    const [hint, setHint] = useState<any>(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            const res = await fetch('/api/todays-player');
            const data = await res.json();
            setPlayer(data);
        };
        fetchPlayer();
    }, []);

    const handleGuess = async () => {
        if (!guess.trim()) return;

        const res = await fetch('/api/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerName: player.name, guess, attempt: attempts.length })
        });

        const data = await res.json();
        setAttempts([...attempts, { guess, correct: data.correct }]);
        setHint(data.hint);
        setIsCorrect(data.correct);

        if (data.correct) {
            toast.success('Correct!');
        } else {
            toast.error('Try again.');
        }
    };

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white font-sans">
            <Head>
                <title>What College He Went To?</title>
            </Head>
            <Toaster />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-6">
                    What College He Went To?
                </h1>

                <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <p className="text-lg text-center mb-4">
                        Guess the college of <span className="font-bold">{player?.name}</span>
                    </p>
                    <div className="flex gap-2">
                        <input
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Enter college name..."
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                        />
                        <button
                            onClick={handleGuess}
                            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md font-semibold text-white transition"
                        >
                            Submit
                        </button>
                    </div>

                    <ul className="mt-4 space-y-1 text-sm">
                        {attempts.map((a, i) => (
                            <li key={i} className={`px-2 py-1 rounded ${a.correct ? 'bg-green-600' : 'bg-gray-700'}`}>
                                {a.guess} {a.correct && '(Correct!)'}
                            </li>
                        ))}
                    </ul>

                    {hint && !isCorrect && typeof hint === 'object' && (
                        <div className="mt-4 bg-gray-700 p-4 rounded-lg space-y-1">
                            {hint.conference && (
                                <p className="text-sm"><strong>Conference:</strong> {hint.conference}</p>
                            )}
                            {hint.region && (
                                <p className="text-sm"><strong>Region:</strong> {hint.region}</p>
                            )}
                            {hint.mascot && (
                                <p className="text-sm"><strong>Mascot:</strong> {hint.mascot}</p>
                            )}
                            {Array.isArray(hint.colors) && hint.colors.length > 0 && (
                                <p className="text-sm"><strong>Colors:</strong> {hint.colors.join(', ')}</p>
                            )}
                            {hint.collegeInitial && (
                                <p className="text-sm"><strong>Initials:</strong> {hint.collegeInitial}</p>
                            )}
                        </div>
                    )}
                </div>

                <footer className="mt-12 text-sm text-gray-400">
                    Built by Sean Hawi
                </footer>
            </div>
        </main>
    );
}
