import Users from "../models/user.model.js";

// ================= GET ALL USERS (with pagination) =================
export async function getUsers(req, res, next) {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const users = await Users.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// ================= GET USER BY ID =================
export async function getUserById(req, res, next) {
  try {
    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// ================= CREATE USER =================
export async function createUser(req, res, next) {
  try {
    const newUser = await Users.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

// ================= UPDATE USER =================
export async function updateUserById(req, res, next) {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

// ================= DELETE USER =================
export async function deleteUserById(req, res, next) {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
}