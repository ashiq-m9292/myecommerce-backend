import reviewModal from "../models/reviewModal.js";

class reviewController {
    // create review function
    static createReview = async (req, res) => {
        try {
            const { orderId, productId, rating, comment } = req.body;
            if (!orderId || !productId) {
                return res.status(400).json({ message: "productId is required" });
            }
            const newReview = new reviewModal({
                userId: req.user._id,
                orderId,
                productId,
                rating,
                comment,
                createdAt: new Date()
            });
            await newReview.save();
            res.status(201).json({ message: "Review created successfully", newReview });
        } catch (error) {
            res.status(500).json({ message: "Error creating review", error });
        }
    };

    // delete review function 
    static deleteReview = async (req, res) => {
        try {
            const deleteReview = await reviewModal.findOneAndDelete({
                _id: req.params.id
            }, { new: true });
            if (!deleteReview) {
                return res.status(404).json({ message: "Review not found" })
            };
            res.status(200).json({ message: "Review deleted successfully", deleteReview })
        } catch (error) {
            res.status(500).json({ message: "Error deleting review", error });
        }
    };

    // get review function 
    static getAllReview = async (req, res) => {
        try {
            const reviews = await reviewModal.find({}).populate("orderId").populate("productId").populate("userId", "name email");
            if (!reviews) {
                return res.status(404).json({ message: "No reviews found" })
            };
            res.status(200).json({ message: "All reviews", reviews });
        } catch (error) {
            res.status(500).json({ message: "Error getting all reviews", error });
        }
    };

    // update review function 
    static updateReview = async (req, res) => {
        try {
            const updateReview = await reviewModal.findOneAndUpdate({ userId: req.user._id, _id: req.params.id }, { $set: req.body }, { new: true });
            if (!updateReview) {
                return res.status(404).json({ message: "Review id not found" })
            };
            res.status(200).json({ message: "Review updated successfully", updateReview })
        } catch (error) {
            res.status(500).json({ message: "Error updating review", error });
        }
    }

    // get single product review 
    static getSingleProductReview = async (req, res) => {
        try {
            const reviews = await reviewModal.find({ productId: req.params.id }).populate("userId", "name email");
            if (!reviews) {
                return res.status(404).json({ message: "product id not found" })
            };
            res.status(200).json({ message: "All product reviews", reviews });
        } catch (error) {
            res.status(500).json({ message: "Error getting all reviews", error });
        }
    };

    // get user review with product id
    static getUserReview = async (req, res) => {
        try {
            const reviews = await reviewModal.findOne({ userId: req.user._id, productId: req.params.id })
            if (!reviews) {
                return res.status(404).json({ message: "user id not found" })
            };
            res.status(200).json({ message: "All reviews", reviews });
        } catch (error) {
            res.status(500).json({ message: "Error getting all reviews", error });
        }
    }


}

export default reviewController;