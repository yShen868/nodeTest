class ResponseFactory {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }


    static success(data) {
        return new ResponseFactory(200, '操作成功', data);
    }

    static failure(data) {
        return new ResponseFactory(500, '操作失败', data);
    }

    static notFound(data) {
        return new ResponseFactory(404, '资源未找到', data);
    }

    static badRequest(data) {
        return new ResponseFactory(400, '错误的请求', data);
    }

    static unauthorized(data) {
        return new ResponseFactory(401, '未经授权', data);
    }
}

module.exports = ResponseFactory;