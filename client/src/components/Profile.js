import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Trait from "./Trait";

const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pic_repo, setPicRepo] = useState([]);
  const [traits, setTraits] = useState([]);
  const [description, setDescription] = useState("");

  const { input_username } = useParams();

  const getAll = async () => {
    try {
      console.log(input_username);

      const response = await fetch(
        `http://localhost:5000/profile/${input_username}`,
        {
          method: "GET",
        }
      );

      const parseRes = await response.json();
      const pic_repo = JSON.parse(parseRes.pic_repo);
      const traits = JSON.parse(parseRes.traits);

      setTraits(traits);
      setPicRepo(pic_repo);
      setName(parseRes.user_name);
      setUsername(parseRes.username);

      if (Object.keys(parseRes.description).length !== 0) {
        setDescription(parseRes.description);
      }

      console.log(parseRes.description);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div class="dashboard">
      <div class="row">
        <nav
          id="sidebarMenu"
          class="col-md-3 d-md-block sidebar collapse position-fixed"
        >
          <hr></hr>
          <row>
            <h3> {username} </h3>
            {name}
          </row>
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <p>
                <span className="fw-bold">Bio:</span> {description}
              </p>

              <hr></hr>

              {/* Traits in side navbar */}
              <li class="nav-item">
                <button
                  id="dropdown"
                  class="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#traits-collapse"
                  aria-expanded="false"
                >
                  Traits{" "}
                </button>
                <div class="collapse" id="traits-collapse">
                  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {traits.map((trait) => (
                      <tr id="user-trait" key={trait.trait_id}>
                        <td>
                          <span className="border border-secondary rounded-pill">
                            {trait.trait_name}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <body class="col-md-9 ms-sm-auto px-md-4">
          <div className="container-fluid">
            <div className="row gx-3 gy-4">
              {pic_repo.map((pic) => (
                <div
                  key={pic.pic_id}
                  id="photograph"
                  className="align-self-center col-sm-4"
                >
                  <Post pic_id={pic.pic_id} />
                </div>
              ))}
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};

export default Profile;
