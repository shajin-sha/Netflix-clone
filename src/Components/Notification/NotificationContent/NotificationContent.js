import React from 'react'
import "./NotificationContent.css"
import { GrFormCheckmark } from "react-icons/gr"
export default function NotificationContent(props) {
    return (
        <div className="NotificationContent" >
            <h3 className="NotificationContentHeder" >{`✔ ${props.title} Added Successfully`}</h3>
            <h2 className="NotificationContentTitle" >{"🍿" + props.title}</h2>
            <p className="NotificationContentDate" >{props.date}</p>

            <button className="MarkAsReadNotificationContent" onClick={() => {
                props.markAsRead(props.title)
            }} >
                <GrFormCheckmark size={25} color="#fffff" />
            </button>
        </div>
    )
}
