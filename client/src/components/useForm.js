import { useState, useEffect } from "react";

const useForm = () => {
  const [values, setValues] = useState({
    username: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return { handleChange };
};

export default useForm;
