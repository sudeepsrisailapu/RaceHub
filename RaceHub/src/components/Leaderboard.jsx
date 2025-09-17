import React, { useState, useEffect } from "react";

export default function Leaderboard() {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({
        name: '',
        car: '',
        laptime: '',
        event: ''
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('leaderboardEntries')) || [];
        setEntries(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem('leaderboardEntries', JSON.stringify(entries));
    }, [entries]);

    const addEntry = (e) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({ ...prev, [name]: value }));
    };

    const submitEntry = (e) => {
        e.preventDefault();

        if (!newEntry.name || !newEntry.car || !newEntry.laptime || !newEntry.event) {
            alert("Please fill out all fields before submitting entry.");
            return;
        }

        const updatedEntries = [...entries, { ...newEntry, id: Date.now() }];

        updatedEntries.sort((a, b) => {
            if (a.event.toLowerCase() < b.event.toLowerCase()) return -1;
            if (a.event.toLowerCase() > b.event.toLowerCase()) return 1;

            const toSeconds = (time) => {
            const [min, sec] = time.split(':');
            return parseFloat(min) * 60 + parseFloat(sec);
            };
            return toSeconds(a.laptime) - toSeconds(b.laptime);
        });

        setEntries(updatedEntries);
        setNewEntry({ name: '', car: '', laptime: '', event: '' });
    };

    return (
        <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif', padding: '0 1rem' }}>
        <h1 style={{ textAlign: 'center', color: '#222' }}>🏆 Leaderboard</h1>

        <form onSubmit={submitEntry} style={{ marginBottom: '2rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <fieldset style={{ border: 'none', padding: 0, marginBottom: '1rem' }}>
            <legend style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Add New Lap Time</legend>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600' }}>Driver Name</label>
                <input
                id="name"
                name="name"
                type="text"
                value={newEntry.name}
                onChange={addEntry}
                placeholder="Driver name"
                style={inputStyle}
                required
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="car" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600' }}>Car Model</label>
                <input
                id="car"
                name="car"
                type="text"
                value={newEntry.car}
                onChange={addEntry}
                placeholder="Car model"
                style={inputStyle}
                required
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="laptime" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600' }}>Lap Time (mm:ss.xx)</label>
                <input
                id="laptime"
                name="laptime"
                type="text"
                value={newEntry.laptime}
                onChange={addEntry}
                placeholder="e.g., 1:23.45"
                style={inputStyle}
                pattern="^\d+:\d{2}\.\d{2}$"
                title="Format: minutes:seconds.centiseconds (e.g., 1:23.45)"
                required
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="event" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600' }}>Event / Track</label>
                <input
                id="event"
                name="event"
                type="text"
                value={newEntry.event}
                onChange={addEntry}
                placeholder="Track or Event name"
                style={inputStyle}
                required
                />
            </div>

            <button
                type="submit"
                style={{
                ...buttonStyle,
                width: '100%',
                backgroundColor: '#007BFF',
                }}
            >
                Submit Lap Time
            </button>
            </fieldset>
        </form>

        {entries.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#555' }}>No leaderboard entries yet.</p>
        ) : (
            <table
            style={{
                width: '100%',
                borderCollapse: 'collapse',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
            aria-label="Leaderboard Table"
            >
            <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
                <tr>
                <th style={thStyle}>Driver</th>
                <th style={thStyle}>Car</th>
                <th style={thStyle}>Lap Time</th>
                <th style={thStyle}>Event</th>
                </tr>
            </thead>
            <tbody>
                {entries.map(({ id, name, car, laptime, event }) => (
                <tr key={id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={tdStyle}>{name}</td>
                    <td style={tdStyle}>{car}</td>
                    <td style={tdStyle}>{laptime}</td>
                    <td style={tdStyle}>{event}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </main>
    );
    }

    const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
    };

    const buttonStyle = {
    padding: '12px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    };

    const thStyle = {
    padding: '12px 8px',
    textAlign: 'left',
    };

    const tdStyle = {
    padding: '10px 8px',
    textAlign: 'left',
};
