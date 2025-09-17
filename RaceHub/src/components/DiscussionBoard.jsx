import React, { useState, useEffect } from 'react';

export default function DiscussionBoard() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
        setPosts(storedPosts);
    }, []);


    useEffect(() => {
        localStorage.setItem('communityPosts', JSON.stringify(posts));
    }, [posts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content || !newPost.author) {
            alert("All fields are required!");
            return;
        }
        const updatedPosts = [...posts, { ...newPost, id: Date.now() }];
        setPosts(updatedPosts);
        setNewPost({ title: '', content: '', author: '' });
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🏁 RaceHub Community Board</h2>


            <input
                type="text"
                placeholder="Search posts by author, title, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    border: '1px solid #ccc'
                }}
            />


            <form onSubmit={handleSubmit} style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '30px',
                backgroundColor: '#f9f9f9'
            }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                        name="author"
                        value={newPost.author}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                        placeholder="Post title"
                        style={{ flex: 2, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    placeholder="Write your post..."
                    rows="4"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'vertical' }}
                />
                <button type="submit" style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Post
                </button>
            </form>


            <div>
                {filteredPosts.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No posts found. Be the first to start a discussion!</p>
                ) : (
                    filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '15px',
                                marginBottom: '15px',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <strong>{post.title}</strong>
                                <span style={{ fontStyle: 'italic', color: '#555' }}>by {post.author}</span>
                            </div>
                            <p style={{ marginTop: '10px', lineHeight: '1.5' }}>{post.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}