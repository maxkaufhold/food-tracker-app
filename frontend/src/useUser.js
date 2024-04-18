import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUser() {
  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    return user;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = user => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const removeUser = async () => {
    try {
      const rmUser = user;
      sessionStorage.removeItem('user');
      setUser(null);
      await axios.post("http://localhost:3000/logout", { token: rmUser.token }); // Senden Sie den POST-Request
      window.location.reload(); // Seite automatisch neu laden
    } catch (error) {
      console.error("Fehler beim Logout: " + error.message);
    }
  };

  // Session läuft nach einer halben Stunde ohne Interaktion ab
  useEffect(() => {
    const tokenExpirationTime = 1000 * 60 * 30; // 1/2 Stunde in Millisekunden
    const timeoutId = setTimeout(() => {
      removeUser(); // Rufen Sie removeToken auf, wenn die Zeit abgelaufen ist
    }, tokenExpirationTime);
    
    return () => clearTimeout(timeoutId); // Bereinigen Sie den Timeout beim unmount
  }, [user]); // Führen Sie das useEffect erneut aus, wenn sich der Token ändert

  return {
    setUser: saveUser,
    removeUser,
    user
  };
}
