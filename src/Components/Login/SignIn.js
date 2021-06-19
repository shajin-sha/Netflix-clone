import React, { useState, useContext } from 'react';
import { FireBaseContext } from "../../store/fireBasecontext"
import { useHistory } from "react-router-dom"
import "./SignIn.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export default function SignIn() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ButtonText, setButtonText] = useState("Sign in")

    const [IsLoader, setIsLoader] = useState(false)

    const history = useHistory()

    const { firebase } = useContext(FireBaseContext)


    return (
        <div className="SignIN" >
            <form onSubmit={(e) => {
                setIsLoader(true)
                setButtonText("")
                e.preventDefault()
                firebase.auth().signInWithEmailAndPassword(Email, Password).then(() => {
                }).then(() => {
                    history.push("/")
                    window.location.reload(false); //for updating navbar/show/hide
                }).catch((error) => {
                    alert(error)
                    setIsLoader(false)
                    setButtonText("Sign in")
                })

            }} >
                <div className="SignInContent" >
                    <h3 className="SignInText" >Sign in</h3>
                    <div className="INputs" >
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }} placeholder="Email" className="Input" type="email" />
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} placeholder="Password" className="Input" type="password" />
                    </div>
                    <button  type="submit" className="SignInButton" >
                        {IsLoader ? <Loader
                            type="TailSpin"
                            color="#FFFFFF"
                            height={30}
                            width={30}
                            timeout={300000} //3 secs
                        /> : null}

                        {ButtonText}</button>

                    <p className="newToNeflixSignUp" >New to Netflix? <a href="/signup"> <samp className="SignIn" >Sign up now</samp>  </a> </p>
                </div>
            </form>
        </div>
    )
}
