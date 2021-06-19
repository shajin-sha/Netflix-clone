import React, { useContext, useState, useEffect } from 'react'
import "./Mylist.css"
import { FireBaseContext } from "../../store/fireBasecontext"
import MyListContent from "./MylistMovie/MylistMovie"
import YouTube from "../../Components/YouTubePlayer/youtubeplayer"

export default function MyList() {
    const { firebase } = useContext(FireBaseContext)
    const [Movies, setMovies] = useState([])
    const [IsOpenYouTube, setIsOpenYouTube] = useState(false)
    const [YouTubeKey, setYouTubeKey] = useState('')
    function del(title) {

        

  
        const userName = localStorage.getItem("userName")
        console.log(title)
        firebase.firestore().collection(userName).doc(title).delete().then(() => {
            console.log("Document successfully deleted!");

        }).catch((error) => {
            console.error("Error removing document: ", error);
        });


        calldata()

    }


    useEffect(() => {
        calldata()
    }, [])


    function calldata(){

        const userName = localStorage.getItem("userName")
        firebase.firestore().collection(userName).get().then((snapshot) => {
            const Movies = snapshot.docs.map((userName) => {

                return {
                    ...userName.data()
                }
            })
            console.log(Movies)
            setMovies(Movies)
            if (Movies.length === 0) {
                alert("no aaded movies")
            }
        })

    }







    function OpenYouTube(youTubeKey) {
        if (youTubeKey !== "") {
            setIsOpenYouTube(true)
            console.log(youTubeKey)
            setYouTubeKey(youTubeKey)
        }
        else {
            alert("video 404 error")
        }


    }
    function CloseYouTube() {
        setIsOpenYouTube(false)
    }


    return (
        <div className="MyList">
            { IsOpenYouTube && <YouTube id={YouTubeKey} close={CloseYouTube} ></YouTube>}

            {Movies.map((obj) => {
                return (
                    <MyListContent
                        openYouTube={OpenYouTube}
                        ImgUrl={obj.ImgUrl}
                        youTubeKey={obj.youTubeKey}
                        description={obj.description}
                        title={obj.title}
                        del={del}

                    ></MyListContent>
                )
            })}


        </div>
    )
}
