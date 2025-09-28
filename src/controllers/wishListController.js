import wishList from '../models/wishListModal.js';

class wishController {
    // create wishlist 
    static createWishList = async (req, res) => {
        try {
            const { productId } = req.body;
            if (!productId) {
                return res.status(400).json({ message: "All fields are required" });
            };
            const newWishList = new wishList({
                userId: req.user._id,
                productId,
                createdAt: new Date()
            });
            await newWishList.save();
            res.status(200).json({ message: "Add to wishList successfully", newWishList })
        } catch (error) {
            console.log("error in creating wish list ", error)
        }
    };

    // delete wish list 
    static deleteWishList = async (req, res) => {
        try {
            const deleteWishLishItems = wishList.findOneAndDelete({ userId: req.user._id, _id: req.params.id }, { new: true });
            if (!deleteWishLishItems || deleteWishLishItems.length === 0) {
                return res.status(404).json({ message: "Cart item not found" });
            };
            res.status(200).json({ message: "Wish List item deleted successfully" })
        } catch (error) {
            console.log("error in delete wish list", error)
        }
    }

    // get wish list  
    static getWishList = async (req, res) => {
        try {
            const allItemsWishList = await wishList.find({ userId: req.user._id }).populate("productId");
            const deleteItems = allItemsWishList.filter(item => !item.productId || item.productId === null);
            // remove invalid wish list items 
            if (deleteItems.length > 0) {
                await wishList.deleteMany({ _id: { $in: deleteItems.map(item => item._id) } });
            };
            if (!allItemsWishList || allItemsWishList.length === 0) {
                return res.status(404).json({ message: "no wish list items" })
            };
            res.status(200).json({ message: "fetched your wish list item", allItemsWishList })
        } catch (error) {
            console.log("error in get wish list ", error)
        }
    }


};

export default wishController;