var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());


//Import Models and Controllers

var models = require('./models/tickets')(app,mongoose);
var TicketCtrl = require('./controllers/tickets');


//Example Route
var router = express.Router();
router.get('/', function(req, res) {  
   res.send("Hello World!");
});


// API routes
var tickets = express.Router();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


//Routes Tickets

tickets.get('/',TicketCtrl.findAllTickets);

tickets.get('/nuevo-ticket', TicketCtrl.create);
tickets.post('/tickets',TicketCtrl.addTicket);
tickets.get('/edit-ticket/:id',TicketCtrl.showEditTicket);
tickets.post('/edit-ticket/:id/edit',TicketCtrl.updateTicket);
tickets.post('/tickets/:id',TicketCtrl.deleteTicket);


tickets.route('/ticket/:id')  
  .get(TicketCtrl.findAllTickets)
  .post(TicketCtrl.updateTicket);


app.use('/api', tickets);
app.use(tickets);


mongoose.connect('mongodb://localhost/tickets', function(error, respuesta) {
	if (error) {
		console.log('ERROR: connecting to Database ' +  error);
	}
  
});

app.listen(8080, function() {  
  console.log("Node server running on http://localhost:8080");
});



