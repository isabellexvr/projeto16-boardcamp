import joi from "joi";

const postGameModel = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().greater(0).required(),
})

export default postGameModel;

//stocktotal e priceperday > 0