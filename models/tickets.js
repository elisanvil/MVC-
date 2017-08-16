var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var ticketSchema = new Schema({
  fecha:  		{ type: Date },
  origen: 		{ type: String, enum:
  ['Paris', 'Marsella', 'Niza', 'Lyon', 'Burdeos']},
  destino: 		{ type: String, enum:
  ['Paris', 'Marsella', 'Niza', 'Lyon', 'Burdeos']},
  precio:   		{ type: Number },
  adquiriente:    	{ type: String },
  puesto:    		{ type: String },
  summary:  		{ type: String }
});

module.exports = mongoose.model('Ticket', ticketSchema);  
