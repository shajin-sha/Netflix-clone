import React, { Fragment, useEffect, useState, useContext } from 'react';
import './Banner.css';
import axios from "../../axios";
import { API_KEY, imageUrl } from "../../const/constants.js";
import PlayTrending from "./Trendingplayer/PlayTrending";
import { FireBaseContext, AuthContext } from "../../store/fireBasecontext"
import { FaPlay } from "react-icons/fa"
import { GoPlus } from "react-icons/go"


function Banner() {
    const [Movie, setMovie] = useState('')
    const [Trending, setTrending] = useState(null)
    const [PlayTrendingId, setPlayTrendingId] = useState("")
    const [PlayTrendingKey, setPlayTrendingKey] = useState("")
    const [OpenTrending, setOpenTrending] = useState(false)
    const { firebase } = useContext(FireBaseContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`).then((Response) => {
            let number = Math.floor((Math.random() * 20) + 0);
            setMovie(Response.data.results[number])
            setTrending(number + 1)
            setPlayTrendingId(Response.data.results[number].id)
            console.log(Response.data.results[number].id)

        }).then(() => {

            axios.get(`https://api.themoviedb.org/3/movie/${PlayTrendingId}/videos?api_key=${API_KEY}&language=en-US`).then(Response => {
                if (Response.data !== null) {
                    console.log(Response.data.results)
                    JSON.stringify(localStorage.setItem("YouTubeKey0", Response.data.results[0].key))     //using localStorage instead of state not using state because of unknown bug (not updating state )
                }
                else {
                    alert("404 error")
                }
            })
        })
    }, [])
    const date = new Date()
    return (
        <Fragment>
            <div
                style={{
                    backgroundImage: "url(" + imageUrl + Movie.backdrop_path + ")"
                }}
                className="Banner--div" >
                <div
                    className="content">
                    <h1
                        className="title"
                    >{Movie.title}</h1>
                </div>
                {OpenTrending ? <PlayTrending PlayTrendingKey={PlayTrendingKey} ></PlayTrending> : null}
                <div
                    className="banner-buttons">
                    <button onClick={() => {
                        axios.get(`https://api.themoviedb.org/3/movie/${PlayTrendingId}/videos?api_key=${API_KEY}&language=en-US`).then(Response => {
                            if (Response.data !== null) {
                                console.log(Response.data.results)
                                JSON.stringify(localStorage.setItem("YouTubeKey0", Response.data.results[0].key))     //using localStorage instead of state not using state because of unknown bug (not updating state )

                            }
                            else {
                                alert("404 error")
                            }

                        })

                        setPlayTrendingKey(localStorage.getItem("YouTubeKey0"))   //using localStorage instead of state not using state because of unknown bug (not updating state )
                        setOpenTrending(true)

                    }}
                        className="button"
                    >
                        <FaPlay style={{
                            position: 'relative',
                            left: '-20%',
                            marginBottom: '2%',
                        }}
                            size={17} color="#fffff" />
                        Play</button>
                    <button onClick={() => {

                        axios.get(`https://api.themoviedb.org/3/movie/${PlayTrendingId}/videos?api_key=${API_KEY}&language=en-US`).then(Response => {
                            if (Response.data !== null) {
                                console.log(Response.data)
                                console.log(Response.data.results[0].key)
                                JSON.stringify(localStorage.setItem("YouTubeKey0", Response.data.results[0].key))


                            }
                        })

                        setTimeout(() => {
                            firebase.firestore().collection(user.displayName).doc(Movie.title).set({
                                title: Movie.title,
                                youTubeKey: localStorage.getItem("YouTubeKey0"),
                                description: Movie.overview,
                                ImgUrl: imageUrl + Movie.backdrop_path,
                            })
                        }, 500);

                        // add to notification data

                        firebase.firestore().collection(user.displayName + 'notification').doc(Movie.title).set({
                            title: Movie.title,
                            date: date.toDateString(),

                        })


                    }}
                        className="button"

                    >   <GoPlus style={{
                        position: 'relative',
                        left: '-10%',
                    }}
                        size={24} color="#fffff" />
                        My List</button>
                </div>
                <div
                    className="description--div"
                >
                    <h3
                        className="Part"
                    >{"Trending " + Trending}
                    </h3>
                    <h1
                        className="description"
                    >{Movie.overview}</h1>
                </div>
                <div
                    className="fade_bottom"
                ></div>



            </div>

        </Fragment>

    )
}

export default Banner
