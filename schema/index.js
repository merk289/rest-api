const db = require('../db'); 

let orderSchema = new db.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    // Дата: тип Дата, по умолчанию ставим текущее время
    date: { 
        type: Date, 
        default: Date.now 
    }
});

exports.Order = db.model('Order', orderSchema);