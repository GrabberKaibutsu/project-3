import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const FeaturedPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/featured-playlists')
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching playlists:', error));
    }, []);

    return (
        <div style={{ color: 'white' }}> 
            <h1>Featured Playlists</h1>
            <ul>
                {playlists.map(playlist => (
                    <li key={playlist.id}>
                          <Link to={`/playlist/${playlist.id}`}>
                        {playlist.name} - {playlist.description}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeaturedPlaylists;
