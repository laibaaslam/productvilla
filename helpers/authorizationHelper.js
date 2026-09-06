// this is a helper file for for hashing of password to make it save
import bcrypt from "bcrypt";

// hashing input 
export const hashPassword = async (password) => {
    try {
        //number of times the bcrypt algorithm will be applied to the input password
        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};
// comparing input 
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};