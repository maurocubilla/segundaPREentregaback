import mongoose from "mongoose";
import { cartsCollection, productsCollection } from "../../constants/index.js";


const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,

        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: productsCollection,
                    required: true,
                },
                quantity: {
                    type: Number,
                    min: 1,
                    default: 1,
                    required: true
                }
            }
        ],
        default: []
    }
});
cartSchema.pre(["find","findOne"], function(nex){
    this.populate("cartProducts");
});



export const cartsModel = mongoose.model(cartsCollection, cartSchema);