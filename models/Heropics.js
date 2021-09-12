import mongoose from "mongoose";

const heropicSchema = new mongoose.Schema({
    heroBack: { type: String, required: true },
    heroCar: { type: String, required: true },
    topSellerHero: { type: String, required: true },
    collectionHero1: { type: String, required: true },
    collectionHero2: { type: String, required: true },
    collectionHero3: { type: String, required: true },
});

const HeroPic = mongoose.models.heroPic || mongoose.model('heroPic', heropicSchema);

export default HeroPic;