import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoaderAnim() {
    return (
        <div style={{
            position: "fixed",
            height: "100%",
            width: '100%',
            background: 'black',  // change 
            zIndex: 10000,
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
        }} >

            <Loader 
                type='Oval'
                color="#FFFFFF"
                height={50}
                width={50}
                timeout={100000}
            />

        </div>
    )
}
