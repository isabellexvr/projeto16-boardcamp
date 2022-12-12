import joi from "joi";
import DateExtension from '@joi/date';

const Joi = joi.extend(DateExtension);

const customerModel = joi.object({
    name: joi.string().required().min(1),
    phone: joi.string().length(11 || 10).pattern(/^[0-9]+$/).required(),
    cpf: joi.string().max(11),
    birthday: Joi.date().utc().format("YYYY-MM-DD").required()
});

export default customerModel;

/* {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
  } */