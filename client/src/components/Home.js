import React, { Fragment, useState, useEffect, useRef } from "react";

function Main() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [pic_repo, setPicRepo] = useState([]);
  const delay = 6000;

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/home", {
        method: "GET",
      });

      const parseRes = await response.json();
      const pic_repo = JSON.parse(parseRes.pic_repo);
      setPicRepo(pic_repo);
    } catch (err) {
      console.error(err.message);
    }
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === pic_repo.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div>
      <div className="d-flex align-items-center position-relative">
        <div className="slideshow">
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {pic_repo.map((pic, index) => (
              <img
                className="slide"
                key={index}
                src={
                  require(`../../../picture_server/${pic.pic_id}.jpg`).default
                }
              />
            ))}
          </div>
        </div>
        <div className="welcomeMessageBox d-flex align-items-center bg-light rounded-end position-absolute">
          <div className="welcomeMessage">
            <h1>Welcome To ShutterSwipe </h1>
          </div>
        </div>
        <div>
          <ul>
            <li className="ms-2 me-5 my-5">
              <h3>Create</h3>
              <h6>Upload and view photos</h6>
            </li>
            <li className="ms-2 me-5 my-5">
              <h3>Swipe</h3>
              <h6>Rank and get recommended photos you like</h6>
            </li>
            <li className="ms-2 me-5 my-5">
              <h3>Connect</h3>
              <h6>Chat with each other in groups</h6>
            </li>
          </ul>
        </div>
      </div>

      <div className="slideshowDots">
        {pic_repo.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>

      <div class="container-fluid padding fixed-bottom bg-light">
        <div class="row text-center">
          <div class="col-md-4">
            <hr class="light"></hr>
            <p>Timothy Wong</p>
          </div>
          <div class="col-md-4">
            <hr class="light"></hr>
            <p>shutterswipe@gmail.com</p>
          </div>
          <div class="col-md-4">
            <hr class="light"></hr>
            <p>Ernest Chan</p>
          </div>
          <div class="col-12">
            <hr class="light"></hr>
            <h5>&copy; shutterswipe</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
