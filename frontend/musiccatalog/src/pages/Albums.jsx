import React, { useEffect, useState } from "react";
import Albums from "../components/Album"

const host = import.meta.env.BACKENDURL
const ViewAlbums = () => {

    const [albums, setAlbums] = useState([]);

    // grabs the top 20 new-released albums from the backend
    useEffect(() => {
        fetch(`${host}/albums`)
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((jsonRes) => setAlbums(jsonRes));
    }, []);


  return (
    <div>
        <h1 className="text-slate-50 text-4xl">New Albums</h1>
        <br></br>

        {/* albums components that will show the list of the top 20 new-released albums */}
        <Albums albums={albums} />
    </div>
  )
}

export default ViewAlbums