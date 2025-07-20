class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        statusText,
        error = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.error = error
        this.name = statusText
    }
}

export {ApiError}