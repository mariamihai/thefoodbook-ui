import './App.css';
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

function App() {
  // Redux in the future
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut (event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

   useEffect(() => {
     /* global google */
     const google = window.google;

     google.accounts.id.initialize({
       client_id: `${process.env.REACT_APP_CLIENT_ID}`,
       callback: handleCallbackResponse
     })

     google.accounts.id.renderButton(
         document.getElementById("signInDiv"),
         {theme: "outline", size: "large"}
     );

     google.accounts.id.prompt();
   }, [])

  return (
    <div className="App">
      <div id="signInDiv"></div>

      { Object.keys(user).length != 0 &&
          <button onClick={ (e) => handleSignOut(e) }>Sign Out</button>
      }

      { user &&
          <div>
            <img src={user.picture}/>
            <h3>{user.name}</h3>
          </div>
      }
    </div>
  );
}

export default App;
