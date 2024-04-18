// userCache.js

// Khai báo một đối tượng để lưu trữ thông tin user tạm thời
const userCache = {};

// Hàm để lưu thông tin user vào cache
const saveUserInfo = (email, userInfo) => {
  userCache[email] = userInfo;
};

// Hàm để lấy thông tin user từ cache
const getUserInfo = (email) => {
  return userCache[email];
};

// Hàm để xóa thông tin user khỏi cache
const deleteUserInfo = (email) => {
  delete userCache[email];
};

// Export các hàm để sử dụng trong các controllers khác
module.exports = {
  saveUserInfo,
  getUserInfo,
  deleteUserInfo
};