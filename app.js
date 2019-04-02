const fs = require('fs');
const http = require('http');


const server = http.createServer((req, res) => {
    const { method, url, headers } = req   
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {            
            body.push(chunk);
        });
        return req.on('end', () => {            
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end()
            })            
        })
    }    

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my node.js server</h1></body>')
    res.write('</html>')
    res.end()
});

server.listen(3000);

