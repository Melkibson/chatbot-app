export const signup = async (req, res) => {
    try {
      const {fullName, username, password, confirmedPassword, gender} = req.body;
    } catch (error) {
      console.log(error);
    }
}
export const login = (req, res) => {
  console.log("loginUser");
};
export const logout = (req, res) => {
  console.log("logoutUser");
};