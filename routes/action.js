const { Order } = require('../schema');

module.exports = (app, db) => {
    app.post('/order', async (request, response) => {
        try {
            const { name } = request.body;
            if (!name) {
                return response.code(400).send({ message: 'Name is required' });
            }
            const newOrder = new Order({ name });
            await newOrder.save();
            const formattedOrder = {
                id: newOrder._id,
                name: newOrder.name,
                date: newOrder.date
            };
            return response.code(201).send({ 
                message: 'Order created successfully', 
                order: formattedOrder 
            });

        } catch (err) {
            console.log(err);
            return response.code(500).send({ message: 'Server error' });
        }
    });
    app.get('/orders', async (request, response) => {
        try {
            const orders = await Order.find().sort({ date: -1 });
            const formattedOrders = orders.map(order => ({
                id: order._id,
                name: order.name,
                date: order.date
            }));

            return response.send({
                count: formattedOrders.length,
                orders: formattedOrders
            });

        } catch (err) {
            console.log(err);
            return response.code(500).send({ message: 'Server error' });
        }
    });
    app.get('/order/:id', async (request, response) => {
        try {
            const { id } = request.params;
            if (!db.Types.ObjectId.isValid(id)) {
                return response.code(400).send({ message: 'Invalid ID format' });
            }

            const order = await Order.findById(id);
            if (!order) {
                return response.code(404).send({ message: 'Order not found' });
            }

            return response.send({
                id: order._id,
                name: order.name,
                date: order.date
            });

        } catch (err) {
            console.log(err);
            return response.code(500).send({ message: 'Server error' });
        }
    });
    app.delete('/order/:id', async (request, response) => {
        try {
            const { id } = request.params;

            if (!db.Types.ObjectId.isValid(id)) {
                return response.code(400).send({ message: 'Invalid ID format' });
            }
            const deletedOrder = await Order.findByIdAndDelete(id);

            if (!deletedOrder) {
                return response.code(404).send({ message: 'Order not found' });
            }

            return response.send({
                message: 'Order deleted successfully',
                order: {
                    id: deletedOrder._id,
                    name: deletedOrder.name,
                    date: deletedOrder.date
                }
            });

        } catch (err) {
            console.log(err);
            return response.code(500).send({ message: 'Server error' });
        }
    });
    app.put('/order/:id', async (request, response) => {
        try {
            const { id } = request.params;
            const { name } = request.body;

            if (!db.Types.ObjectId.isValid(id)) {
                return response.code(400).send({ message: 'Invalid ID format' });
            }
            if (!name) {
                return response.code(400).send({ message: 'Name is required' });
            }
            const updatedOrder = await Order.findByIdAndUpdate(
                id, 
                { name: name }, 
                { new: true } 
            );

            if (!updatedOrder) {
                return response.code(404).send({ message: 'Order not found' });
            }
            return response.code(204).send();

        } catch (err) {
            console.log(err);
            return response.code(500).send({ message: 'Server error' });
        }
    });

};