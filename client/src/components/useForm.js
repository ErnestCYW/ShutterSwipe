import { useState, useEffect } from "react";
import axios from "axios";

const useForm = () => {
  const [values, setValues] = useState({
    username: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const { username, description } = values;

  // Doesn't work for some reason...
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleUsername = (e) => {
    setValues({ ...values, username: e.target.value });
  };

  const handleDescription = (e) => {
    setValues({ ...values, description: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("username", username);
    formData.append("description", description);

    try {
      const response = await axios.post("/dashboard/edit", formData, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.token,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return { handleUsername, handleDescription, values, handleSubmit };
};

export default useForm;
