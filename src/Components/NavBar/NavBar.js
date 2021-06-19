import React, { useState, useContext, Fragment, useEffect } from 'react';
import './NavBar.css';
import NetflixLogo from "./Netfilx.png";
import Avathar from "./Avathar.png";
import find from "./find.svg";
import xLogo from "./X.png"
import { AuthContext, FireBaseContext } from "../../store/fireBasecontext"
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { BsBellFill, } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";



function NavBar(props) {
    let [FndIcon, setFindIcon] = useState(find)
    let [OpenAc, setOpenAc] = useState(false)
    const { firebase } = useContext(FireBaseContext)
    const { user } = useContext(AuthContext)
    const [IsNotification, setIsNotification] = useState(true)



    useEffect(() => {
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

    }, [])




    return (
        <Fragment>
            <div className="NavBar--div" >

                <img className="NetflixLogo--img" src={NetflixLogo} alt="" />
                <div onMouseLeave={() => {
                    setOpenAc(false)
                }} onClick={() => {
                    if (OpenAc === false)
                        setOpenAc(!OpenAc)
                    else {
                        setOpenAc(!OpenAc)
                    }
                }} className="User-ac" >
                    <img className="AvatharLogo--img" src={Avathar} alt="" />
                    <GoChevronDown style={{
                        marginLeft: "3%",
                    }} color="#ffffff" size={18} />
                </div>
                <img onClick={() => {
                    props.openSearch()
                    if (FndIcon === find)
                        setFindIcon(xLogo)
                    else {
                        setFindIcon(find)
                    }

                }} className={"FindLogo--img"} src={FndIcon} alt="" />


                <div onClick={() => {
                    setOpenAc(false)
                }} onMouseLeave={() => {
                    setOpenAc(false)
                }} onMouseMove={() => {
                    setOpenAc(true)
                }} className={OpenAc ? "acDiv" : "acClosed"} >
                    <div>
                        <RiUser3Fill size={30} color="#ffffff" />
                        <h4>{user ? user.displayName : "Hello User"}</h4>
                    </div>
                    <a href="/mylist">
                        <div>
                            <BiListPlus size={30} color="#ffffff" />
                            <h4>My List</h4>
                        </div>
                    </a>
                    <a href="/signin">
                        <div className={user ? null : "hide"} onClick={() => {
                            firebase.auth().signOut().then(() => {
                                localStorage.clear();
                            }).catch((error) => {
                                console.log(error)
                            });

                        }} >
                            <GoChevronRight size={30} color="#ffffff" />
                            <h4>Logout</h4>
                        </div></a>


                </div>


                <div className="links">
                    <a href="/">Home</a>
                    <a href="/TvShows">TV Shows</a>
                    <a href="/mylist">My List</a>
                </div>

                <div onClick={() => {
                    props.openNotification()

                    if (IsNotification === false) {
                        setIsNotification(!IsNotification)
                    }
                    else {
                        setIsNotification(!IsNotification)
                    }




                }} className="bell" >

                    {IsNotification ? <BsBellFill size={20} color="#ffffff" /> : null}
                    {IsNotification === false ? <CgCloseR size={25} color="#ffffff" /> : null}



                    {localStorage.getItem("NotificationsCount") > 0 &&
                        <div className="bellNumber">
                            <p>{localStorage.getItem("NotificationsCount")}</p>
                        </div>}
                </div>




            </div>
        </Fragment>
    )
}



export default NavBar
