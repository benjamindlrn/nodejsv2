let http = require('http')
let url = require('url')
let querystring = require('querystring')
let { countries } = require('countries-list')
// let { error, info } = require('./modules/log')
let { PORT } = require('./utils/const')
let firebase = require('../libs/firebase')
let server = http.createServer(function(req, res) {
    let parsed = url.parse(req.url)
    let pathname = parsed.pathname
    console.log(pathname);
    var query = querystring.parse(parsed.query)
    console.log("query",query);
    
    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write("Hello")
    }
    else if (pathname === '/country') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(countries[query.code]))
    }
    else if (pathname === '/favicon.ico') {
        // ignore favicon request
        console.log('IGNORED FAVICON');
        
    } else {
        res.writeHead(400, { 'Content-Type': 'text/html' })
        res.write("Not found")
    }
    res.end()        
})
server.listen(PORT)
console.log(`Running on ${PORT}`);
