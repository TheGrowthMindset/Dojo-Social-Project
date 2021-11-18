const UserController = require("../controllers/user.controller")
module.exports = app => {

// All Users
app.get("/api/users/", UserController.readAllUsers);

// READ ONE User
app.get("/api/users/:id", UserController.readOneUser);

// Update User
app.put("/api/users/update/:id", UserController.updateUser);

// Delete User
app.delete("/api/users/delete/:id", UserController.deleteUser);

// Follow A User
app.put("/api/users/follow/:id", UserController.followUser);

// Unfollow A User
app.put("/api/users/unfollow/:id", UserController.unFollowUser);

// All Friends
app.get("/api/users/allfriends/:id", UserController.allFriends);
}