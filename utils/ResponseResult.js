class ResponseResult {
    constructor() {
        this.result = {
            success: true,
            code: 200,
            data: null
        };
    }

    static success(data) {
        const instance = new ResponseResult();
        instance.result.data = data;
        return instance;
    }

    static error(code = 500, message) {
        const instance = new ResponseResult();
        instance.result.success = false;
        instance.result.code = code;
        instance.result.message = message;
        return instance;
    }

    setCode(code) {
        this.result.code = code;
        return this;
    }

    send(res) {
        return res.status(this.result.code).json(this.result);
    }
}
