import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { identityGet } from "../../slices/identitySlice";
import { UserContext } from "../../App";
import { useDispatch } from "react-redux";
import { callAdminLoginAPI } from "../../components/API/Api";

export const AdminLogin: React.FC = () => {

  const [emailError, seteEmailError] = useState<string>("");
  const { identity, setIdentity, ip_ } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const EmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentity(e.target.value);
    seteEmailError("");
  };

  const SendPIN = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!identity || identity === "") {
      seteEmailError("Email is a required field.");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(identity)) {
      seteEmailError("Invalid email entered.");
    } else {
      navigate("/verifyAdminOTP");
      callAdminLoginAPI(
        dispatch,
        identity,
        ip_,
        setIdentity,
        identityGet,
      );
    }
  };

  const clearEmail = () => {
    setIdentity("");
    seteEmailError("");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-96 shadow-2xl dark:shadow-neutral-800 mt-24">
          <div className="p-4">
            <h1 className="text-center font-bold text-xl mb-2">Verify Your Identity</h1>
            <hr className="w-full" />
            <p className="mt-4">
              You've received a secured link to:
            </p>
            <p>
              To open this secure link, we'll need you to enter the email that
              item was shared to.
            </p>
            <div>
              <div className={` ${emailError ? 'border-red-500' : 'border-white'}`}>
                <div className={`mt-4 ${emailError ? 'mb-0' : 'mb-4'} flex dark:bg-n-5  rounded ${emailError ? 'border-red-500' : 'border-slate-600'}`}>
                  <input
                    type="text"
                    className="w-full p-2 rounded outline-none"
                    placeholder="Enter email"
                    value={identity || ""}
                    onChange={EmailHandler} />
                  <div className="p-2">
                    <img src="./clear.svg" alt="clear" onClick={clearEmail} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-1 mb-3 text-red-600"> {emailError}</div>
            <button
              className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
              onClick={SendPIN}
            >
              Next
            </button>
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
