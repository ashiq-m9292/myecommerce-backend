import cartModal from "../models/cartModal.js";

class cartController {
    // create cart item
    static createCart = async (req, res) => {
        try {
            const { productId } = req.body;
            if (!productId) {
                return res.status(400).json({ message: "All fields are required" });
            };
            const cartItem = new cartModal({
                userId: req.user._id,
                productId,
                createdAt: new Date()
            });
            await cartItem.save();

            res.status(201).json({ message: "Add to Cart successfully", cartItem });
        } catch (error) {
            res.status(500).json({ message: "Error creating cart item", error });
        }
    }

    // get all cart
    static getAllCart = async (req, res) => {
        try {
            const cartItems = await cartModal.find({ userId: req.user._id }).populate("productId");
            if (cartItems.length === 0 || !cartItems) {
                return res.status(404).json({ message: "No cart items found" });
            }
            res.status(200).json({ message: "Get all cart items successfully", cartItems });
        } catch (error) {
            res.status(500).json({ message: "Error getting cart items", error });
        }
    }


    // delete cart item 
    static deleteCart = async (req, res) => {
        try {
            const deletedCartItem = await cartModal.findOneAndDelete(
                { userId: req.user._id, _id: req.params.id },
                { new: true }
            );
            if (!deletedCartItem || deletedCartItem.length === 0) {
                return res.status(404).json({ message: "Cart item not found" });
            };
            res.status(200).json({ message: "Cart item deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting cart item", error });
        }
    }

    // update quantity 
    static updateQuantity = async (req, res) => {
        try {
            const { quantity } = req.body;
            const updatedCartItem = await cartModal.findOneAndUpdate(
                { userId: req.user._id, _id: req.params.id },
                { quantity },
                { new: true }
            );
            if (!updatedCartItem || updatedCartItem.length === 0) {
                return res.status(404).json({ message: "Cart item not found" });
            };
            res.status(200).json({ message: "Cart item quantity updated successfully", updatedCartItem });
        } catch (error) {
            res.status(500).json({ message: "Error updating cart item quantity", error });
        }
    }

}

export default cartController;