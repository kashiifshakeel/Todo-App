import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  let [allUsers, setAllUsers] = useState(null);
  let [toggle, setToggle] = useState(false)

  useEffect(() => {
    async function fetchAllUsers() {
      let { data } = await axios.get("http://localhost:5000/users");
      console.log(data);
      setAllUsers(data);
    }
    fetchAllUsers();
  }, [toggle]);

  let deleteUser = (id) => {
    console.log("deleted", id)
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        toast.success("User Deleted!");
        // window.location.reload()
        setToggle(!toggle)
      })
      .catch(() => {
        toast.error("Something Went Wrong!");
      });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {allUsers?.map(
        ({ id, userName, userEmail, userPassword, userPhoneNumber }) => {
          return (
            <section key={id}>
              <h3>Name: {userName}</h3>
              <p>Email: {userEmail}</p>
              <p>Password: {userPassword}</p>
              <p>Phone Number: {userPhoneNumber}</p>
              <button>Update</button>
              <button onClick={() => deleteUser(id)}>Delete</button>
            </section>
          );
        }
      )}
    </div>
  );
};

export default Admin;
