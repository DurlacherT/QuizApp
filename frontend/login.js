/**
 * login.js declares functions which make DELETE, PUT, POST requests (GET is used in mainquiz.js)
 * The functions are called in login.html
 */
 let currentUser = 'Anonymous'
 // Function to make a HTTP DELETE request
 function deleteUser() {
     const deleteUser = {
         name: document.getElementById("username")
             .value
     , };
     const response = fetch('http://localhost:8000/api/users/:name', {
         method: 'DELETE'
         , headers: {
             'Content-type': 'application/json'
         }
         , body: JSON.stringify(deleteUser)
     , });
     console.log("1 record deleted");
     alert(`User ${deleteUser.name} deleted.`);
 }
 // Function to make a HTTP PUT request
 function updateUser() {
     const updateUser = {
         name: document.getElementById("username")
             .value
         , email: document.getElementById("email")
             .value
         , password: document.getElementById("password")
             .value
     , };
     const response = fetch('http://localhost:8000/api/users/:name', {
         method: 'PUT'
         , headers: {
             'Content-type': 'application/json'
         }
         , body: JSON.stringify(updateUser)
     , });
     console.log("record updated");
     alert(`User ${updateUser.name} updated.`);
 }
 // Make a HTTP POST request
 function loginUser() {
     const newUser = {
         name: document.getElementById("username")
             .value
         , email: document.getElementById("email")
             .value
         , password: document.getElementById("password")
             .value
     , };
     currentUser = document.getElementById("username")
         .value;
     fetch('http://localhost:8000/api/users/authenticate', {
         method: 'POST'
         , headers: {
             'Content-type': 'application/json'
         }
         , body: JSON.stringify(newUser)
      }).then(res => {
        console.log("Request complete! response:", res);})
 }
 // Make a HTTP POST request
 function createUser() {
     const newUser = {
         name: document.getElementById("username")
             .value
         , email: document.getElementById("email")
             .value
         , password: document.getElementById("password")
             .value
     , };
     fetch('http://localhost:8000/api/users/', {
             method: 'PATCH'
             , headers: {
                 'Content-type': 'application/json'
             }
             , body: JSON.stringify(newUser)
         , })
         .then((response) => response.json())
         .then((data) => {
             console.log('Success:', data);
         })
         .catch((error) => {
             console.error('Error:', error);
         });
     alert(`New user ${newUser.name} created.`);
 }
 // Make a HTTP POST request
 function logoutUser() {
     const updateUser = {
         name: document.getElementById("username")
             .value
         , email: document.getElementById("email")
             .value
         , password: document.getElementById("password")
             .value
     , };
     fetch('http://localhost:8000/api/users/logout', {
         method: 'POST'
         , headers: {
             'Content-type': 'application/json'
         }
         , body: JSON.stringify(updateUser)
     , })
     alert(`User logged out.`);
 }

 function setCookie() {
    console.log(document.cookie)

    document.session = "name=Alexander; expires=Sat, 20 Jan 1980 12:00:00 UTC";

}
 