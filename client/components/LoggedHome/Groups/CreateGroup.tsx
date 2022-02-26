import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "urql";

function CreateGroup({ setPopupSection }) {
  const [characterCount, setCharacterCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const node = useRef(null);

  const handleSubmit = (e) => {};

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (node.current && !node.current.contains(e.target)) {
        setPopupSection("");
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setPopupSection]);

  return <></>;
}

export default CreateGroup;
