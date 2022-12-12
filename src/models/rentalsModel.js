import joi from 'joi';

const rentalsModel = joi.object({
    customerId: joi.number().greater(0).required(),
    gameId: joi.number().greater(0).required(),
    daysRented: joi.number().required()
})

export default rentalsModel