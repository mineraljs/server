export class HttpError {

    constructor (
        private _message: string,
        private _httpStatus: number
    ) {
    }

    get message() {
        return this._message
    }

    get httpStatus() {
        return this._httpStatus
    }
    
}