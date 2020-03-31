var expectedUsername = "josh";
var expectedPassword = "supersecure12";

window.addEventListener('load', function() {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username == expectedUsername && password == expectedPassword) {
            alert("success!");
        } else {
            alert("GTFO of here!!!");
        }
    });
});