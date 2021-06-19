import React from 'react'
import ReactYouTube from "react-youtube"
import "./YouTube.css"
import close_icon from "./X.png"

import Logo from "./NetflixLogo.png"


export default function YouTube(props) {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="divofReact_YouTube" >

      <ReactYouTube className="YouTubeVi" videoId={props.id} opts={opts} />
      <img onClick={props.close} className="close_icon" src={close_icon} alt="icon" />
      <img src={Logo} className="netLogo" alt="icon" />
    </div>

  )
}


