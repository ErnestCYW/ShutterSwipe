import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Trait_Options from "./Trait_Options";
import { link } from "react-router-dom";
import Chat from "./Chat";

const Group = ({ setAuth }) => {
  const [member_groups, setMemberGroup] = useState([]);
  const [recommended_groups, setRecommendedGroup] = useState([]);
  const [inputs, setInputs] = useState({
    group_name: "",
    group_trait: "",
  });
  const [selected_chat, setSelectedChat] = useState({
    group_name: "No Chat Selected",
    group_id: "",
    chat_history: "",
  });
  const [user_info, setUserInfo] = useState({
    user_name: "",
    user_id: "",
  });

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
      setUserInfo({
        user_name: parseRes.user_name,
        user_id: parseRes.user_id
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const { group_name, group_trait } = inputs;

  const handleGroupChange = (event) => {
    setInputs({
      ...inputs, //retains previous state I think
      group_name: event.target.value,
    });
  };

  const handleGroupTraitChange = (event) => {
    setInputs({
      ...inputs, //retains previous state I think
      group_trait: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    // alert(`${inputs.group_name} ${inputs.group_trait}`);
    event.preventDefault();

    let formData = new FormData();
    formData.append("group_name", group_name);
    formData.append("group_trait", group_trait);
    console.log(formData.get("group_name"));

    try {
      const response = await axios.post(
        "http://localhost:5000/group/create",
        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.token,
          },
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const leaveGroup = async (group_id) => {
    try {
      const leaveGroup = await fetch(
        `http://localhost:5000/group/leave/${group_id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );

      setMemberGroup(
        member_groups.filter((group) => group.group_id !== group_id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteGroup = async (group_id) => {
    try {
      const deleteGroup = await fetch(
        `http://localhost:5000/group/delete/${group_id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );

      setMemberGroup(
        member_groups.filter((group) => group.group_id !== group_id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createGroupModal"
      >
        Create Group
      </button>

      <div
        class="modal fade"
        id="createGroupModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Group
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="createGroupForm" onSubmit={handleSubmit}>
                <div>
                  <label>Group Name</label>
                  <input type="text" onChange={handleGroupChange} />
                </div>
                <div>
                  <label>Group Traits</label>
                  <input
                    name="trait"
                    list="anrede"
                    onChange={handleGroupTraitChange}
                  />
                  <datalist id="anrede">
                    {Trait_Options.map((trait) => {
                      return <option value={trait}></option>;
                    })}
                  </datalist>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                form="createGroupForm"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>Member Groups</h1>
      {member_groups.map((group) => (
        <tr key={group.group_id}>
          <h3 onClick={() => setSelectedChat(group)}>
            {" "}
            {group.group_name}{" "}
          </h3>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => leaveGroup(group.group_id)}
            >
              {" "}
              Leave Group
            </button>
          </td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => deleteGroup(group.group_id)}
            >
              {" "}
              Delete Group
            </button>
          </td>
        </tr>
      ))}

      <h1>Recommended Groups</h1>
      {recommended_groups.map((group) => (
        <h3>{group.group_name}</h3>
      ))}

      {selected_chat.group_id != "" ? <Chat selected_chat={selected_chat} user_info={user_info} />: null}
    
    </Fragment>
  );
};
export default Group;
