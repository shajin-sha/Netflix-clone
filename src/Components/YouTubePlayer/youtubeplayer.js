import React,{Fragment} from 'react';
import YouTube from "react-youtube";
import "./YouTubePlayer.css";
import close_icon from "./X.png"
import Logo from "./Netfilx.png"

export default function YoutubePlayer(props) {

    
    
    const opts = {
        height: '300',
        width: '100%',
        
        playerVars: {
          autoplay: 1,
          controls:1,
          rel:0,
          showinf:0,
    
        },
      };
    return (
        <Fragment>
        <div className="div_palyer" style={{
            height:'50%',
            width:'98%',
            borderRadius:"4px",
            position:'fixed',
            top:0,
            left:0,
            right:0,
            bottom:0,
            margin:"auto",
            paddingTop:"6%",

        }} >
            <YouTube className={"video"} videoId={props.id} opts={opts}/>

            <img src={Logo} className="netLogo" alt="icon" />
        <img onClick={props.close} className="close_icon" src={close_icon} alt=""/>


        </div>

   

        </Fragment>
        
        
    )
}
