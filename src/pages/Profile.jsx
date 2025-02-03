import React from 'react'
import { useLocation } from "react-router-dom";
function Profile() {
    const location = useLocation();
    const data = location.state;
    console.log("data are :: ", data);
    return (
        <div>Profile</div>
    )
}

export default Profile