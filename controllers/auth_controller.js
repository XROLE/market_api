const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { catchAsync } = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRETE_KET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    throw AppError("Invalid user type", 400);
  }

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed to create the user", 400));
  }

  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;
  result.token = generateToken({
    id: result,
  });

  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({ id: result.id });

  return res.json({
    status: "success",
    data: result,
    token,
  });
});

const authentication = catchAsync( async (req, res, next) => {
    let idToken = "";

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        idToken = req.headers.authorization.split(" ")[1];
    }

    if(!idToken) {
        return next(new AppError("Please login to get access", 401));
    }

    const tokenDetails = jwt.verify(idToken, process.env.JWT_SECRETE_KET);


    const freshUser = await user.findByPk(tokenDetails.id["id"]);

    if(!freshUser){
        return next(new AppError("User no longer exist"));
    }

    req.user = freshUser;

    return next();

});

const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        if(!userType.includes(req.user.userType)){
            return next(new AppError("You don't have permission to perform this action", 403));
        }

        return next();
    }
    return checkPermission;
}

module.exports = { signUp, login, authentication, restrictTo };
