import React, { Fragment, useState, useEffect } from "react";
import {link} from 'react-router-dom';
import Chat from "./Chat";

const Group = ({ setAuth }) => {
    const [member_groups, setMemberGroup] = useState([]);
    const [recommended_groups, setRecommendedGroup] = useState([]);
    const [selected_chat, setSelectedChat] = useState("No Chat Selected");
    const [user_id, setUserID] = useState("");

    const getAll = async () => {
        try {
        const response = await fetch("http://localhost:5000/group/", {
            method: "GET",
            headers: { token: localStorage.token },
        });

        //setAuth(true); Not sure if needed
        const parseRes = await response.json();
        const member_groups = JSON.parse(parseRes.member_groups);
        const recommended_groups = JSON.parse(parseRes.recommended_groups);

        setMemberGroup(member_groups);
        setRecommendedGroup(recommended_groups);
        setUserID(parseRes.user_id);
        } catch (err) {
        console.error(err.message);
        }
    };

    useEffect(() => {
        getAll();
      }, []);

    return(
        <Fragment>
            <h1>Member Groups</h1>
            {member_groups.map((group) => (
                <h1 onClick = {() => setSelectedChat(group.group_id)}> {group.group_name} </h1>
            ))}

            <h1>Recommended Groups</h1>
            {recommended_groups.map((group) => (
                <h1>{group.group_name}</h1>
            ))}

            <Chat group_id = {selected_chat} user_id = {user_id} />

        </Fragment>
    );
};

export default Group;
