import React, { useContext, useEffect, useState } from 'react'
import './Notification.css'
import NotificationContent from "./NotificationContent/NotificationContent"
import { FireBaseContext} from "../../store/fireBasecontext"


export default function Notification() {
    const { firebase } = useContext(FireBaseContext)
    const [Notifications, setNotifications] = useState([])

    useEffect(() => {
        calldata()
    }, [])


function calldata() {

    const userName = localStorage.getItem("userName")
    const userNotificationId = userName + 'notification'
    firebase.firestore().collection(userNotificationId).get().then((snapshot) => {
        const notification = snapshot.docs.map((userNotificationId) => {
            return {
                ...userNotificationId.data()
            }
        })
        setNotifications(notification)
    })
    
}









    function markAsRead(title){
        console.log(title)
        const userName = localStorage.getItem("userName")
        const userNotificationId = userName + 'notification'
        firebase.firestore().collection(userNotificationId).doc(title).delete();

        calldata()

    }


    return (
        <div className="Notification" >
            {Notifications.map((obj) => {
                return (
                    <NotificationContent markAsRead={markAsRead} title={obj.title} date={obj.date} />
                )
            })}


        </div>
    )
}
