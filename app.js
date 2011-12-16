// Módulos necesarios de node.js
var http = require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
 
// Req -> Petición , Res -> Respuesta
server = http.createServer(function(req,res){
 
    // url.parse(urlStr, parseQueryString=false) --> http://nodejs.org/docs/v0.4.10/api/url.html#url.parse
    // http://www.nodebeginner.org/#head20
    var urlSolicitada = url.parse(req.url).pathname;
 
    // Si el url es http://localhost:8000
    if(urlSolicitada == "/"){
 
        var directorioDelApp = __dirname;
 
        // path.join([path1], [path2], [...]) --> http://nodejs.org/docs/v0.4.10/api/path.html#path.join
                // Abriremos el archivo index.html que hemos creado antes.
        var archivo = path.join(directorioDelApp,urlSolicitada,"index.html");
 
        // path.exists(p, [callback]) --> http://nodejs.org/docs/v0.4.10/api/path.html#path.exists
        path.exists(archivo,function(exists){
 
            if(!exists){
                res.writeHead(404,{'Content-Type':'text/plain'});
                res.end("No encontrado ");
            }else{
                fs.readFile(archivo,"binary",function(err,file){
                    if(err){
                            res.writeHead(500,{'Content-Type':'text/plain'});
                            res.end(err + "\n");
                            return true;
                    }else{
                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.write(file,'binary');
                        res.end();
                    }
                });
            }
 
        });
    } // END IF
});
 

server.listen(8000);

// Usando módulo socket.io
var io = require('socket.io').listen(server);
// En evento : conexión de socket
io.sockets.on('connection', function(socket){
    // Si hay un mensaje hacer lo siguiente
      socket.on('message', function(message){
                        // Enviar mensaje a todos los sockets
            socket.broadcast.send(message);
    });
 
});