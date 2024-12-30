import axios from "axios";
import React, { useEffect, useState } from "react";

const Profile = () => {
  let [profileUser, setProfileUser] = useState(null);
  let [githubUser, setGithubUser] = useState(null);

  let userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchAuthUser() {
      let { data } = await axios.get(`http://localhost:5000/users/${userId}`);
      // console.log(data)
      setProfileUser(data);
    }
    fetchAuthUser();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      let { data } = await axios.get(`https://api.github.com/users`);
    //   console.log(data);
      setGithubUser(data);
    }
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome {profileUser?.userName}</h1>
      {
        githubUser?.map((user) => {
            let {login, avatar_url, html_url, type, id} = user
            return (
                <section key={id}>
                    <h1>{login}</h1>
                    <img src={avatar_url} height={200} width={200}/>
                    <p>
                        <a href={html_url}>View More...</a>
                    </p>
                    <h3>{type}</h3>
                </section>
            )
        })
      }
    </div>
  );
};

export default Profile;
