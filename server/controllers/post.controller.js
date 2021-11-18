const Post = require("../models/Post.model");
const User = require("../models/User.model");

// Create a New Post
module.exports.createNewPost = async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  };

// Read all Post
module.exports.readAllPosts = (req, res) => {
    Post.find()
        .then(allPosts => res.json({ results: allPosts }))
        .catch(err => res.json({ message: "Something went wrong while showing all Posts", err: err }))
}

// Get Post
  module.exports.getOnePost = async(req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //update a post

  module.exports.updatePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Delete Post
  module.exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can't delete something you aint write homie");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

//   Like / Dislike a post 
module.exports.likeToggle = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //Get user's all posts

  module.exports.usersAllPosts = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  };

//Get Timeline Posts
module.exports.timeline = async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.id);
      console.log(currentUser)
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
};
  