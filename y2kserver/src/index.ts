import sequelize from "./config/database";
import server from "./server";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;


sequelize.sync({ alter:true }).then(() => {
    server.listen(PORT, () => {
      console.log('%s listening at 3010'); 
    });
  });
  