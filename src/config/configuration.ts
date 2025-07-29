export default () => ({
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
});
