import app from "./app.js";
import sequelize from "./config/database.js";

async function main() {
try {
const init = process.argv[2];

if (init)
  await sequelize.sync({ force: true });
else
  await sequelize.sync({ force: false });

console.log("Base de datos sincronizada!");

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log("Server running on port " + port);
});

} catch (error) {
console.log(error);
}
}

main();
