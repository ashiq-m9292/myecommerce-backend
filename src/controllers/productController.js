import productModel from "../models/productModal.js";
import cloudinary from "cloudinary";
import stream from "stream";

class productControll {

    // create product 
    static createProduct = async (req, res) => {
        try {
            const { name, price, description, category, stock } = req.body;
            if (!name || !price || !description || !category || !stock) {
                return res.status(400).json({ message: "All fields are required" });
            };
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "Please select an image" });
            };
            const uploadPromises = req.files.map(file => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.v2.uploader.upload_stream({ folder: "productImages" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    const bufferStream = new stream.PassThrough();
                    bufferStream.end(file.buffer);
                    bufferStream.pipe(uploadStream);
                });
            });

            const cloudinaryResults = await Promise.all(uploadPromises);
            const images = cloudinaryResults.map(cdb => ({
                public_id: cdb.public_id,
                url: cdb.secure_url
            }));

            const product = new productModel({
                name,
                price,
                description,
                category,
                stock,
                images
            });
            await product.save();
            res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
            res.status(500).json({ message: "Error creating product", error: error.message });
        }
    }

    // get single product
    static getSingleProduct = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product", error: error.message });
        }
    };

    // get All products 
    static getAllProducts = async (req, res) => {
        try {
            const products = await productModel.find();
            if(!products || products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            };
            res.status(200).json({message: "All products fetched successfully", products });
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error: error.message });
        }
    };


    // delete product
    static deleteProduct = async (req, res) => {
        try {
            const product = await productModel.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            product.images.forEach(async (image) => {
                await cloudinary.v2.uploader.destroy(image.public_id);
            });
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error: error.message });
        }
    };

    // product update 
    static updateProduct = async (req, res) => {
        try {
            const { name, price, description, category, stock } = req.body;
            const product = await productModel.findByIdAndUpdate(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            };

            if (req.files && req.files.length > 0) {
                product.images.forEach(async (image) => {
                    await cloudinary.v2.uploader.destroy(image.public_id);
                });
            };

            // Handle image updates
            let images = product.images;
            if (req.files && req.files.length > 0) {
                const uploadPromises = req.files.map(file => {
                    return new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.v2.uploader.upload_stream({ folder: "productImages" },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );
                        const bufferStream = new stream.PassThrough();
                        bufferStream.end(file.buffer);
                        bufferStream.pipe(uploadStream);
                    });
                });

                const cloudinaryResults = await Promise.all(uploadPromises);
                images = cloudinaryResults.map(cdb => ({
                    public_id: cdb.public_id,
                    url: cdb.secure_url
                }));
            }

            product.name = name;
            product.price = price;
            product.description = description;
            product.category = category;
            product.stock = stock;
            product.images = images;

            await product.save();
            res.status(200).json({ message: "Product updated successfully", product });
        } catch (error) {
            res.status(500).json({ message: "Error updating product", error: error.message });
        }
    };
};

export default productControll;
