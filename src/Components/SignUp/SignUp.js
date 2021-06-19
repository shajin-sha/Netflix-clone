import React, { useState, useContext } from 'react'
import { FireBaseContext } from "../../store/fireBasecontext"
import { useHistory } from "react-router-dom"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


export default function SignUp() {
    let [Email, setEmail] = useState("")
    let [Password, setPassword] = useState("")
    let [UserName, setUserName] = useState("")
    let [IsLoader, setIsLoader] = useState(false)
    const [ButtonText, setButtonText] = useState("Sign up")
    const history = useHistory()
    const { firebase } = useContext(FireBaseContext)

    return (
        <div className="SignIN" >
            <form onSubmit={(e) => {
                e.preventDefault()
                setIsLoader(true)
                setButtonText("")

                // random number for adding with user displayName

                const random = Math.floor((Math.random() * 10000) + 4000);

                // add user to firebase (auth) then add user data to fireStore (id,UserName,password) then push to sign page

                firebase.auth().createUserWithEmailAndPassword(Email, Password).then((result) => {
                    result.user.updateProfile({ displayName: UserName + random }).then(() => {
                        firebase.firestore().collection('users').add({
                            id: result.user.uid,
                            UserName: UserName + random,
                            Password: Password,
                        }).then(() => {
                            JSON.stringify(localStorage.setItem("userName", UserName + random))  // adding user name to localStorage so we can get this any time we want (no need to wait for firebase but we have firebase too:))
                            history.push("/signin")
                        }).catch((error) => {
                            console.log(error)
                            setIsLoader(false)
                            setButtonText("Sign Up")
                        })
                    })
                })
            }} >
                <div
                    className="SignInContent" >
                    <h3
                        className="SignInText" >Sign Up</h3>
                    <div style={{
                        bottom: "8%",
                    }}
                        className="INputs" >
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                            placeholder="Email"
                            className="Input"
                            type="email" />
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                            placeholder="Password"
                            className="Input"
                            type="password" />

                        <input onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                            placeholder="User name"
                            className="Input"
                            type="text" />
                    </div>
                    <button style={{
                        bottom: '10%',
                    }}
                        type="submit"
                        className="SignInButton" >
                        {IsLoader ? <Loader
                            type="TailSpin"
                            color="#FFFFFF"
                            height={30}
                            width={30}
                            timeout={3000}
                        /> : null}
                        {ButtonText}</button>

                    <p
                        className="newToNeflixSignUp" >Have an account in Netflix? <a
                            href="/signin"> <samp
                                className="SignIn" >login now</samp> </a>  </p>
                </div>
            </form>
        </div>
    )
}
