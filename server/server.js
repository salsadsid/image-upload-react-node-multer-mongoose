const app = require('./app');
const port = process.env.PORT || 8080;
const connectToDB = require('./utils/database');

connectToDB();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  