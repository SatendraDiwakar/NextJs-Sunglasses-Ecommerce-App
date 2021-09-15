import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type: String, required: true},
    slug : {type: String, required: true, unique: true},
    sectionName : {type: String, required: true},
    image : {type: String, required: true},
    rating : {type: Number, required: true, default: 0},
    price : {type: Number, required: true},
    countInStock : {type: Number, required: true, default: 0},
    brand : {type: String, required: true},
    description : {type: String, required: true},
},{
    timestamps: true
});

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;