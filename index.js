const http = require('http');
const fs = require("fs");
const path = require("path");


const hostname = "localhost";
const port = 3000;

// build http server
const server = http.createServer((req, res) => {
   console.log("Request for " + req.url + " by method " + req.method);

   if(req.method === "GET"){
       let fileUrl;
       if(req.url === "/") fileUrl = "/index.html";
       else fileUrl = req.url;
       // build file path
       let filepath = path.resolve("./public" + fileUrl);
       const fileExt = path.extname(filepath);

       if(fileExt === ".html"){
           fs.exists(filepath,exists => {
               if(! exists){
                   // html file does not exists
                   res.statusCode = 404;
                   res.setHeader("Content-Type", "text/html");
                   res.end("<html><body><h1>Error 404:"+ fileUrl +" not found</h1></body></html>");
                   return;
               }
               res.statusCode = 200;
               res.setHeader("Content-Type", "text/html");
               fs.createReadStream(filepath).pipe(res);
           })
       }else {
           // not type of html file
           res.statusCode = 404;
           res.setHeader("Content-Type", "text/html");
           res.end("<html><body><h1>Error 404:"+ fileUrl +" not HTML</h1></body></html>");
           return;
       }
   }else {
       // not GET method
       res.statusCode = 404;
       res.setHeader("Content-Type", "text/html");
       res.end("<html><body><h1>Error 404:"+ req.method +" not supported</h1></body></html>");
       return;
   }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
