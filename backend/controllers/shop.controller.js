import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createEditShop = async (req,res) => {
    try {
        const {name,city,state,address} =  req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        let shop = await Shop.findOne({owner:req.userId})
        if (!shop) {
             shop = await Shop.create({
            name,
            city,
            state,
            address,
            image,
            owner:req.userId
        })
        }else{
         const updateData = {name,city,state,address};
         if(image) updateData.image = image
         shop = await Shop.findByIdAndUpdate(shop._id, updateData,{new:true})
        }
     
        await shop.populate("owner item")
        return res.status(200).json(shop)
    } catch (error) {
      
        return res.status(500).json({message:`Shop Create Error ${error}`})
    }
}




export const getMyShop = async (req,res) => {
   try {
    const shop = await Shop.findOne({owner:req.userId}).populate("owner item")
    if(!shop){
        return null
    }
    return res.status(200).json(shop)
   } catch (error) {
    return res.status(500).json({message:`GET Shop  Error ${error}`})
   } 
}


