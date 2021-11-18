const User = require("../models/User.model");
const bcrypt = require("bcrypt");
// Create User
// Need async for asynchronos behavior
// and await to wait while encypting password 
module.exports.createNewUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hashed Password

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })
        .then(newUser => res.json({ results: newUser }))
        .catch(err => res.json({ message: "Something went wrong while creating a new User", err: err }))
}
// Might have to save user manually in db

// Login 
module.exports.loginExistingUser = async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if (!user) {
            response.status(404).json("user not found");
        }
        else {
            const validPassword = await bcrypt.compare(request.body.password, user.password)
            console.log("body pw ", request.body.password, "user pw", user.password)
            console.log(validPassword)
            if (!validPassword) {
                response.status(400).json("wrong password")
            }
            else {

                response.status(200).json(user)
            }
        }
    } catch (err) {
        response.status(500).json(err)
    }
};
