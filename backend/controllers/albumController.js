// Require modules
const express = require("express");
const router = express.Router();
// const fetch = require("node-fetch");
const Album = require("../models/album");
const User = require("../models/user");
const validateJWT = require("./validateJWT");
require('dotenv').config()

 //Require DB connection
 //const db = require("../models");


 const CLIENT_ID = process.env.CLIENT_ID
 const CLIENT_SECRET = process.env.CLIENT_SECRET
 
 let token = "Your_Spotify_Access_Token";
 
 let authParameters = {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
   },
   body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
 }
 
 // - [ ] https://www.youtube.com/watch?v=1PWDxgqLmDA
 
 fetch('https://accounts.spotify.com/api/token', authParameters)
 .then(result => result.json())
 .then(data=> 
   // console.log(data)
   token = data.access_token
 )
 // - [ ] https://www.youtube.com/watch?v=1PWDxgqLmDA
 
async function fetchAlbums(){

  const endpoint = "https://api.spotify.com/v1/browse/new-releases?limit=30"

  try {

    // Fetch data from Spotify API
    const albumsResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If the response is not OK, throw an error
    if (!albumsResponse.ok) {
      throw new Error(`Spotify API request failed: ${albumsResponse.statusText}`);
    }

    // Parse the response body as JSON
    const data = await albumsResponse.json();
    // Return the artists array
    return data.albums.items;

  } catch (error) {
    // Log error and throw it up the chain
    console.error("Error fetching albums from Spotify:", error);
    throw error;
  }
}

async function fetchAlbum(albumID){

  const endpoint = `https://api.spotify.com/v1/albums/${albumID}`

  try {

    // Fetch data from Spotify API
    const albumResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If the albumResponse is not OK, throw an error
    if (!albumResponse.ok) {
      throw new Error(`Spotify API request failed: ${albumResponse.statusText}`);
    }

    // Parse the albumResponse body as JSON
    const data = await albumResponse.json();
    // Return the album array
    return data;

  } catch (error) {
    // Log error and throw it up the chain
    console.error("Error fetching albums from Spotify:", error);
    throw error;
  }
}

// Index - GET - /albums
router.get("/", async (req, res) => {
  try {

    console.log(token)
    
    // Fetch albums from Spotify
    const albums = await fetchAlbums();
    // Send the response
    res.send(albums);

  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch albums from Spotify" });
  }
});

// GET album is favorited for user
router.get("/:albumId/favorited", validateJWT, async (req, res) => {
  try {
    const userId = req.user.userId;
    const albumId = req.params.albumId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorited = user.favoriteAlbums.includes(albumId);
    res.send({ isFavorited: isFavorited });


  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ message: error.message });
  }
});

// Show - GET - /albums/:id
router.get("/:id", async (req, res)=> {
  try{
    
    // Fetch albums from Spotify
    const album = await fetchAlbum(req.params.id);
    // Send the response
    res.json(album);

  }catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch album from Spotify" });
  }
})

module.exports = router;