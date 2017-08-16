//File: controllers/tickets.js
var mongoose = require('mongoose');  
var Ticket  = mongoose.model('Ticket');

//GET - Returna todos los tickets de la base de datos
exports.findAllTickets = function(req, res) {  
    Ticket.find(function(err, ticket) {
        if(err) res.send(500, err.message);
        else {
            return res.render('../views/index', {title: 'Lista de Tickets', ticket: ticket});
        }
        console.log('GET /tickets');
        res.status(200).jsonp(ticket);
    });
};

//GET - Returna un ticket con un ID especificado
exports.findById = function(req, res) {  
    Ticket.findById(req.params.id, function(err, ticket) {
    if(err) 
	return res.send(500, err.message);

    console.log('GET /ticket/' + req.params.id);
    res.status(200).jsonp(ticket);
    });
};

//POST - Inserta un nuevo ticket en la base de datos
exports.addTicket = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var ticket = new Ticket({
        fecha:     	req.body.fecha,
        origen:  	req.body.origen,
        destino:  	req.body.destino,
        precio:     	req.body.precio,
	adquiriente:    req.body.adquiriente,
        puesto:    	req.body.puesto,
        summary:  	req.body.summary
    });

    ticket.save(function(err, ticket) {
        if(err) 
		return res.status(500).send( err.message);
        res.redirect('/');
    });
};


exports.showEditTicket = function(req, res) {  
    Ticket.findById(req.params.id, function(err, ticket) {
        
        if(err) return res.status(500).send(err.message);
        else return res.render('../views/show', {
	    put: true,
            title: 'Editar Ticket',
            act: '/edit-ticket/'+req.params.id+'/edit',
            ticket:ticket});
        res.status(200).jsonp(factura);

        
    });
};

//PUT - Actualiza un registro que ya existe
exports.updateTicket = function(req, res) {  
    Ticket.findById(req.params.id, function(err, ticket) {
        var fecha = req.body.fecha;
        var origen = req.body.origen;
        var destino = req.body.destino;
        var precio = req.body.precio;
	var adquiriente = req.body.adquiriente;
        var puesto = req.body.puesto;
        var summary = req.body.summary;

        ticket.update({
            fecha: fecha,
            origen: origen,
            destino: destino,
            precio: precio,
            adquiriente: adquiriente,
            puesto: puesto,
        },function(err) {
            if(err) res.send("Existe un problema de actualización en la base de datos: " + err);
            else res.redirect('/');

        });
    });
};

//DELETE - Borra un ticket con un ID especificado
exports.deleteTicket = function(req, res) {  
    Ticket.remove({_id: req.params.id}, function(err) {
        if(err) res.send('Error al intentar eliminar el ticket.');
        else res.redirect('/');
        })
};

exports.create = function (req, res) {
  return res.render('../views/show', {
	put: false,
	title: 'Nuevo Ticket',
	act: '/tickets',
	ticket: {}})
}
