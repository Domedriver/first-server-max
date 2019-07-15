const fs = require("fs");

const requestHandler = (req, res) => {
  const { method, url, headers } = req;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title>");
    res.write('<link rel="stylesheet" href="/static/base.css"></head>');
    res.write(
      '<body><h1>Enter some text that I will immediately delete</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>'
    );
    res.write("</html>");
    res.end();
    return;
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my node.js server</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// Other ways to do exports
// module.exports.handler = requestHandler
/*
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}

*/
