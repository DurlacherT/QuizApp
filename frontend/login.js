
  
    // Make an HTTP PUT Request
function deleteUser() {
    const deleteUser = {
        name: document.getElementById("username").value,
      };
        const response = fetch('http://localhost:8000/api/users/:name', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(deleteUser),

        });
  
        // Awaiting for the resource to be deleted
        console.log("1 record deleted");

        // Return response data 
    }


    function updateUser() {
        const updateUser = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          };
        const response = fetch('http://localhost:8000/api/users/2', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateUser),
        });
  
        // Awaiting for the resource to be deleted
        console.log("record updated");

        // Return response data 
    }

    function loginUser() {
        const newUser = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          };
        const response = fetch('http://localhost:8000/api/users/authenticate', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser),
        })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
}); 
    }

    //Use POST to send user data to api
    function createUser() {
        const newUser = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          };
        fetch('http://localhost:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
        }); 
    }


    
    //Use POST to send user data to api
    function logoutUser() {

        fetch('http://localhost:8000/api/users/logout', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
        }); 
    }
