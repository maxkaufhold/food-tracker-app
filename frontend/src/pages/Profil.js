import React from "react";
import axios from "axios";
import { API_URL } from '../Constants';
import useUser from "../useUser";


function Profil() {
  const { user } = useUser();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${API_URL}/api/data/profil?user_id=${user.user_id}`).then((response) => {
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