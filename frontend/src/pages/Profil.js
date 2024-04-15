import React from "react";
import axios from "axios";
import { API_URL } from '../Constants';


function Profil() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/data/profil').then((response) => {
      setPost(response.data[0]);
    });
  }, []);

  if (!post) return null;
  return (
    <div>
      <h1>Profil</h1>
      <p>Username: {post.username}</p>
    </div>
  );
};

export default Profil;