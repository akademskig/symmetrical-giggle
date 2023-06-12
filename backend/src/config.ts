export default () => ({
  DB_HOST: process.env.DB_HOST || 'localhost',
  APP_PORT: parseInt(process.env.APP_PORT) || 4000,
});
