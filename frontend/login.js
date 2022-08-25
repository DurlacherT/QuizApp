const currentUser = 'Anonymous'



// Make a HTTP DELETE request
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

    // Make a HTTP PUT request
    function updateUser() {
        const updateUser = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          };
        const response = fetch('http://localhost:8000/api/users/', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateUser),
        });
        console.log("record updated");
    }

    // Make a HTTP POST request
    function loginUser() {
        const newUser = {
            name: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          };

          currentUser = document.getElementById("username").value;
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

    // Make a HTTP POST request
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

    // Make a HTTP GET request
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



    //export default  currentUser;
