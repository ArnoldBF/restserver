const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS||'mongodb+srv://restserver:3k8bdaDb6ipYtel8@cluster0.pm7xmde.mongodb.net/');
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
    dbConnection,
};
