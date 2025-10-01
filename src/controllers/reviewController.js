import reviewModal from "../models/reviewModal.js";

class reviewController {
    static createReview = async (req, res) => {
        try {
            const { productId, rating, comment } = req.body;
            if (!productId) {
                return res.status(400).json({ message: "productId is required" });
            }
            const newReview = new reviewModal({
                userId: req.user._id,
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
            const reviews = await reviewModal.find({}).populate("userId", "name email");
            if (!reviews) {
                return res.status(404).json({ message: "No reviews found" })
            };
            res.status(200).json({ message: "All reviews", reviews });
        } catch (error) {
            res.status(500).json({ message: "Error getting all reviews", error });
        }
    };


}

export default reviewController;