import { useState, useContext } from "react";
import Field from "../../../../components/Field";
import { callAdminLoginAPI, callCodeVerifiyAPI, callLoginAPI } from "../../../../components/API/Api";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../App'
import { emailGet } from "../../../../slices/loginSlice";
import { verifyGet } from "../../../../slices/verifySlice";
import { attempCount } from "../../../../slices/checkVerify";

type SignInProps = {
    onClick: () => void;
    setPasswordField: React.Dispatch<React.SetStateAction<boolean>>;
    passwordField: boolean;
};
interface RootState {
    emails: {
        email: string;
        isLoadingCondition: boolean;
    };
    checkedVerifys: {
        count: number;
    };
}
const SignIn = ({ onClick, passwordField, setPasswordField }: SignInProps) => {
    const dispatch = useDispatch();
    const emails = useSelector((state: RootState) => state.emails.email);
    const count = useSelector((state: RootState) => state.checkedVerifys.count);
    const { email, setemail, ip, Code, setCode, adminEmailError, setAdminEmailError,adminPasswordError,
        setAdminPasswordError, } = useContext(UserContext);
    const navigate = useNavigate();


    const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemail(e.target.value);
        setAdminEmailError("");
    };

    const SendCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || email === "") {
            setAdminEmailError("Email is a required field.");
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setAdminEmailError("Invalid email entered.");
        } else {
            setPasswordField(true);
            callAdminLoginAPI(dispatch, email, ip, setemail, emailGet);
        }
    };

    const handleResend = () => {
        dispatch(attempCount(3))
        setAdminPasswordError("");
        setCode("");
        callLoginAPI(dispatch, emails, ip, setemail, emailGet);
    }

    const verifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!Code || Code === "") {
            setCode("Enter Code");
        }
        else if (Code.length < 6) {
            setAdminPasswordError(" Enter correct Code");
        }
        else {
            callCodeVerifiyAPI(dispatch, emails, Code, verifyGet, navigate, setAdminPasswordError, count);
        }
    };
    return (
        <form action="" >

            {passwordField ? (
                <>
                    <Field
                        className="mb-2"
                        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                        placeholder="Code"
                        icon="lock"
                        icon_close={true}
                        type="password"
                        value={Code}
                        onChange={(e: any) => setCode(e.target.value)}
                        required/>
                    <div className="mt-1 mb-3 text-red-600"> {adminPasswordError}</div>
                </>
            ) : (
                <>
                    <Field
                        className="mb-4"
                        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                        placeholder="Username or email"
                        icon="email"
                        icon_close={true}
                        value={email}
                        onChange={(e: any) => setemail(e.target.value)}
                        required
                    />
                    <div className="mt-1 mb-3 text-red-600"> {adminEmailError}</div>
                </>
            )}

            {passwordField ? (
                <button
                    className="mb-6 base2 text-primary-1 transition-colors hover:text-primary-1/90"
                    type="button"
                    onClick={onClick}
                >
                    Forgot password?
                </button>
            ) : null}

            {!passwordField ? (
                <button className="btn-blue btn-large w-full" type="submit" onClick={SendCode}>
                    Sign in with Brainwave
                </button>
            ) : (
                <button className="btn-blue btn-large w-full" type="button" onClick={verifyCode}>
                    Verify Code
                </button>
            )}
        </form>
    );
};

export default SignIn;
{/* <div className="resend" onClick={handleResend}> */ }
                    //     Resend Verification Code
                    // </div>