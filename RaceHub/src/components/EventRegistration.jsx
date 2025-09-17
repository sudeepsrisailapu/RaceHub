import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { thisWeeksEvents } from './Events';

export default function EventRegistration({ user }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        car: '',
        event: ''
    });

    const [registeredUsers, setRegisteredUsers] = useState({
        "Time Trial": ["Alice", "Bob"],
        "Monthly Championship": ["Charlie"]
    });

    useEffect(() => {
        if (location.state?.eventName) {
        const validEvent = thisWeeksEvents.find(e => e.name === location.state.eventName);
        if (validEvent) {
            setFormData(prev => ({ ...prev, event: validEvent.name }));
        } else {
            alert("Invalid event selected");
            navigate('/schedule');
        }
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (!user) {
        alert("You must be logged in to register.");
        navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thanks for registering for ${formData.event}!`);

        setRegisteredUsers(prev => {
        const current = prev[formData.event] || [];
        return {
            ...prev,
            [formData.event]: [...current, formData.name]
        };
        });

        setFormData({ ...formData, name: '', car: '' });
    };

    return (
        <main style={styles.container}>
        <h1 style={styles.heading}>Register for an Event</h1>

        <form onSubmit={handleSubmit} style={styles.form} aria-label="Event registration form">
            <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Your Information</legend>

            <label htmlFor="name" style={styles.label}>Name</label>
            <input
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
            />

            <label htmlFor="car" style={styles.label}>Car</label>
            <input
                id="car"
                name="car"
                placeholder="Your Car"
                value={formData.car}
                onChange={handleChange}
                required
                style={styles.input}
            />
            </fieldset>

            <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Select Event</legend>

            <label htmlFor="event" style={styles.label}>Event</label>
            <select
                id="event"
                name="event"
                value={formData.event}
                onChange={handleChange}
                required
                style={styles.select}
            >
                <option value="" disabled>Select an event</option>
                {thisWeeksEvents.map(event => (
                <option key={event.id} value={event.name}>
                    {event.name} - {event.date} ({event.game})
                </option>
                ))}
            </select>
            </fieldset>

            <button type="submit" style={styles.button}>Submit</button>
        </form>

        <section aria-labelledby="current-registrations-heading" style={styles.registrationsSection}>
            <h2 id="current-registrations-heading" style={styles.subheading}>Current Registrations</h2>

            {thisWeeksEvents.length === 0 ? (
            <p>No events available.</p>
            ) : (
            thisWeeksEvents.map(event => (
                <div key={event.id} style={styles.eventTableContainer}>
                <h3 style={styles.eventTitle}>{event.name}</h3>
                <table
                    style={styles.table}
                    aria-describedby={`registration-for-${event.id}`}
                >
                    <caption id={`registration-for-${event.id}`} style={styles.caption}>
                    Registered users for {event.name}
                    </caption>
                    <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>Registrant Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(registeredUsers[event.name] && registeredUsers[event.name].length > 0) ? (
                        registeredUsers[event.name].map((user, idx) => (
                        <tr key={idx} style={styles.tr}>
                            <td style={styles.td}>{user}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td style={styles.td}>No registrants yet.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            ))
            )}
        </section>
        </main>
    );
    }

    const styles = {
    container: {
        maxWidth: 600,
        margin: '2rem auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '0 1rem',
        color: '#222',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '1.5rem',
        fontWeight: '700',
    },
    form: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
    },
    fieldset: {
        border: 'none',
        marginBottom: '1.25rem',
    },
    legend: {
        fontWeight: '600',
        fontSize: '1.125rem',
        marginBottom: '0.5rem',
        color: '#333',
    },
    label: {
        display: 'block',
        marginBottom: '0.3rem',
        fontWeight: '600',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '0.6rem 0.75rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '1rem',
        outlineColor: '#4CAF50',
    },
    select: {
        width: '100%',
        padding: '0.6rem 0.75rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '1rem',
        outlineColor: '#4CAF50',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '0.75rem 1.25rem',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s ease',
    },
    registrationsSection: {
        backgroundColor: '#fafafa',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    subheading: {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1rem',
    },
    eventTableContainer: {
        marginBottom: '2rem',
    },
    eventTitle: {
        marginBottom: '0.5rem',
        color: '#007BFF',
        fontSize: '1.25rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    caption: {
        textAlign: 'left',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#444',
    },
    thead: {
        backgroundColor: '#007BFF',
        color: 'white',
    },
    th: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '2px solid #0056b3',
    },
    tr: {
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        verticalAlign: 'top',
        color: '#333',
    },
};
