import { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { signInRequest } from "src/apis";
import { SignInRequestDto } from "src/apis/dto/request/auth";
import { ResponseDto } from "src/apis/dto/response";
import SignInResponseDto from "src/apis/dto/response/auth";
import { ACCESS_TOKEN } from "src/constants";

interface Props {
    onPathChange: (path: 'sign-in' | 'sign-up') => void;
}

export default function SignIn({ onPathChange }: Props) {

    const [_, setCookie] = useCookies();

    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    const navigator = useNavigate();

    const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' : 
            result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            result.code === 'TF' ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        const { accessToken, expiration } = result as SignInResponseDto;
        const expires = new Date(Date.now() + (expiration * 1000));
        setCookie(ACCESS_TOKEN, accessToken, { path: '/', expires });

        navigator('/home');
    };

    const onUserEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
    };
    const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);
    };
    
    const onSignUpClickHandler = () => {
        if (!userEmail || !userPassword) return;

        const requestBody: SignInRequestDto = {
            userEmail, userPassword
        };

        signInRequest(requestBody).then(signInResponse);
    };

    return (
        <div className='form'>
            <div className="card-body">
                <h3>로그인</h3>
                <div className="input-box">
                    <label>이메일 주소</label>
                    <div className="input">
                        <input type="text" placeholder="이메일 주소를 입력해주세요" value={userEmail} onChange={onUserEmailChangeHandler} />
                    </div>
                </div>
                <div className="input-box">
                    <label>비밀번호</label>
                    <div className="input">
                        <input type="password" placeholder="비밀번호를 입력해주세요" value={userPassword} onChange={onUserPasswordChangeHandler} />
                    </div>
                </div>
            </div>
            <div className="card-foot">
                <button onClick={onSignUpClickHandler}>로그인</button>
                <p>신규 사용자이신가요? <span className="link" onClick={() => onPathChange('sign-up')}>회원가입</span></p>
            </div>
        </div>
    )
}
