import React, { useState } from 'react';
import axios from 'axios';
import { Appid } from '../Pass';

const Home = () => {
    const [nickname, setNickname] = useState('');
    const [playerStats, setPlayerStats] = useState(null);
    const [error, setError] = useState('');

    const fetchPlayerStats = async () => {
        setError('');
        try {
            // Krok 1: Pobierz ID gracza na podstawie nicku
            const response = await axios.get(`https://api.worldoftanks.eu/wot/account/list/?application_id=${Appid}&search=${nickname}`);
            console.log('Odpowiedź z listy kont:', response.data); // Log odpowiedzi

            const playerData = response.data.data;

            // Sprawdzanie, czy gracz został znaleziony
            if (!playerData || playerData.length === 0) {
                setError('Gracz nie znaleziony.');
                return;
            }

            const playerId = playerData[0].account_id;

            // Krok 2: Pobierz statystyki gracza
            const statsResponse = await axios.get(`https://api.worldoftanks.eu/wot/account/info/?application_id=${Appid}&account_id=${playerId}&fields=created_at,last_battle_time,statistics`);
            console.log('Odpowiedź z statystyk:', statsResponse.data); // Log odpowiedzi

            const stats = statsResponse.data.data[playerId];

            // Sprawdzanie, czy statystyki zostały zwrócone
            if (!stats) {
                setError('Błąd podczas pobierania statystyk.');
                return;
            }

            // Obliczamy dodatkowe statystyki
            const battles = stats.statistics.all.battles || 0;
            const wins = stats.statistics.all.wins || 0;
            const fragCount = stats.statistics.all.frags || 0; // Można zastąpić, jeśli dane są dostępne.
            const lastBattleTime = stats.last_battle_time;
            const createdAt = stats.created_at;

            const vehiclesResponse = await axios.get(`https://api.worldoftanks.eu/wot/account/tanks/?application_id=${Appid}&account_id=${playerId}`);
            console.log('Odpowiedź z czołgów:', vehiclesResponse.data); // Log odpowiedzi

            const vehiclesData = vehiclesResponse.data.data[playerId] || [];
            const tankCount = vehiclesData.length; // Liczba unikalnych czołgów

            // Obliczamy win ratio i średnie obrażenia na bitwę, jeśli statystyki są dostępne
            const winRatio = battles > 0 ? ((wins / battles) * 100).toFixed(2) : 0;
            const averageDamage = battles > 0 ? (stats.statistics.all.damage_dealt / battles).toFixed(2) : 0;

            setPlayerStats({
                created_at: createdAt,
                last_battle_time: lastBattleTime,
                battles: battles,
                wins: wins,
                frag_count: fragCount,
                tank_count: tankCount,
                winRatio,
                averageDamage
            });
        } catch (err) {
            setError('Wystąpił błąd podczas pobierania danych.');
            console.error('Błąd:', err);
            if (err.response) {
                console.error('Dane odpowiedzi:', err.response.data); // Wyświetl dane odpowiedzi
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[89vh] bg-gray-700 max-h-[90vh]">
            <h1 className="text-3xl text-gray-100 font-bold mb-4">WOTstats by kolmipilot</h1>
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Wpisz nick..."
                className="p-2 border border-gray-700 rounded mb-4 bg-gray-600 text-gray-100"
            />
            <button
                onClick={fetchPlayerStats}
                className="bg-blue-500 text-gray-100 p-2 rounded"
            >
                Sprawdź statystyki
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {playerStats && (
                <div className="mt-6 text-gray-100 shadow-md rounded p-4 bg-gray-600">
                    <h2 className="text-lg text-gray-100 font-semibold">Statystyki dla: {nickname}</h2>
                    <p>Data utworzenia konta: {new Date(playerStats.created_at * 1000).toLocaleDateString()}</p>
                    <p>Rozegrane bitwy: {playerStats.battles}</p>
                    <p>Data ostatniej bitwy: {new Date(playerStats.last_battle_time * 1000).toLocaleDateString()}</p>
                    <p>Posiadane czołgi: {playerStats.tank_count}</p>
                    <p>Win ratio: {playerStats.winRatio}%</p>
                    <p>Zniszczone czołgi: {playerStats.frag_count}</p>
                    <p>Średnie obrażenia na bitwę: {playerStats.averageDamage}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
