const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res, next) => {
    try {
        const {name,email, mobile, password, profileImage } = req.body;
            
        const isUserExists = await userModel.findOne({
            $or: [
                { email },
                { mobile }
            ]
        });

        if (isUserExists) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 12);

        const user = await userModel.create({
            name,
            email,
            mobile,
            password: hash,
            profileImage
        });

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60 * 1000
        });

        const userObject = user.toObject();
        delete userObject.password;

        return res.status(201).json({
            message: "User registration successful",
            user: userObject
        });

    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    const { email, password, mobile } = req.body;

    try {
        const query = email ? { email } : { mobile };

        const user = await userModel
            .findOne(query)
            .select("+password");

        // console.log(user);

        if (!user) {
            return res.status(401).json({
                message: " Invalid email/mobile or password"
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: " Invalid email/mobile or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User login successfully!"
        });

    } catch (err) {
        next(err);
    }
};


const getMeController = async(req,res)=>{
    try{
        const user = await userModel
        .findById(req.user.id)
        .select("name email mobile profileImage isEmailVerified isMobileVerified") ;

        res.status(200).json({
            message:"user fetched success !",
            user: {
                     id: user._id,
                     name: user.name,
                     email: user.email,
                     mobile: user.mobile,
                     profileImage: user.profileImage,
                     isEmailVerified: user.isEmailVerified,
                     isMobileVerified: user.isMobileVerified,
                     createdAt: user.createdAt
                   }
                    })

    }catch(error){
        next(error);
    }
   
}



   
module.exports = {
    registerController,
    loginController,
    getMeController
};