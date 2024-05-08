export enum DbAccessCodeResponse {
    OK,
    OK_NEW_USER,
    CODE_NOT_FOUND,
    CODE_NOT_ACTIVE,
    CODE_EXPIRED,
    UNKNOWN_ERROR,
}

export enum LoginResponse {
    OK,
    AUTH_API_ERROR,
    UNKNOWN_ERROR,
}