import { useContext } from "react";
import Field from "../../../../components/Field";
import { callLoginAPI, callVerifiyAPI } from "../../../../components/API/Api";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../App'
import { emailGet } from "../../../../slices/loginSlice";

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
    const { email, setemail, ip, emailError, seteEmailError, OTP, setOTP, passwordError, setpasswordError } = useContext(UserContext);
    const navigate = useNavigate();

    const SendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || email === "") {
            seteEmailError("Email is a required field.");
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            seteEmailError("Invalid email entered.");
        } else {
            setPasswordField(true);
            callLoginAPI(dispatch, email, ip, setemail, emailGet);
        }
    };
    const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemail(e.target.value);
        seteEmailError("");
    };
    const handlepasswordchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpasswordError("");
        setOTP(e.target.value);
    };


    // const handleResend = () => {
    //     setpasswordError("");
    //     setOTP("");
    //     callLoginAPI(dispatch, emails, ip, setemail, emailGet);
    // }

    const verifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        if (!OTP || OTP === "") {
            setOTP("Enter OTP");
        }
        else if (OTP.length < 6) {
            setpasswordError(" Enter correct OTP");
        }
        else {
            callVerifiyAPI(dispatch, emails, OTP, navigate, setpasswordError, setOTP);
        }
    };
    return (
        <form action="">

            {passwordField ? (
                <>
                    <Field
                        className="mb-2"
                        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                        placeholder="OTP"
                        icon="lock"
                        icon_close={true}
                        type="password"
                        value={OTP}
                        onChange={handlepasswordchange}
                        required
                    />
                    <div className="mt-1 mb-3 text-red-600"> {passwordError}</div>
                </>
            ) : (
                <>
                    <Field
                        className="mb-1"
                        classInput="dark:bg-n-7 dark:border-n-7 dark:focus:bg-transparent"
                        placeholder="Username or email"
                        icon="email"
                        icon_close={true}
                        value={email}
                        onChange={EmailHandler}
                        required
                    />
                    <div className="mt-1 mb-2 text-red-600"> {emailError}</div>
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
                <button className="btn-blue btn-large w-full" type="submit" onClick={SendOTP}>
                    Sign in with Brainwave
                </button>
            ) : (
                <button className="btn-blue btn-large w-full" type="button" onClick={verifyOTP}>
                    Verify OTP
                </button>
            )}
        </form>
    );
};

export default SignIn;
{/* <div className="resend" onClick={handleResend}> */ }
                    //     Resend Verification Code
                    // </div>