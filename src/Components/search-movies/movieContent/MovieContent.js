import React, { useEffect, useState, useContext } from 'react';
import "./MovieContent.css";
import axios from "axios";
import { API_KEY, imageUrl } from "../../../const/constants"
import YouTube from "./Youtube/YouTube"
import { FireBaseContext, AuthContext } from "../../../store/fireBasecontext"


export default function MovieContent(props) {


    function closeYouTube() {
        setOpenYouTube(false)
    }


    const { firebase } = useContext(FireBaseContext)
    const { user } = useContext(AuthContext)
    const [YouTubeId, setYouTubeId] = useState("")
    const [OpenYouTube, setOpenYouTube] = useState(false)
    function openYouTube(id) {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response => {
            if (Response.data.results[0].key !== undefined) {
                if (Response.data.results[0].key !== null) {
                    console.log(Response.data.results[0].key)
                    setYouTubeId(Response.data.results[0].key)
                    JSON.stringify(localStorage.setItem("YouTubeKey1", Response.data.results[0].key))
                }
            }
        })






    }

    const [Movie, setMovie] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.InputSearch}&page=1&include_adult=false`).then(response => {
            setMovie(response.data.results)

        })
    }, [props.InputSearch])




    const date = new Date()

    return (
        <div className="mainContent" >

            {
                OpenYouTube && <YouTube close={closeYouTube} id={YouTubeId} ></YouTube>
            }




            <div className="video" ></div>

            {Movie.map((obj) => {
                return (

                    <div style={{
                        backgroundImage: `Url(${imageUrl}${obj.backdrop_path})`,
                    }} className="MovieContentSearch">
                        <div className="contents" >
                            <h2 className="MovieContentSearch--MovieName" >{obj.title}</h2>
                            <p className="MovieContentSearch--description" >{obj.overview}</p>
                        </div>

                        <div className="buttons--MovieContentSearch">
                            <button onClick={() => {
                                openYouTube(obj.id)
                                setOpenYouTube(true)
                            }} className="button0--MovieContentSearch"  >Play</button>
                            <button onClick={() => {
                                openYouTube(obj.id)
                                firebase.firestore().collection(user.displayName).doc(obj.title).set({
                                    title: obj.title,
                                    youTubeKey: localStorage.getItem("YouTubeKey1"),
                                    description: obj.overview,
                                    ImgUrl: imageUrl + obj.backdrop_path,

                                })




                                // add to notification data

                                firebase.firestore().collection(user.displayName + 'notification').doc(obj.title).set({
                                    title: obj.title,
                                    date: date.toDateString(),

                                })




                            }} className="button1--MovieContentSearch"  >My list</button>





                        </div>
                        <div className="MovieContentSearch-gt" ></div>
                    </div>
                )
            })}


        </div>
    )


}
