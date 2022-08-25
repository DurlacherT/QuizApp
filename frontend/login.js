// Make an HTTP DELETE request
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
        console.log("1 record deleted");
    }

    // Make an HTTP PUT request
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

    // Make an HTTP POST request
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

    // Make an HTTP POST request
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

    // Make an HTTP GET request
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
