class Result {
    result;
    constructor(result) {
        this.result = result;
    }

    getName() {
        return this.result;
    }
    setName(result) {
        this.result = result;
    }


}

module.exports = Result;