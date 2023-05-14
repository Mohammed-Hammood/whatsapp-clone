class CustomError extends Error {
    status: number;
    ok: boolean;
    type: string;
    statusText: string;
    constructor(data: { message: string, status: number, ok: boolean, type: string }) {
        const { message, status, ok, type } = data;
        super(message);
        this.status = status;
        this.ok = ok;
        this.statusText = message;
        this.type = type;
    }
}

export default CustomError