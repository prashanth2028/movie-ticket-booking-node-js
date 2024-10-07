import Joi from "joi";
import { errorResponse} from '../../config/response.js';
import { idValidator } from "../../helper/id-validation.js";


const adminMovieCreate = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(2).max(500).required(),
    duration: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
    showtimes: Joi.date().required()
});

export const movieValidator = (req, res, next) => {
    try {
      const { error } = adminMovieCreate.validate(req.body);
      if (error) {
        return errorResponse(res, 400, "Validation failed", { error: error.details[0].message });
      }
      next();
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Internal Server Error", { error: error.message });
    }
};

export const idValidation = async (req, res, next) => {
    console.log(req.params.id);
    
    try {        
      if ((await idValidator(req.params.id)) == true) {
        next();
      } else {
        return errorResponse(res, 400, "Invalid Subadmin ID", {});
      }
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Internal Server Error123", { error: error.message });
    }
};