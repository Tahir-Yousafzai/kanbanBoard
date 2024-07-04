function login() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    var users = localStorage.getItem("users");

    if (users) {
        users = JSON.parse(users);
    } else {
        alert("No users found. Please sign up first.");
        return;
    }

    var userFound = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = true;
            break;
        }
    }

    if (userFound) {
        alert("Sign in successful!");
        window.location.href = "index.html"
    } else {
        alert("Incorrect email or password.");
    }

    document.getElementById("signin-email").value = '';
    document.getElementById("signin-password").value = '';
}
