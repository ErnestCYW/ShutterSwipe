import React, { useState } from "react";

const Discover = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/discover/?name=${name}`
      );

      const parseResponse = await response.json();

      setUsers(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
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
              <td>{user.user_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Discover;
