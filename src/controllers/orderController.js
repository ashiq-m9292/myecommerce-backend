import orderModal from "../models/orderModal.js";
import productModal from "../models/productModal.js";
import cartModal from "../models/cartModal.js";



class orderController {
    // create order 
    static createOrder = async (req, res) => {
        try {
            const { shippingAddress, products, totalPrice, paymentStatus, orderStatus } = req.body;
            if (!shippingAddress || !products || !totalPrice) {
                return res.status(400).json({ message: "All fields are required" });
            };
            for (let item of products) {
                const product = await productModal.findById(item.productId);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                if (product.stock < item.quantity) {
                    return res.status(400).json({ message: "Product out of stock" });
                }
            };

            const newOrder = new orderModal({
                userId: req.user._id,
                shippingAddress,
                products,
                totalPrice,
                paymentStatus,
                orderStatus,
                createdAt: new Date()
            });
            await newOrder.save();
            if (!newOrder) {
                return res.status(404).json({ message: "Order not created" });
            }

            // remove cart items after order creation
            for (let item of products) {
                await cartModal.findOneAndDelete({ userId: req.user._id, productId: item.productId });
            }

            // update product stock and sold 
            for (let item of products) {
                const product = await productModal.findById(item.productId);
                if (!product) {
                    return res.status(404).json({ message: "Product not found stock and sold" });
                }
                product.stock -= item.quantity;
                product.sold += item.quantity;
                await product.save();
            }
            res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            res.status(500).json({ message: "Error creating order", error: error.message });
        }
    };

    // get all orders
    static getAllOrders = async (req, res) => {
        try {
            const orders = await orderModal.find({ userId: req.user._id }).populate("userId", "name email").populate("shippingAddress", "street village city zipCode phone").populate("products", "name price quantity image");
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found" });
            }
            res.status(200).json({ massage: "Orders fetched successfully", orders });
        } catch (error) {
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    };

    // delete order 
    static deleteOrder = async (req, res) => {
        try {
            const deleteOrder = await orderModal.findOneAndDelete({ userId: req.user._id, _id: req.params.id }, { new: true });
            if (!deleteOrder || deleteOrder.length === 0) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting order", error: error.message });
        }
    };

    // update order 
    static updateOrder = async (req, res) => {
        try {
            const { orderStatus } = req.body;
            const updateOrder = await orderModal.findOneAndUpdate({ userId: req.user._id, _id: req.params.id }, { $set: { orderStatus } }, { new: true });
            if (!updateOrder || updateOrder.length === 0) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order updated successfully", order: updateOrder });
        } catch (error) {
            res.status(500).json({ message: "Error updating order", error: error.message });
        }
    };

}


export default orderController;