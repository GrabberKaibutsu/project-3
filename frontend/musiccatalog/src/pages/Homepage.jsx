// export default Homepage;
import React, { useEffect, useState } from "react";
import Artists from "../components/Artists";
import Albums from "../components/HomeAlbums";
import Songs from "../components/HomeSongs";
import { Link } from "react-router-dom";

const host = import.meta.env.VITE_BACKENDURL
const Homepage = () => {
  const [homeData, setHomeData] = useState([]);
  const [error, setError] = useState(null);

  // gets the list of top 5 artists, albums and tracks to display on the home page
  useEffect(() => {
    fetch(`${host}/home`)
      .then((res) => res.json())
      .then((jsonRes) => setHomeData(jsonRes))
      .catch((error) => {
        setError('Failed to fetch home data');
        console.error('Fetch error:', error);
      });
  }, []);
  
  let newAlbums = homeData[1];
  let topTracks = homeData[2];

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div>
      <div>
        <Artists />
      </div>
      <br />
      <div>
        <div className="flex gap-10 md:gap-96">
          <h1 className="text-slate-50 text-4xl">New Albums</h1>
          <Link to={`/albums`} className="text-slate-50 hover:text-indigo-600">
            View More Albums
          </Link>
        </div>
        <br />
        <Albums albums={newAlbums} />
      </div>
      <br />
      <div>
        <div className="flex gap-10 md:gap-96">
          <h1 className="text-slate-50 text-4xl">Top Songs</h1>
          <button
            type="button"
            onClick={() => {} /* Add functionality to navigate to more songs */}
            className="text-white hover:text-indigo-600"
          >
            View More Songs
          </button>
        </div>
        <br />
        <Songs songs={topTracks} />
      </div>
    </div>
  );
};

export default Homepage;
