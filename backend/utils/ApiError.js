class ApiError extends Error{
    constructor(
        statusCode,
        statusText,
        message = "something went wrong",
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