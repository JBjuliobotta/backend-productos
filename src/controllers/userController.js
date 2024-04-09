const UserModel=require('../models/User');
const bcrypt = require('bcrypt');
const helpers = require('../utils/helpersFunctions');
const jwt = require('jsonwebtoken');

class UserController {

    async CreateNewAdmin(email, password, role) {
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("formato de email invalido")
            }

            if (!helpers.ValidatePassword(password)) throw new Error("formato de password incorrecto");
            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser = new UserModel({
                email: email,
                password: hash,
                role: "Admin"
            });

            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async CreateNewUser(email, password, role) {
        try {
            if (!helpers.ValidateEmail(email)) {
                throw new Error("formato de email invalido")
            }

            if (!helpers.ValidatePassword(password)) throw new Error("formato de password incorrecto");
            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser = new UserModel({
                email: email,
                password: hash,
                role: "User"
            });

            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async DeleteUserById(id){
        try {
            const deletedUser=await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw error
        }
    }

    async Login(req, res) {
        try {
            const body=req.body;

            if (body.email===''||body.email===undefined) {
                throw new Error("debe enciar un email")
            };
            if (body.password===''||body.password===undefined) {
                throw new Error("debe emviar un password")
            };

            const user=await UserModel.findOne({email:body.email});
            //console.log("user-->", JSON.stringify(user));
            if (user===null) {
                return res.status(404).json({message: "email y/o password incorrectos"})
            };

            const compare=await bcrypt.compare(body.password, user.password);

            if (!compare) {
                return res.status(404).json({message: "email y/o password incorrectos"})
            }

            const token=jwt.sign({
                _id:user._id,
                role:user.role,
            }, process.env.SECRET_KEY, {expires: '1D'});

            return res.status(200).json({email:user.email, role:user.role, token:token});

        } catch (error) {
            throw error;
        }
    }

};

module.exports=UserController;