import Hotel from "../models/Hotel.js"

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body) //request is taken from user
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    }
    catch(err){
        next(err)
    }
}

export const updateHotel = async (req,res,next)=>{
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true})  
    res.status(200).json(updatedHotel);
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel);
    }
    catch(err){
        next(err)
    }
}

export const deleteHotel = async (req,res,next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel deleted!")
    }
    catch(err){
        next(err)
    }
}

export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch(err){
        next(err)
    }
}

export const getHotels = async (req,res,next)=>{
    const {min,max,...others} = req.query;
    try{
        const {limit} = req.query;
        const hotels = await Hotel.find({...others,cheapestPrice:{$gte:min || 0 ,$lte:max || 9999}}).limit(limit);
        res.status(200).json(hotels);
    }
    catch(err){
        next(err)
    }
}

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
    res.status(200).json(list);
    }
    catch(err){
        next(err)
    }
}

export const countByType = async (req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"cabin",count:cabinCount}
        ]);
    }
    catch(err){
        next(err)
    }
}