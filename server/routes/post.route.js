//CREATE NEW PRODUCT
const PostController = require("../controllers/post.controller")

module.exports = app => {
    // Create New Post
    app.post("/api/posts/new/", PostController.createNewPost);

    // Read all Posts
    app.get("/api/posts", PostController.readAllPosts);

    // Get One Post
    app.get("/api/posts/:id", PostController.getOnePost);

    // Update Post
    app.put("/api/posts/update/:id", PostController.updatePost);

    // Delete User
    app.delete("/api/posts/delete/:id", PostController.deletePost);
    
    // Like / Dislike Post
    app.put("/api/posts/like/dislike/:id", PostController.likeToggle);

    // Get A users Cummulative Posts
    app.get("/api/posts/allposts/:username", PostController.usersAllPosts);

    // Timeline
    app.get("/api/posts/timeline/:id", PostController.timeline);

}