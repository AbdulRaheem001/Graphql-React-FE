import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import client from "../apollo";
import { useSelector } from "react-redux";
import Navebar from "./Navebar";
const CREATE_TODO_MUTATION = gql`
  mutation creattodo(
    $email: String!
    $title: String!
    $description: String
    $completed: Boolean
    $completedOn: String
    $urgency: String
  ) {
    creattodo(
      email: $email
      title: $title
      description: $description
      completed: $completed
      completedOn: $completedOn
      urgency: $urgency
    ) {
      title
    }
  }
`;

function CreateTodo() {
  const navigation=useNavigate();
  const data = useSelector((state) => {
    return state.users;
  });
  const [todoData, setTodoData] = useState({
    email: data.email,
    title: "",
    description: "",
    completed: false,
    completedOn: "",
    urgency: "normal",
  });

  const [creattodo] = useMutation(CREATE_TODO_MUTATION, { client });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTodoData({ ...todoData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(todoData);
    try {
      const { data } = await creattodo({ variables: todoData });
      console.log("Todo created:", data.createTodo);
      navigation("/todoHome");
      // Optionally, you can reset the form or navigate to a different page.
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <>
      <Navebar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Create Todo</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={todoData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="description"
              value={todoData.description}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Completed:</label>
            <input
              type="checkbox"
              name="completed"
              checked={todoData.completed}
              onChange={() =>
                setTodoData({ ...todoData, completed: !todoData.completed })
              }
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Completed On (Date):</label>
            <input
              type="date"
              name="completedOn"
              value={todoData.completedOn}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Urgency:</label>
            <select
              name="urgency"
              value={todoData.urgency}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
const styles = {
  container: {
    maxWidth: "400px",
    margin: "3% auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#f9f9f9",
    
  },
  heading: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  buttonContainer: {
    textAlign: "center",
  },
  button: {
    background: "green",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
export default CreateTodo;
