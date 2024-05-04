const validator = require("validator");

const cleanUpAndValidate = ({email, password, name, username}) => {
    return new Promise((resolve, reject) => {
        console.log(name, email);
        if(!email || !password || !name || !username)
            reject("Missing Credentials");
        if(typeof email !== "string") reject("Datatype of email is incorrect");
        if(typeof name !== "string") reject("Datatype of name is incorrect");
        if(typeof username !== "string") reject("Datatype of username is incorrect");
        if(typeof password !== "string") reject("Datatype of password is incorrect");
        
        if(username.length <=2 || username.length > 30)
            reject("username should be of 3-30 chars");
        if(password.length <=2 || password.length > 30)
            reject("password should be of 3-30 chars");
        
            if(!validator.isEmail(email))
                reject("Please enter valid email")
        
        resolve();
    });
}

module.exports = { cleanUpAndValidate };