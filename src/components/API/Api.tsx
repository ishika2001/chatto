import { toast } from "react-hot-toast";
import { getChecked } from "../../slices/checkSlice";
import { isLoading } from "../../slices/loginSlice";
import { FormInputField } from "../AddNewTagModal";
import axios from "axios";
import {
  attempCount,
  verfifyChecked,
} from "../../slices/checkVerify";
import Notify from "../Notify";

export async function callLoginAPI(
  dispatch: any,
  email: string,
  ip: string,
  setemail: React.Dispatch<React.SetStateAction<string>>,
  emailGet: (payload: any) => void
) {
  dispatch(getChecked(true));
  toast((t) => (
    <Notify iconCheck>
      <div className="ml-3 h6">OTP send!</div>
    </Notify>
  ));
  try {
    const response = await axios.post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/userLogin", {
      email: email,
    });
    const dataEmail = response.data;
    dispatch(emailGet({ dataEmail, email }));
    setemail(dataEmail.email);
  } catch (error) {
    console.log(error);
  }
}
export async function callVerifiyAPI(
  dispatch: any,
  email: string,
  OTP: string,
  navigate: (path: string) => void,
  setWorngOtpMsg: React.Dispatch<React.SetStateAction<string>>,
  setOTP: React.Dispatch<React.SetStateAction<string>>
) {
  try {
     await axios.post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/verifyOtp", {
      email: email,
      otp: OTP,
    });
    navigate("/");
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">OTP verified!</div>
      </Notify>
    ));
    setOTP("");
  } catch (error) {
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">Invalid OTP!</div>
      </Notify>
    ));
    setWorngOtpMsg("Invalid OTP");
    setOTP("");
  }
}
export async function callAdminLoginAPI(
  dispatch: any,
  email: string,
  ip_: string,
  setemail: React.Dispatch<React.SetStateAction<string>>,
  emailGet: (payload: any) => void,
) {
  dispatch(getChecked(true));
  toast((t) => (
    <Notify iconCheck>
      <div className="ml-3 h6">OTP sent!</div>
    </Notify>
  ));
  try {
    const response = await axios.post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/masterLogin", {
      email: email,
    });
    const dataEmail = response.data;
    dispatch(emailGet({ dataEmail, email }));
    setemail(dataEmail.email);
  } catch (error) {
    console.log(error);
  }
}
export async function callOTPVerifiyAPI(
  dispatch: any,
  email: string,
  Code: string,
  veriftGet: (payload: any) => void,
  navigate: (path: string) => void,
  setWorngOtpMsg: React.Dispatch<React.SetStateAction<string>>,
  atemptCount: number,
  setCode: React.Dispatch<React.SetStateAction<string>>
) {
  try {
     await axios.post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/verifyOtp", {
      email: email,
      otp: Code,
    });
    // const Token = response.data.token;
    // navigate("/admin-dashboard");
    navigate("/verifyCode");
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">OTP verified!</div>
      </Notify>
    ));
    setCode("");
  } catch (error) {
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">Invalid OTP!</div>
      </Notify>
    ));
    dispatch(isLoading(false));
    dispatch(verfifyChecked(true));
    dispatch(attempCount(atemptCount - 1));
    setWorngOtpMsg("Invalid OTP");
    setCode("");
  }
}
// export async function callCodeVerifiyAPI(
//   dispatch: any,
//   email: string,
//   Code: string,
//   veriftGet: (payload: any) => void,
//   navigate: (path: string) => void,
//   setWorngOtpMsg: React.Dispatch<React.SetStateAction<string>>,
//   atemptCount: number,
//   setCode: React.Dispatch<React.SetStateAction<string>>
// ) {
//   try {
//     await axios.post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/verifyCode", {
//       email: email,
//       code: Code,
//     });
//     navigate("/admin-dashboard");
//     toast((t) => (
//       <Notify iconCheck>
//         <div className="ml-3 h6">Code verified!</div>
//       </Notify>
//     ));
//     setCode("");
//   } catch (error) {
//     toast((t) => (
//       <Notify iconCheck>
//         <div className="ml-3 h6">Invalid Code!</div>
//       </Notify>
//     ));
//     dispatch(isLoading(false));
//     dispatch(verfifyChecked(true));
//     dispatch(attempCount(atemptCount - 1));
//     setWorngOtpMsg("Invalid Code");
//     setCode("");
//   }
// }
export async function callCodeVerifiyAPI(
  dispatch: any,
  email: string,
  Code: string,
  veriftGet: (payload: any) => void,
  navigate: (path: string) => void,
  setWorngOtpMsg: React.Dispatch<React.SetStateAction<string>>,
  atemptCount: number,
  // setCode: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    await axios.post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/verifyCode", {
      email: email,
      code: Code,
    });
    navigate("/admin-dashboard");
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">Code verified!</div>
      </Notify>
    ));
    // setCode([""]);
  } catch (error) {
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">Invalid Code!</div>
      </Notify>
    ));
    dispatch(isLoading(false));
    dispatch(verfifyChecked(true));
    dispatch(attempCount(atemptCount - 1));
    setWorngOtpMsg("Invalid Code");
    // setCode([""]);
  }
}
export async function callAddTagAPI(
  formInputField: FormInputField,
  setFormInputField: React.Dispatch<React.SetStateAction<FormInputField>>,
  initialVal: FormInputField,
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    await axios.post(
      "https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/addTags",
      formInputField,
      {
        headers: {
          // Add any headers if needed
        },
      }
    );
    setFormInputField(initialVal);
    setVisibleModal(false);
    toast((t) => (
      <Notify iconCheck>
        <div className="ml-3 h6">Tag Added!</div>
      </Notify>
    ));
    // console.log("API response:", response.data);
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
export async function getAllTags(
  setMainData: React.Dispatch<React.SetStateAction<any[]>>,
  setVisibleAddBtn: React.Dispatch<React.SetStateAction<boolean>>
  ) {
  await axios
    .post("https://2c21-2401-4900-1c19-21bc-d633-a051-bb79-79ed.ngrok-free.app/api/getAllTags")
    .then((response) => {
      setVisibleAddBtn(true);
      console.log('====================================');
      console.log("getAllTags data", response.data.data);
      console.log('====================================');
      setMainData(response.data.data);
    })
    .catch((e) => {
      console.log(e);
    });
}


