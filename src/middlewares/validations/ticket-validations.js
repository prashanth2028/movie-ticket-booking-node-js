import Joi from "joi";
import joiObjectid from "joi-objectid";
import { errorResponse} from '../../config/response.js';
Joi.objectId = joiObjectid(Joi);


const ticketValidation = Joi.object({ 
    movieId:Joi.objectId().required(),
    showtimes:Joi.date().required(),
    user:Joi.objectId().required(),
    seats:Joi.number().integer().min(1).required(),
    totalPrice:Joi.number().integer().required(),
});


export const ticketValidator = (req, res, next) => {
    try {
      const { error } = ticketValidation.validate(req.body);
      
      if (error) {
        return errorResponse(res, 400, "Validation failed", { error: error.details[0].message });
      }
      next();
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Internal Server Error", { error: error.message });
    }
};