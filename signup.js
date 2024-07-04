function signup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Check if any field is empty
    if (!name || !email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    var users = localStorage.getItem("users");

    if (users) {
        users = JSON.parse(users);
    } else {
        users = [];
    }

    var user = {
        name: name,
        email: email,
        password: password
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';

    alert('Signup successful!');
    window.location.href = "LoginForm.html";
}
