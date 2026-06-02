const app = require('./src/app');
const config = require('./src/config/env');
const connectDB = require('./src/config/database');
const migrateUsers = require('./src/utils/migrateUsers');

const PORT = config.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await migrateUsers();

  app.listen(PORT, () => {
    console.log('=================================================');
    console.log(' EduLife Companion Core Server Running!');
    console.log(` Port: ${PORT}`);
    console.log(` MongoDB: ${config.MONGODB_URI}`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log('=================================================');
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
