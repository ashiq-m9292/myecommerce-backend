import orderModal from "../models/orderModal.js";
import productModal from "../models/productModal.js";



class orderController {
    // create order 
    static createOrder = async (req, res) => {
        try {
            const { userId, userAddress, userProduct, quantity, paymentStatus, orderStatus, createdAt } = req.body;
            if (!userId || !userAddress || !userProduct || !quantity) {
                return res.status(400).json({ message: "All fields are required" });
            };

            const product = await productModal.findById(userProduct);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            };
            const price = product.price;
            const qty = quantity;
            const totalPrice = price * qty;
            const newOrder = new orderModal({
                userId,
                userAddress,
                userProduct,
                quantity,
                totalPrice,
                paymentStatus,
                orderStatus,
                createdAt
            });
            await newOrder.save();
            res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            res.status(500).json({ message: "Error creating order", error: error.message });
        }
    };

    // get all orders
    static getAllOrders = async (req, res) => {
        try {
            const orders = await orderModal.find().populate("userId", "name email").populate("userAddress").populate("userProduct", "name price images");
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found" });
            }
            res.status(200).json({ massage: "Orders fetched successfully", orders });
        } catch (error) {
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    }

}


export default orderController;