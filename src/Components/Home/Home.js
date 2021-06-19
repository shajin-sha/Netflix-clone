import './Home.css';
import React, { useState, useContext, useEffect } from 'react'
import Banner from "../Banner/Banner";
import Rowpost from "../Rowpost/Rowpost.js";
import { action, HorrorMovies, ComedyMovies, RomanceMovies, Documentaries, Trending } from "../../urls";
import YoutubePlayer from "../YouTubePlayer/youtubeplayer";
import { API_KEY } from "../../const/constants";
import axios from "axios";
import { AuthContext, FireBaseContext } from "../../store/fireBasecontext"



function Home() {
  let [IsYouTubePlayer, setIsYouTubePlayer] = useState(false)
  let [YouTubePlayerId, setYouTubePlayerId] = useState(null)

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FireBaseContext)


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      if (user) {
        JSON.stringify(localStorage.setItem("userName", user.displayName))


      }



    })


  })


  function openYouTube(id) {
    setIsYouTubePlayer(true)
    setYouTubePlayerId(id)
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response => {
      if (Response.data.results[0].key !== undefined) {
        if (Response.data.results[0].key !== null) {
          setYouTubePlayerId(Response.data.results[0].key)

        }
      }


    })
  }

  function closeYouTube() {
    setIsYouTubePlayer(false)
  }



  return (
    <div className="App">



      <Banner></Banner>


      <Rowpost open={openYouTube} url={Trending} Name={"TRENDING NOW"} ></Rowpost>

      <Rowpost open={openYouTube} isSmall url={action} Name={"Action"} ></Rowpost>

      <Rowpost open={openYouTube} isSmall url={HorrorMovies} Name={"Horror"} ></Rowpost>

      <Rowpost open={openYouTube} isSmall url={ComedyMovies} Name={"Comedy"} ></Rowpost>

      <Rowpost open={openYouTube} isSmall url={RomanceMovies} Name={"Romance"} ></Rowpost>

      <Rowpost open={openYouTube} isSmall url={Documentaries} Name={"Documentaries"} ></Rowpost>


      {IsYouTubePlayer ? <YoutubePlayer close={closeYouTube} id={YouTubePlayerId} ></YoutubePlayer> : null}


      <div style={{
        position: "fixed",
        bottom: '0%',
        height: '9%',
        width: '100%',
        background: ' linear-gradient(rgb(0, 0, 255, 0),rgba(0, 0, 0))'
      }} ></div>



    </div>
  );
}

export default Home;
