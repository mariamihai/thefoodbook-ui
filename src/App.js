import './App.css';
import {useEffect} from "react";
import jwt_decode from "jwt-decode";

function App() {

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
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
   }, [])

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  );
}

export default App;
