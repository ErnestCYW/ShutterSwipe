import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Trait from "./Trait";

const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [pic_repo, setPicRepo] = useState([]);
  const [traits, setTraits] = useState([]);
  const { id } = useParams();

  const getAll = async () => {
    try {
      const response = await fetch(`http://localhost:5000/profile/${id}`, {
        method: "GET",
      });

      const parseRes = await response.json();
      const pic_repo = JSON.parse(parseRes.pic_repo);
      const traits = JSON.parse(parseRes.traits);

      setTraits(traits);
      setPicRepo(pic_repo);
      setName(parseRes.user_name);
      setUsername(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg2 d-md-block sidebar collapse"
      >
        <hr></hr>
        <row>
          <h3> {username} </h3>
          {name}
        </row>
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <p>
              {" "}
              This is a paragraph, for users to add a description of themselves
            </p>
            <li class="nav-item">Another person's profile</li>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
              <div class="collapse" id="traits-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  {traits.map((trait) => (
                    <tr key={trait.trait_id}>
                      <Trait trait_name={trait.trait_name} />
                    </tr>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <body class="col-md-9 ms-sm-auto px-md-4">
        <div className="container">
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
  );
};

export default Profile;
