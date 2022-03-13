var fs = require('fs');
module.exports = {
    port: 3000,
    createServer: function (req, res) {
        // console.log(req.data);
        if (req.url == '/') {
            res.writeHead(200, {
                "Context-type": "text/html"
            })
            fs.createReadStream('./views/login.html').pipe(res);
        } else if (req.url == '/dasboard.html') {
            // console.log(req);
            req.on('data', function (chunk) {
                let data = '' + chunk
                const check1 = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
                var user = fs.readFileSync('user.json')
                const check = JSON.parse(user.toString())
                if (check[0].userName != check1.userName) {
                    res.writeHead(200, {
                        "Context-type": "text/html"
                    })
                    fs.createReadStream('./views/login wrongusername.html').pipe(res)
                } else if (check[0].password != check1.password) {
                    res.writeHead(200, {
                        "Context-type": "text/html"
                    })
                    fs.createReadStream('./views/login wrongpassword.html').pipe(res)
                } else {
                    res.writeHead(200, {
                        "Context-type": "text/html"
                    })
                    fs.createReadStream('./views/dasboard.html').pipe(res)
                }
            });
        } else {
            res.writeHead(404, {
                "Context-type": "text/html"
            })
            fs.createReadStream('./views/404.html').pipe(res);
        }

    }
}
