const UserModal = require('../model/user-model');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {

    console.log(req.body, req);

    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty.' });
        return;
    }

    const user = new UserModal({
        userId: req.body.userId,
        fname: req.body.fname,
        email: req.body.email,
        password: UserModal.hashPassword(req.body.password)
    });

    // const user = new UserModal(req.body);

    await user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while creating user'
            })
        })
}

exports.login = async (req, res, next) => {
    console.log(req.body, req);

    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty.' });
        return;
    }

    await UserModal.
        findOne({ email: req.body.email }).
        then(user => {
            if (user) {
                if (user.isValid(req.body.password)) {
                    // generate JWT token
                    console.log(user.email);
                    let token = jwt.sign({username:user.email}, 'harsh', {expiresIn: '3h'});
                    console.log(token);
                    return res.status(200).json(token);
                } else {
                    res.status(501).send({
                        message: 'Invalid credentials'
                    })
                }
            } else {
                return res.status(501).send({
                    message: 'User email is not registered'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong while finding user'
            })
        })
}

// middleware that verify JWT
var decodedToken = '';
exports.verifyToken = async (req, res, next) => {
    let token = req.query.token;
    console.log('token::::' + token);
    jwt.verify(token, 'harsh', (err, tokenData) => {
        if(err) {
            return res.status(200).json({message: 'Unauthorized request'});
        }
        if(tokenData) {
            decodedToken = tokenData;
            next();
        }
    })
}

exports.find = async (req, res) => {
    //username is added as a payload to create JWT token
    console.log('verified user:::: ' + JSON.stringify(decodedToken));
    res.status(200).send(decodedToken.username); 
}
 
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty.' });
        return;
    }

    const id = req.params.id;

    await UserModal
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `User with ${id} is not found in database.` })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Something went wrong while updating user having Id: ${id}`
            })
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id;

    await UserModal
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: err.message || `User with id: ${id} is not there in databse` })
            } else {
                res.send({
                    message: 'User is successfully deleted.'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Something went wrong while deleting user having Id: ${id}`
            })
        })
}