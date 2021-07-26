import React, { useState } from "react";
import { Link } from "react-router-dom";
import DiscoverNavbar from "./navbar/Discover_Navbar";

const Discover = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/discover/?name=${name}`
      );

      const parseResponse = await response.json();

      setUsers(parseResponse.matched_users);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="discover">
      <DiscoverNavbar setAuth={setAuth} />
      <div style={{ paddingTop: "30px" }}></div>
      <div className="container-md border rounded ">
        <h1>All Users</h1>
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Enter user ..."
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-success">Submit</button>
        </form>

        <table className="table my-5">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>
                  <Link
                    to={`profile/${user.username}`}
                    className="btn btn-primary"
                    style={{ marginLeft: "10px" }}
                  >
                    Visit
                  </Link>
                  <strong style={{ marginLeft: "8px" }}>
                    @{user.username}
                  </strong>
                  <span className="text-muted" style={{ marginLeft: "8px" }}>
                    {user.user_name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p>No Results Found</p>}

        <hr></hr>
      </div>
    </div>
  );
};

export default Discover;
