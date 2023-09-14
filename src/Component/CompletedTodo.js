import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Navebar from "./Navebar";
import client from "../apollo";
import { useSelector } from "react-redux";
import "../Style/todoHome.css";

const GET_TODOS_BY_EMAIL = gql`
  query GetTodosByEmail($email: String!) {
    todosByEmail(email: $email) {
      title
      description
      completed
      completedOn
      urgency
    }
  }
`;

function CompletedTodo() {
    const reduxData = useSelector((state) => {
        return state.users;
      });
  const [email, setEmail] = useState(reduxData.email);
  const { loading, error, data } = useQuery(GET_TODOS_BY_EMAIL, {
    client,
    variables: { email },
    fetchPolicy: "network-only",
    skip: !email, // Skip the query when email is not set
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch data when the component mounts and email changes
    if (email) {
      client.query({
        query: GET_TODOS_BY_EMAIL,
        variables: { email },
      });
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const filteredTodos = data.todosByEmail.filter((todo) => todo.completed == "true"); 
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.urgency === "urgent" && b.urgency === "normal") return -1;
    if (a.urgency === "normal" && b.urgency === "urgent") return 1;
    return 0;
  });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTodos = sortedTodos.slice(startIndex, endIndex);

  return (
    <>
      <Navebar />
      <div>
        <h1>Your Todos</h1>
        <ul className="todo-list">
          {displayedTodos.map((todo, index) => (
            <li key={index} className="todo-card">
              <div className="todo-header">
                <strong>{todo.title}</strong>
              </div>
              <div className="todo-body">
                <p>{todo.description}</p>
                <p>Urgency: {todo.urgency}</p>
                <p>Status: {todo.completed }</p>
                {todo.completed ? (
                  <p>Completed On: {todo.completedOn}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(sortedTodos.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= sortedTodos.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CompletedTodo;
