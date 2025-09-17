
export const thisWeeksEvents = [
    { id: 1, name: "Time Trial", date: "July 21 - 5 PM CT", game: "Assetto Corsa" },
    { id: 1, name: "3 hour endurace race", date: "July 25 - 4 PM CT", game: "LeMans Ultimate" },
    { id: 1, name: "1 hour endurace race", date: "July 28 - 7 PM CT", game: "Assetto Corsa Competizione" }
    ];

    export const nextWeeksEvents = [
    { id: 2, name: "Endurance Championship", date: "August 1 - 5 PM CT", game: "Gran Turismo" },
    { id: 2, name: "Time Trial Championship", date: "August 4 - 5 PM CT", game: "Asseto Corsa" },
    { id: 2, name: "Sprint Championship", date: "August 5 - 5 PM CT", game: "LeMans Ultimate" }
    ];


    import React from 'react';

    export function EventCard({ event, onRegister, disableRegister }) {
    return (
        <li className="event-card">
        <strong>{event.name}</strong> {event.date} ({event.game}){' '}
        <button 
            onClick={() => onRegister && onRegister(event.name)} 
            disabled={disableRegister}
            title={disableRegister ? "Registration not open yet" : ""}
        >
            Register
        </button>
        </li>
    );
}