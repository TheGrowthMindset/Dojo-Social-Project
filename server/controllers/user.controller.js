const User = require("../models/User.model");



// Read All Users
module.exports.readAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json({ results: allUsers }))
        .catch(err => res.json({ message: "Something went wrong while showing all  Users", err: err }))
}


//Read One User

module.exports.readOneUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(oneUser => response.json({ results: oneUser }))
        .catch(error => response.json({ message: "Something went wrong while showing one User", error: error }))
}
// params the _id is related to the db while the .id is related to the routes. 
// 



//Update User
module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body)
        .then(updatedUser => response.json({ results: updatedUser }))
        .catch(error => response.json({ message: "Something went wrong while updating a User", error: error }))
}


// Delete a User 
module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deletedUser => res.json({ results: deletedUser }))
        .catch(err => res.json({ message: "Something went wrong while deleting a User", err: err }))
}


// Follow A User
module.exports.followUser = async (request, response) => {
    console.log(request.body)
    if (request.body.id !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.id);
            if (!user.followers.includes(request.body.id)) {
                await user.updateOne({ $push: { followers: request.body.id } });
                await currentUser.updateOne({ $push: { followings: request.params.id } })
                response.status(200).json("user has been followed")
            } else {
                response.status(403).json("you allready follow this user")
            }
        }
        catch (err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json("you cant follow yourself my Duude!");
    }
};


// Unfollow a User
module.exports.unFollowUser = async (request, response) => {
    console.log(request.body)
    if (request.body.id !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.id);
            if (user.followers.includes(request.body.id)) {
                await user.updateOne({ $pull: { followers: request.body.id } });
                await currentUser.updateOne({ $pull: { followings: request.params.id } });
                response.status(200).json("user has been unfollowed");
            } else {
                response.status(403).json("you don't follow this user");
            }
        }
        catch (err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json("you cant unfollow yourself my Duude!");
    }
}

//Get friends

module.exports.allFriends = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend, i) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        response.status(200).json(friendList)
    } catch (err) {
        response.status(500).json(err);
    }

}

// Login 