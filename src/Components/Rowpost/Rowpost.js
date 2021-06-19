import React, { Fragment, useEffect, useState, useContext } from 'react';
import "./Rowpost.css";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../const/constants";
import { FireBaseContext, AuthContext } from "../../store/fireBasecontext"
import { GoPlus } from "react-icons/go"


function Rowpost(props) {
    const [Movie, setMovie] = useState([])
    const { firebase } = useContext(FireBaseContext)
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axios.get(props.url).then(response => {
            setMovie(response.data.results)
        })

    }, [])
    const date = new Date()
    return (
        <Fragment>
            <h2 className={"MovieTitle"}  >{props.Name}</h2>
            <div className="row" >
                <div className="posters" >
                    {Movie.map((obj) => {
                        return (
                            <div style={{
                                background: "black",
                                border: "2px",
                            }} >
                                <img onClick={() => {
                                    props.open(obj.id)
                                }} className={props.isSmall ? "small" : "poster"} src={`${imageUrl + obj.backdrop_path}`} alt="poster" />
                                <button className={props.isSmall ? "MyList-row-small" : "MyList-row"} onClick={() => {
                                    axios.get(`https://api.themoviedb.org/3/movie/${obj.id}/videos?api_key=${API_KEY}&language=en-US`).then(Response => {
                                        console.log(Response.data.results)
                                        JSON.stringify(localStorage.setItem("YouTubeKey1", Response.data.results[0].key))     //using localStorage instead of state not using state because of unknown bug (not updating state )
                                    })
                                    setTimeout(() => {
                                        // add to data
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
                                        // update NotificationsCount
                                        const userName = localStorage.getItem("userName")
                                        const userNotificationId = userName + 'notification'
                                        firebase.firestore().collection(userNotificationId).get().then((snapshot) => {
                                            const notification = snapshot.docs.map((userNotificationId) => {
                                                return {
                                                    ...userNotificationId.data()
                                                }
                                            })
                                            JSON.stringify(localStorage.setItem("NotificationsCount", notification.length))
                                        })
                                    }, 500);
                                }} >
                                    <GoPlus />
                                    My List</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>

    )
}
export default Rowpost
