import React, { useState } from 'react';
import { useMutation } from '@apollo/client'; // Use useMutation here
import gql from 'graphql-tag';
import client from '../apollo';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) { 
    login(email: $email, password: $password) { 
      Name
      userType
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, data, error }] = useMutation(LOGIN_MUTATION, { // Use useMutation
    client,
  });

  const handleLogin = () => {
    login({ variables: { email, password } });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {loading && <p>Loading...</p>}
      
      {data && <p>Welcome, {data.login.Name}, you are best {data.login.userType} </p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Login;
