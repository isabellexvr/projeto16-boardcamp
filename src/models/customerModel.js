import joi from "joi";

const customerModel = joi.object({
    name: joi.string().required().min(1),
    phone: joi.string().length(11 || 10).pattern(/^[0-9]+$/).required(),
    cpf: joi.string().max(11),
    birthday: joi.string().date().required()
});

export default customerModel;

/* {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
  } */