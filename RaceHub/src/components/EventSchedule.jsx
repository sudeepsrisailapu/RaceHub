import React from 'react';
import { useNavigate } from 'react-router-dom';
import { thisWeeksEvents, nextWeeksEvents, EventCard } from './Events';
import '../App.css';

export default function EventSchedule({ user }) {
    const navigate = useNavigate();

    const handleRegisterClick = (eventName) => {
        if (!user) {
        alert("Please log in to register for events.");
        navigate('/login');
        return;
        }
        navigate('/register', { state: { eventName } });
    };

    return (
        <div className="event-schedule-container">
        <h2>This Week's Events</h2>
        <ul className="event-list">
            {thisWeeksEvents.map(event => (
            <EventCard 
                key={event.id} 
                event={event} 
                onRegister={handleRegisterClick} 
            />
            ))}
        </ul>

        <h2>Next Week's Events</h2>
        <ul className="event-list">
            {nextWeeksEvents.map(event => (
            <EventCard 
                key={event.id} 
                event={event} 
                disableRegister={true} 
            />
            ))}
        </ul>
        </div>
    );
}
