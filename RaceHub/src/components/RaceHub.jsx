import React from 'react';

export default function Home() {
    return (
        <main style={styles.container}>
        <header style={styles.header}>
            <h1 style={styles.title}>Welcome to RaceHub!</h1>
            <p style={styles.subtitle}>
            Your ultimate hub for simracing events, lap times, and community interaction.
            </p>
        </header>

        <div style={styles.imageWrapper} aria-label="Race car on track - sim racing illustration">
            <img 
                src="/racehubhome.jpg" 
                alt="Race car on track - sim racing illustration" 
                style={styles.image}
            />
        </div>

        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>What is RaceHub?</h2>
            <p style={styles.paragraph}>
            RaceHub is a dedicated platform for sim racing enthusiasts to stay connected, compete, and track their progress.
            Whether you're a casual player or a competitive racer, RaceHub helps you join events, log your best lap times, and
            compare your performance with others.
            </p>
        </section>

        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Features</h2>
            <ul style={styles.list}>
            <li><strong>Event Registration:</strong> Browse and register for upcoming sim racing events easily.</li>
            <li><strong>Leaderboard:</strong> View and submit your lap times to see how you stack up against other racers.</li>
            <li><strong>Event Schedule:</strong> Keep track of all scheduled races so you never miss a competition.</li>
            <li><strong>Community Discussion:</strong> Engage with other racers, share tips, and discuss strategies.</li>
            </ul>
        </section>

        <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Get Started</h2>
            <p style={styles.paragraph}>
            To get started, sign up or log in, explore upcoming events, and start competing today!
            RaceHub is here to make your sim racing experience more fun, organized, and competitive.
            </p>
        </section>
        </main>
    );
    }

    const styles = {
    container: {
        maxWidth: 800,
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
        color: '#007BFF',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#555',
    },
        
    imageWrapper: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    section: {
        marginBottom: '2rem',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        color: '#007BFF',
        marginBottom: '0.75rem',
    },
    paragraph: {
        fontSize: '1.1rem',
        lineHeight: 1.6,
        color: '#333',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '1.5rem',
        fontSize: '1.1rem',
        color: '#333',
    },
};
