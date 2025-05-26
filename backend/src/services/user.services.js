import User from "../models/user.model.js";

export const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
  const currentPage = Number(page);
  const currentLimit = Number(limit);
  const skipDocuments = currentLimit * (currentPage - 1);

  const users = await User.find(
    {},
    {
      fullname: 1,
      email: 1,
      role: 1,
      isVerified: 1,
    }
  )
    .sort({ createdAt: -1 })
    .skip(skipDocuments)
    .limit(currentLimit);

  const totalDocuments = await User.countDocuments();

  return {
    totalPages: Math.ceil(totalDocuments / currentLimit),
    totalDocuments,
    currentLimit,
    currentPage,
    users,
  };
};
