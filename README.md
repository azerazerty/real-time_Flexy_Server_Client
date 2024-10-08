this Project consist of building socket server , and an electron client that communicate with the server in real-time

server , can manage all connected electron clients ,
receive api requests from Flexy server ,
send real-time command ( event) to electron client to topup the offer and listen to incoming responses from socket clients ( electron program)
update flexy server web hook after receive client socket response

tech stack + libs used in this project :
server : NodeJs , ExpressJs , SocketIo , axios,
client : electron, ReactJs , SocketIo-Client , MUI v6
