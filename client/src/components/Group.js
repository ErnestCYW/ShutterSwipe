import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Trait_Options from "./Trait_Options";
import Chat from "./Chat";
import { Button, Modal } from "react-bootstrap";

const Group = ({ setAuth }) => {
  const [searched_groups, setSearchedGroup] = useState("");
  const [matched_groups, setMatchedGroup] = useState([]);
  const [member_groups, setMemberGroup] = useState([]);
  const [recommended_groups, setRecommendedGroup] = useState([]);
  const [inputs, setInputs] = useState({
    group_name: "",
    group_trait: "",
  });
  const [selected_chat, setSelectedChat] = useState({
    group_name: "No Chat Selected",
    group_id: "",
    chat_history: [],
  });
  const [user_info, setUserInfo] = useState({
    user_name: "",
    user_id: "",
  });
  const [show, setShow] = useState(false);

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
        user_id: parseRes.user_id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/group/search/?searched_groups=${searched_groups}`
      );
      const parseResponse = await response.json();

      setMatchedGroup(parseResponse.matched_groups);
      handleShow();
    } catch (err) {
      console.error(err.message);
    }
  };

  const joinGroup = async (group_id, e) => {
    e.preventDefault();
    console.log("Join Group Clicked");
    const join = await fetch(`http://localhost:5000/group/join/${group_id}`, {
      method: "POST",
      headers: {
        user_id: user_info.user_id,
      },
    });

    const parseRes = await join.json();

    if (parseRes.joined === true) {
      toast.success("Joined Group!");
      const updatedMemberGroups = JSON.parse(parseRes.updatedMemberGroups);
      setMemberGroup(updatedMemberGroups);
    } else {
      toast.warning("Failed to join group");
    }

    // toast.success("Joined Group!");
    // console.log(member_groups);
    // if (console.log(join.json);
  };

  const { group_name, group_trait } = inputs;

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

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

      if (selected_chat.group_id === group_id) {
        setSelectedChat({
          group_name: "No Chat Selected",
          group_id: "",
          chat_history: [],
        });
      }
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

      if (selected_chat.group_id === group_id) {
        setSelectedChat({
          group_name: "No Chat Selected",
          group_id: "",
          chat_history: [],
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="groups">
      <div className="searchContainer justify-content-center d-flex p-3 shadow">
        <form
          className="p-3 d-flex w-75 bg-transparent"
          onSubmit={onSubmitSearch}
          data-bs-toggle="modal"
        >
          <input
            type="text"
            name="name"
            placeholder="Search for groups..."
            className="form-control"
            value={searched_groups}
            onChange={(e) => setSearchedGroup(e.target.value)}
          />
          <button className="btn d-flex btn-transparent ms-3 bg-white">
            Search
            <i
              className="bi bi-search ms-2"
              style={{ "font-size": "18px", color: "black" }}
            />
          </button>
          <button
            type="button"
            className="btn d-flex btn-transparent ms-3 bg-white"
            data-bs-toggle="modal"
            data-bs-target="#createGroupModal"
          >
            Create
            <i
              className="bi bi-plus-circle ms-2"
              style={{ "font-size": "18px", color: "black" }}
            />
          </button>
        </form>
      </div>

      <Modal size="lg" show={show} onHide={handleClose} scollable="true">
        <Modal.Header>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {matched_groups.length === 0 ? (
            <div className="display-6">No Results Found</div>
          ) : (
            <table className="table my-5">
              <thead>
                <tr>
                  <th>Group Name</th>
                </tr>
              </thead>
              <tbody>
                {matched_groups.map((group) => (
                  <tr key={group.group_id}>
                    <td
                      className="d-flex justify-content-between"
                      onClick={(e) => joinGroup(group.group_id, e)}
                    >
                      {" "}
                      {group.group_name}
                      <Button variant="secondary" onClick={handleClose}>
                        <i
                          className="bi bi-person-plus-fill"
                          style={{ "font-size": "18px", color: "white" }}
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="modal fade"
        id="createGroupModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Group
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="createGroupForm" onSubmit={handleSubmit}>
                <div className="m-3 d-flex justify-content-between">
                  <label>
                    <h4>Group Name: </h4>
                  </label>
                  <input
                    type="text"
                    size="40"
                    onChange={handleGroupChange}
                    style={{ "font-size": "25px" }}
                  />
                </div>
                <div className="m-3 d-flex justify-content-between">
                  <label>
                    <h4>Group Traits: </h4>
                  </label>
                  <input
                    name="trait"
                    list="datalistOptions"
                    size="40"
                    onChange={handleGroupTraitChange}
                    style={{ "font-size": "25px" }}
                    placeholder="Search for traits ..."
                  />
                  <datalist
                    id="datalistOptions"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    {Trait_Options.map((trait) => {
                      return <option value={trait}></option>;
                    })}
                  </datalist>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                form="createGroupForm"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <div className="bg-light d-flex flex-column shadow">
          <div className="card">
            <div className="cardHeader display-6 mx-4 my-1">Member Groups</div>
            <ul className="list-group list-group-flush">
              {member_groups.map((group) => (
                <li
                  className="list-group-item d-flex justify-content-between my-2"
                  key={group.group_id}
                  onClick={() => setSelectedChat(group)}
                >
                  <h4 className="ms-2"> {group.group_name} </h4>
                  <div>
                    <td>
                      <button
                        className="mx-2 btn btn-orange"
                        onClick={() => leaveGroup(group.group_id)}
                      >
                        {" "}
                        <i
                          className="bi bi-box-arrow-left m-2"
                          style={{ "font-size": "15px", color: "black" }}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-teal"
                        onClick={() => deleteGroup(group.group_id)}
                      >
                        {" "}
                        <i
                          className="bi bi-trash m-2"
                          style={{ "font-size": "15px", color: "black" }}
                        />
                      </button>
                    </td>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="cardHeader display-6 mx-4 my-1">
              Recommended Groups
            </div>
            <ul className="list-group list-group-flush">
              {recommended_groups.map((group) => (
                <h3>{group.group_name}</h3>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-flex chatContainer w-100">
          {selected_chat.group_id !== "" ? (
            <Chat
              selected_chat={selected_chat}
              user_info={user_info}
            />
          ) : (
            <div className="noChatSelected d-flex justify-content-center align-items-center w-100 display-1">
              {" "}
              Select a chat to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Group;
