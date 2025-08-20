import address from "../models/addressModal.js";

class AddressController {
    // createAddress
    static createAddress = async (req, res) => {
        try {
            const { street, village, city, zipCode, phone } = req.body;
            if (!street || !village || !city || !zipCode || !phone) {
                return res.status(400).json({ message: 'All fields are required' });
            };
            const newAddress = new address({
                street,
                village,
                city,
                zipCode,
                phone
            });
            await newAddress.save();
            res.status(201).json({ message: 'Address created successfully', address: newAddress });
        } catch (error) {
            res.status(500).json({ message: 'Error creating address', error: error.message });
        }
    };

    // get all address 
    static getAllAddresses = async (req, res) => {
        try {
            const addresses = await address.find();
            if (!addresses || addresses.length === 0) {
                return res.status(404).json({ message: 'No addresses found' });
            }
            res.status(200).json({ massage: 'Addresses fetched successfully', addresses });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching addresses', error: error.message });
        }
    };

    // delete address 

    static deleteAddress = async (req, res) => {
        try {
            const deletedAddress = await address.findByIdAndDelete(req.params.id);
            if (!deletedAddress) {
                return res.status(404).json({ message: 'Address not found' });
            }
            res.status(200).json({ message: 'Address deleted successfully', address: deletedAddress });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting address', error: error.message });
        }
    };

    // update address
    static updateAddress = async (req, res) => {
        try {
            const { street, village, city, zipCode, phone } = req.body;
            const updatedAddress = await address.findByIdAndUpdate(req.params.id)
            if (!updatedAddress) {
                return res.status(404).json({ message: 'Address not found' });
            }
            updatedAddress.street = street
            updatedAddress.village = village;
            updatedAddress.city = city;
            updatedAddress.zipCode = zipCode;
            updatedAddress.phone = phone;
            await updatedAddress.save();
            res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
        } catch (error) {
            res.status(500).json({ message: 'Error updating address', error: error.message });
        }
    };


};

export default AddressController;