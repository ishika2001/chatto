import React, { useContext, useState } from "react";
import { verifyPinGet } from "../../../slices/pinSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callAdminLoginAPI, callOTPVerifiyAPI } from "../../../components/API/Api";
import { UserContext } from "../../../App";
import { identityGet } from "../../../slices/identitySlice";

export const VerifyAdminOTP: React.FC = () => {
  const navigate = useNavigate();
  const { setIdentity, ip_ } = useContext(UserContext);
  const [passwordError, setpasswordError] = useState<string>("");
  const dispatch = useDispatch();
  const [AdminOTP, setAdminOTP] = useState<string>("");
  const identity = useSelector((state: any) => {
    return state.identity.email;
  });
  const count = useSelector((state: any) => state.checkedVerifys.count);
  const verifyAdminOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (AdminOTP === "") {
      setAdminOTP("Enter OTP");
    }
    else if (AdminOTP.length < 6) {
      setpasswordError(" Enter correct OTP");
    }
    else {
      callOTPVerifiyAPI(dispatch, identity, AdminOTP, verifyPinGet, navigate, setpasswordError, count, setAdminOTP);
    }
  };

  const handlepasswordchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpasswordError("");
    setAdminOTP(e.target.value);
  };

  const clearPIN = () => {
    setAdminOTP("");
    setpasswordError("");
  };
  const handleResend = () => {
    setpasswordError("");
    setAdminOTP("");
    callAdminLoginAPI(
      dispatch,
      identity,
      ip_,
      setIdentity,
      identityGet,
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-96 shadow-2xl dark:shadow-neutral-800 mt-24">
          <div className="p-4">
            <h1 className="text-center font-bold text-xl mb-2">Verify Your OTP</h1>
            <hr className="w-full" />
            <p className="mt-4">
              You've received a secured OTP to:
            </p>
            <p>
              To open this secure link, we'll need you to enter the OTP that
              item was shared to.
            </p>
            <div className={`mt-4 ${passwordError ? 'mb-0' : 'mb-4'} flex  border-red-500 dark:bg-n-5 rounded`}>
              <input
                type="password"
                className="w-full p-2 rounded outline-none"
                placeholder="Enter OTP"
                value={AdminOTP}
                onChange={handlepasswordchange}
              />
              <div className="p-2">
                <img src="./clear.svg" alt="clear" onClick={clearPIN} />
              </div>
            </div>
            <div className="emailError mt-1 mb-3 text-red-600"> {passwordError}</div>
            <button
              className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 outline-none"
              onClick={verifyAdminOTP}>
              Verify OTP
            </button>
            <Link to={""} className="flex justify-center mt-2 text-blue-600" onClick={handleResend}>Resend OTP</Link>
            <p className="mt-4">
              By clicking Next you allow Brainwave to use your email address in
              accordance with their privacy statement. Brainwave has not provided
              links to their terms for you to review.
            </p>
          </div>
          <div className="p-4"></div>
        </div>
      </div>
    </div>
  );
};
