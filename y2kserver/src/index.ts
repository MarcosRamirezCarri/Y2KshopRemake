import sequelize from "./config/database";
import server from "./server";

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
    server.listen(PORT, () => {
      console.log('%s listening at 3001'); 
    });
  });
  