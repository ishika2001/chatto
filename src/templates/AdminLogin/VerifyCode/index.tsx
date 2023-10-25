import React, { useRef, useState } from "react";
import { verifyPinGet } from "../../../slices/pinSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callCodeVerifiyAPI } from "../../../components/API/Api";

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const identity = useSelector((state: any) => state.identity.email);
  const [passwordError, setpasswordError] = useState<string>("");
  const count = useSelector((state: any) => state.checkedVerifys.count);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const verifyOtp = () => {
    const code = otp.join("");
    if (code.length === 0) {
      setpasswordError("Enter Code");
    } else if (code.length < 6) {
      setpasswordError(" Enter correct Code");
    }
    else {
      callCodeVerifiyAPI(dispatch, identity, code, verifyPinGet, navigate, setpasswordError, count);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    setpasswordError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index > 0) {
      const prevInput = inputRefs.current[index];
      if (prevInput) {
        prevInput.focus();
      }
    }
    if (index === 1) {
      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      handleOtpChange(index - 1, "");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-96 shadow-2xl dark:shadow-neutral-800 mt-24">
          <div className="p-4">
            <h1 className="text-center font-bold text-xl mb-2">Verify Your Code</h1>
            <hr className="w-full" />
            <p className="mt-4">You've received a secured Code to:</p>
            <p>To open this secure link, we'll need you to enter the Code that item was shared to.</p>
            <div className="mt-4 flex justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-12 h-12 text-center border-2 border-n-4/25 dark:border-n-3 rounded-lg mx-1 shadow-xl outline-none"
                  maxLength={1}
                  value={digit}
                  autoComplete="off"
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  id={`otp-${index}`}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(input) => (inputRefs.current[index] = input)}/>
              ))}
            </div>
            <div className="emailError mt-1 mb-3 text-red-600">{passwordError}</div> {/* Display error message */}
            <button className="bg-blue-500 mt-2 outline-none text-white px-4 py-2 w-full rounded hover:bg-blue-600" onClick={verifyOtp}>
              Verify Code
            </button>
            <p className="mt-4">
              By clicking Next you allow Brainwave to use your email address in accordance with their privacy statement.
              Brainwave has not provided links to their terms for you to review.
            </p>
          </div>
          <div className="p-4"></div>
        </div>
      </div>
    </div>
  );
};