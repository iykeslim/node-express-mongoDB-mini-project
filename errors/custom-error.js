

class CustomAPIError extends Error{
    constructor(message, statusCode){
        //super invokes the cunstructor of a parent class so we have acces to all the mtds and properties of the parent - message and statusCode in our case
        super(message)
        this.statusCode = statusCode
    }
}

// we can also create new instances and have access right away by doing this
// new CustomAPIError(message, statusCode)

//but let's create a function that does just tha instead
const CreateCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
}

module.exports = {
    CustomAPIError,
    CreateCustomError
}