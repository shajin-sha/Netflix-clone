import React, { useEffect, useState } from 'react'
import "./TvShows.css"
import { Tv } from "../../urls"
import axios from "axios";
import { imageUrl } from '../../const/constants';


export default function TvShows() {
    const [TvBanner, setTvBanner] = useState([])


    useEffect(() => {
        axios.get(Tv).then(response => {
            console.log(response.data.results)
            setTvBanner(response.data.results)
        })
    }, [])


    return (
        <div className="TvShows" >

            {TvBanner.map((obj) => {
                return (
                    <div style={{
                        backgroundImage: `url(${imageUrl}${obj.backdrop_path})`
                    }}
                        className="tvShowBanner">
                        <div
                            className='tvShowInFo' >
                            <h1
                                className='tvShowBanner-title'
                            >{obj.name}</h1>
                            <p className="tvShowBanner-description"
                            >{obj.overview}</p>
                        </div>

                    </div>
                )
            })}



        </div>
    )
}
