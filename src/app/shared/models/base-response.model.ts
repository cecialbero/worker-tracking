export interface BaseResponse {
    commandResponse: string;
    infoMessage: InfoMessage;
}

export interface InfoMessage {
    success: boolean;
    message: string;
}
