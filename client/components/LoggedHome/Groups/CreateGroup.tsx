import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/components/Groups.module.scss";
import { useMutation } from "urql";

const CreateGroupMutation = `
  mutation($options: CreateGroupInput!){
    createGroup(options: $options)
  }
`;

function CreateGroup({ setPopupSection }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [inviteOnly, setInviteOnly] = useState(true);
  const [publicPosts, setPublicPosts] = useState(false);

  const [createResult, create] = useMutation(CreateGroupMutation);

  const node = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    create({
      options: {
        name,
        description: desc,
        inviteOnly,
        publicPosts,
      },
    }).then((res) => {
      if (res.data && res.data.createGroup) {
        setPopupSection("");
      }
    });
  };

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

  return (
    <div className={styles.groupWrapper}>
      <section className={styles.createGroupCard} ref={node}>
        <header className={styles.header}>
          <h3 className={styles.title}>Create a new Group</h3>
          <div className={styles.exit} onClick={() => setPopupSection("")}>
            <div className={styles.exit1}></div>
            <div className={styles.exit2}></div>
          </div>
        </header>
        <form
          action=""
          className={styles.basicSettings}
          onSubmit={handleSubmit}
        >
          <label htmlFor="title" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Provide your group with a name"
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <label htmlFor="desc" className={styles.label}>
            Write a description
          </label>
          <textarea
            name="desc"
            id="desc"
            className={styles.textarea}
            required
            onChange={(e) => {
              setCharacterCount(e.currentTarget.value.length);
              setDesc(e.currentTarget.value);
            }}
          ></textarea>
          <p
            className={styles.count}
            style={characterCount > 500 ? { color: "#cf6679" } : null}
          >
            {characterCount} / 500
          </p>
          <div className={styles.toggleOptions}>
            <label htmlFor="switch" className={styles.label}>
              Invite only?
            </label>
            <div className={styles.toggleContainer}>
              <input
                type="checkbox"
                name="switch"
                id="switch"
                className={styles.switch}
                defaultChecked
                onClick={() => setInviteOnly(!inviteOnly)}
              />
            </div>
          </div>
          <div className={styles.toggleOptions}>
            <label htmlFor="switch" className={styles.label}>
              Public posts?
            </label>
            <div className={styles.toggleContainer}>
              <input
                type="checkbox"
                name="switch"
                id="switch"
                className={styles.switch}
                onClick={() => setPublicPosts(!publicPosts)}
              />
            </div>
          </div>
          <button
            className={styles.btn}
            style={
              characterCount > 500
                ? {
                    background: "transparent",
                    border: "2px solid rgba(255, 255, 255, 0.08)",
                    cursor: "default",
                  }
                : null
            }
            disabled={characterCount > 500}
          >
            {createResult.fetching ? (
              <div className={styles.loader}></div>
            ) : (
              "Create Group"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateGroup;
