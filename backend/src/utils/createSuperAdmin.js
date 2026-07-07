const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      username: "superadmin",
    });

    if (!existingAdmin) {

      const hashedPassword = await bcrypt.hash("wkf@2026", 10);

      await User.create({
        username: "superadmin",
        password: hashedPassword,
        fullName: "Super Admin",
        email: "",
        role: "superadmin",
        isActive: true,
      });

      console.log("Super Admin Created");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createSuperAdmin;

















































// const bcrypt = require("bcryptjs");

// const User = require("../models/User");
// const hashedPassword = await bcrypt.hash("wkf@2026", 10);
// const createSuperAdmin = async () => {
//   try {
//     const existingAdmin = await User.findOne({
//       username: "superadmin",
//     });

//     if (!existingAdmin) {
//       await User.create({
//         username: "superadmin",
//         password: "wkf@2026",
//         fullName: "Super Admin",
//         role: "superadmin",
//       });

//       console.log("Super Admin Created");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = createSuperAdmin;