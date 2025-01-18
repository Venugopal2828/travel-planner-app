import { useState, useEffect } from "react";
import axios from "axios";

function LoginTable() {
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/gettravel")
      .then(response => {
        setLoginData(response.data);
      })
      .catch(error => {
        console.error("Error fetching login data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Login Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {loginData.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoginTable;
