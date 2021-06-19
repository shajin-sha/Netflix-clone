import './App.css';
import React, { useEffect, useContext, Fragment, useState } from "react";
import Home from "../src/Components/Home/Home"
import { AuthContext, FireBaseContext } from "./store/fireBasecontext"
import { BrowserRouter as Router, Route } from "react-router-dom"
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import MyList from "./Components/Mylist/MyList"
import NavBar from "./Components/NavBar/NavBar"
import Search from "./Components/search-movies/search-movies"
import Notification from "./Components/Notification/Notification"
import TvShow from "./Components/TvShows/TvShows"

function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FireBaseContext)
  const [CurrentUrl, setCurrentUrl] = useState("")
  let [OpenSearch, setOpenSearch] = useState(false)
  let [OpenNotification, setOpenNotification] = useState(false)


  useEffect(() => {
    setCurrentUrl(window.location.pathname)
    console.log(CurrentUrl)

    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      if (user) {
        JSON.stringify(localStorage.setItem("userName", user.displayName))
      }

    })

  })


  function openSearch() {
    if (OpenSearch === false)
      setOpenSearch(!OpenSearch)
    else {
      setOpenSearch(!OpenSearch)
    }
  }

  function openNotification() {
    if (OpenNotification == false) {
      setOpenNotification(!OpenNotification)
    }
    else {
      setOpenNotification(!OpenNotification)
    }

  }



  return (
    <Fragment>


      { OpenSearch ?
        <Search></Search> : null
      }

      { OpenNotification ?
        <Notification></Notification> : null
      }

      {
        CurrentUrl === "/" ? <NavBar openNotification={openNotification} openSearch={openSearch} ></NavBar> : null
      }
      {
        CurrentUrl === "/mylist" ? <NavBar openNotification={openNotification} openSearch={openSearch} ></NavBar> : null
      }
      {
        CurrentUrl === "/TvShows" ? <NavBar openNotification={openNotification} openSearch={openSearch} ></NavBar> : null
      }


      <Router>


        <Route path="/Signup" >

          <SignUp></SignUp>

        </Route>

        <Route path="/Signin" >

          <SignIn></SignIn>



        </Route>

        <Route exact path="/" >

          <Home></Home>

        </Route>




        <Route path="/mylist" >

          <MyList></MyList>

        </Route>
        <Route path="/TvShows" >

          <TvShow></TvShow>

        </Route>



      </Router>

    </Fragment>

  )

}

export default App;
