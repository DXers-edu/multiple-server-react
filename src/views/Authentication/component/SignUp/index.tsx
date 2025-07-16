import { useState, type ChangeEvent } from "react";
import { signUpRequest } from "src/apis";
import { SignUpRequestDto } from "src/apis/dto/request/auth";
import { ResponseDto } from "src/apis/dto/response";

interface Props {
    onPathChange: (path: 'sign-in' | 'sign-up') => void;
}

export default function SignUp({ onPathChange }: Props) {

    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');

    const signUpResponse = (responseBody: ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' :
            responseBody.code === 'EEU' ? '이미 사용중인 이메일입니다' :
            responseBody.code === 'VF' ? '모두 입력해주세요' : '';
    
        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        onPathChange('sign-in');
    };

    const onUserEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserEmail(value);
    };
    const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);
    };
    const onUserPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPasswordCheck(value);
    };

    const onSignUpClickHandler = () => {
        if (!userEmail || !userPassword || !userPasswordCheck) return;
        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(userEmail);
        const isEqualPassword = userPassword === userPasswordCheck;
        if (!isEmailPattern || !isEqualPassword) return;

        const requestBody: SignUpRequestDto = {
            userEmail, userPassword
        };

        signUpRequest(requestBody).then(signUpResponse);
    };

    return (
        <div className='form'>
            <div className="card-body">
                <h3>회원가입</h3>
                <div className="input-items">
                    <div className="input-box">
                        <label>이메일 주소*</label>
                        <div className="input">
                            <input type="text" placeholder="이메일 주소를 입력해주세요"  value={userEmail} onChange={onUserEmailChangeHandler}/>
                        </div>
                    </div>
                    <div className="input-box">
                        <label>비밀번호*</label>
                        <div className="input">
                            <input type="password" placeholder="비밀번호를 입력해주세요" value={userPassword} onChange={onUserPasswordChangeHandler} />
                        </div>
                    </div>
                    <div className="input-box">
                        <label>비밀번호 확인*</label>
                        <div className="input">
                            <input type="password" placeholder="비밀번호를 다시 입력해주세요" value={userPasswordCheck} onChange={onUserPasswordCheckChangeHandler} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-foot">
                <button onClick={onSignUpClickHandler}>회원가입</button>
                <p>이미 계정이 있으신가요? <span className="link" onClick={() => onPathChange('sign-in')}>로그인</span></p>
            </div>
        </div>
    )
}
