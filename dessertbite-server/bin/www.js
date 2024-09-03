const app = require('../app')
const port = process.env.PORT || 3000;
// const port = process.env.PORT || 

app.listen(port, (req, res) => {
  console.log(`server up and running in port ${port}`);
});
