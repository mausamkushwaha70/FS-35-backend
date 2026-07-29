import express from "express";
import userModel from "../model/user.model.js";

export const myPrfileController = async (req, res) => {
    try {
        let user = await userModel.findById(req.body.id).select("-password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "user found successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const profileUpdateController = async (req, res) => {
    try {
        const { userName, fullName, mobile, dob, bio } = req.body;

        const updateData = {};
        if (userName) {
            updateData.userName = userName;
        }
        if (fullName) {
            updateData.fullName = fullName;
        }
        if (mobile) {
            updateData.mobile = mobile;
        }
        if (dob) {
            updateData.dob = dob;
        }
        if (bio) {
            updateData.bio = bio;
        }

        const updateUser = await userModel.findByIdAndUpdate(
            req.user.id,
            updateData,
            {
                new: true,
            },
        );

        if (!updateUser) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "user successfully update",
            updateData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

export const getUserProfileController = async (req, res) => {
    try {
        const { userName } = req.params;
        console.log(userName);
        const user = await userModel.findOne({ userName }).select("-password");
        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found ",
            });
        }

        return res.status(200).json({
            sucess: false,
            message: "user found successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "internal server error",
        });
    }
};

export const searchUserController = async (req, res) => {
    const { query } = req.query;

    if (!query)
        return res.status(400).json({
            success: false,
            message: "Search query is required",
        });

    const user = await userModel
        .find({
            $or: [
                { userName: { $regex: query, $options: "i" } },
                { fullName: { $regex: query, $options: "i" } },
            ],
        })
        .select("userName fullName profile_pic");

    if (user.length == 0)
        return res.status(404).json({
            success: false,
            message: "user not found",
        });

    return res.status(200).json({
        success: true,
        message: "user fetched successfully",
        user,
    });
};

export const followUsersController = async (req, res) => {
    try {
        const targetUserId = req.params.id;

        if (targetUserId === req.user.id)
            return res.status(400).json({
                success: false,
                message: "User can't follow yourself",
            });

        const loggedInUser = await userModel.findById(req.user.id);
        const targetUser = await userModel.findById(targetUserId);

        if (!targetUserId)
            return res.status(404).json({
                success: false,
                message: "user not found",
            });

        const existedUser = loggedInUser.followings.includes(targetUserId);

        if (existedUser)
            return res.status(409).json({
                success: false,
                message: "You already follow this account",
            });

        loggedInUser.followings.push(targetUserId);
        targetUser.followers.push(req.user.id);

        await loggedInUser.save();
        await targetUser.save();

        return res.status(200).json({
            success: true,
            message: "You follwed",
            data: loggedInUser.userName,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

export const unfollowUserController = async (req, res) => {
    let targetUserId = req.params.id;

    if (targetUserId === req.user.id)
        return res.status(400).json({
            success: false,
            message: "you can't follow yourself",
        });

    const loggedInUser = await userModel.findById(req.user.id);
    const targetUser = await userModel.findById(req.params.id);
    if (!targetUser) {
        return res.status(404).json({
            success: false,
            message: "user not found",
        });
    }

    const alreadyExistUser = await loggedInUser.followings.includes(targetUserId);
    console.log("check", alreadyExistUser);

    if (!alreadyExistUser) {
        return res.status(404).json({
            success: false,
            message: "you did not follow this account",
        });
    }

    loggedInUser.followings.pull(targetUserId);
    targetUser.followers.pull(req.user.id);

    loggedInUser.save();
    targetUser.save();

    return res.status(200).json({
        success: true,
        message: "you Unfollow this account",
    });
};

export const getFollowerController = async (req, res) => {
    try {
        const targetUserId = req.params.id;

        if (!targetUserId) {
            return res.status(400).json({
                success: false,
                message: "invalid user Id",
            });
        }

        const user = await userModel
            .findById(targetUserId)
            .populate("followers", "userName profile_pic");

        if (!user)
            return res.status(404).json({
                success: false,
                message: "user not found",
            });

        return res.status(200).json({
            success: true,
            message: "followers fetched successfully",
            followers: user.followers,
            count: user.followers.length,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

export const getFollowingsController = async (req, res) => {
    let targetUserId = req.params.id;

    if (!targetUserId)
        return res.status(400).json({
            success: false,
            message: "invalid user Id",
        });

    const user = await userModel
        .findById(targetUserId)
        .populate("followings", "userName profile_pic");

    if (!user)
        return res.status(400).json({
            success: false,
            message: "User not found",
        });

    return res.status(200).json({
        success: false,
        message: "followings fetched successfully",
        followings: user.followings,
        count: user.followings.length,
    });
};

export const changePassController = async (req, res) => {
    try {
       const {password,newPassword} = req.body

  if(!password || !newPassword) return res.status(400).json({
    success:false,
    message:"both fields are required"
  })

  console.log(password)

  if(password === newPassword) return res.status(409).json({
    success:false,
    message:"enter different password"
  })

  const user = await userModel.findById(req.user.id)
  console.log(user)

  if(!user) return res.status(404).json({
    success:false,
    message:"user details not found"
  })

  const isPassworMatched = await user.comparePass(password)
  console.log(isPassworMatched)

  if(!isPassworMatched) return res.status(400).json({
    success:false,
    message:"incorrect password"
  })

  user.password = newPassword

  await user.save()

  return res.status(200).json({
    success:true,
    message:"password changed successfully"
  })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
