const axios = require("axios");
const agent = require("./agent");

const serverUrl = "https://localhost:4433/authenticate";
const options = { httpsAgent: agent("bob") };

axios
  .get(serverUrl, options)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err.response.data);
  });
