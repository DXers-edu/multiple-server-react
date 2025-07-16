import axios, { AxiosError, type AxiosResponse } from "axios";
import { ResponseDto } from "./dto/response";
import { SignInRequestDto, SignUpRequestDto } from "./dto/request/auth";
import SignInResponseDto from "./dto/response/auth";

const API_DOMAIN = import.meta.env.VITE_API_BASE_URL;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;

const responseSuccessHandler = <T = ResponseDto>(response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
};

const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const responseBody = await axios.post(SIGN_UP_URL, requestBody)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
    return responseBody;
};

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const responseBody = await axios.post(SIGN_IN_URL, requestBody)
        .then(responseSuccessHandler<SignInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};