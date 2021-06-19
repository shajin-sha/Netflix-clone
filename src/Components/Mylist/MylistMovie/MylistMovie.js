import React from 'react'
import "./MylistMovie.css"

export default function MyListMovie(props) {
    return (
        <div  style={{
            backgroundImage: `url(${props.ImgUrl})`,
        }} className="MyListContent" >

            <div className='MyListContent-img-fade'>
                <div className="contentTitleAndDescription" >

                    <h1 className="MyListContent-title" >{props.title}</h1>
                    <p>{props.description}</p>
                </div>

                <div className="MyListContent-buttons" >
                    <button onClick={() => {
                        props.openYouTube(props.youTubeKey)
                        // console.log(props.youTubeKey)
                    }} >Play</button>
                    <button style={{
                        background:'#f8f5f56b',

                    }} onClick={() => {
                        props.del(props.title)
                    }} >Delete</button>
                   
                </div>


            </div>
        </div>
    )
}
