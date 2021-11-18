const AuthController = require("../controllers/auth.controller")


module.exports = app => {
    // Create New User
    app.post("/api/auth/register", AuthController.createNewUser);

    // Login
    app.post("/api/auth/login", AuthController.loginExistingUser);

}