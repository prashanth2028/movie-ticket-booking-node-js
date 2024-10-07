import mongoose from "mongoose";

export const idValidator = (id) => {
  return new Promise((resolve, reject) => {
    
    if (mongoose.Types.ObjectId.isValid(id)) {
        console.log(11);
        
      resolve(true);
    } else {
        console.log(222);
        
      reject(false);
    }
  });
};
