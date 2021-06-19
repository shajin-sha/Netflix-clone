import React from 'react';
import YouTube from "react-youtube";
import "./TrendingPlyer.css";

export default function PlayTrending(props) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
          rel:0,
          loop:1,
          controls:0,
        },
      };
    return (
        <div className="videoPlyer--div" >
      <YouTube vq="medium "className="videoPlyer" videoId={props.PlayTrendingKey} opts={opts} />;
        </div>
    )
}
