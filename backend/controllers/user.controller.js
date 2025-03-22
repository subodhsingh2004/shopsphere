import { User } from "../models/UserModel.js";
import { sendOTPEmail } from "../services/emailService.js";
import { generateOTP } from "../services/OTPservice.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

let user;

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new Error("something went wrong while generating access and refresh token")
    }
}

const userSignup = asyncHandler(async function (req, res) {
    const { username, password, email } = req.body

    if ([username, password, email].some(field => field === "")) {
        throw new ApiError(403, "All fields are required")
    }

    const isUserExisted = await User.findOne({
        $or: [{ email }]
    })

    if (isUserExisted) {
        throw new ApiError(404, "User already exists")
    }

    // create otp and send to user
    const otp = generateOTP(email)
    await sendOTPEmail(username, otp, email)

    user = new User({
        username,
        email,
        password
    })

    // if (!newUser) {
    //     throw new ApiError(500, "Something went wrong")
    // }

    // const userData = await User.findById(newUser._id).select("-password -refreshToken")

    res.status(200).json({ message: "OTP has been sent to your email" })
})

const userSignupVerification = asyncHandler(async function (req, res) {
    await user.save()

    req.user = user

    // generate token
    const token = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("token", token.accessToken, options)
        .json(loggedInUser)
})

const userLogin = asyncHandler(async function (req, res) {
    const { email, password } = req.body

    if ([email, password].some(field => field === "")) {
        throw new ApiError(403, "All fields are required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "Either email or password is incorrect")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(404, "Password is incorrect")
    }

    // token
    const token = await generateAccessAndRefreshToken(user._id)

    // userdetails to send as response
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("token", token.accessToken, options)
        .json(loggedInUser)
})

// Logout a User
const logoutUser = asyncHandler(async function (req, res) {
    res.clearCookie("token")
    res.status(200).send({ message: "Logged out successfully" })
})

const editUserInfo = asyncHandler(async function (req, res) {
    const { userId, username, phoneNumber, streetAdress, pinCode, city, state } = req.body

    const updateFields = {};

    if (username) updateFields.username = username
    if (phoneNumber) updateFields.phoneNumber = phoneNumber

    if (streetAdress || city || state || pinCode) {
        updateFields.address = {};

        if (streetAdress) updateFields.address.street = streetAdress;
        if (city) updateFields.address.city = city;
        if (state) updateFields.address.state = state;
        if (pinCode) updateFields.address.pinCode = pinCode;
    }

    const updatedUserInfo = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
    )
    if (!updatedUserInfo) throw new ApiError(404, "User not found")

    return res.status(200).json({ message: "Updated successfully", updatedUserInfo })
})

const userOrders = asyncHandler(async function (req, res) {
    const { userId } = req.params
    const userOrders = await User.findById(userId).select("orderHistory -_id")
        .populate("orderHistory.orderedProducts", "name price image")

    if (!userOrders) throw new ApiError(404, "User not found")
    res.status(200).json(userOrders)
})

export { userSignup, userSignupVerification, userLogin, editUserInfo, logoutUser, userOrders }