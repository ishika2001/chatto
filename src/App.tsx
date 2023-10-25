import './App.css';
import { HomePage } from './templates/HomePage';
import '../src/styles/global.css'
import { Toaster, resolveValue } from "react-hot-toast";
import { ColorModeScript, ColorModeProvider } from "@chakra-ui/color-mode";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationsPage from './templates/ApplicationPage';
import AudioGenerationPage from './templates/AudioGenerationPage';
import CheckoutPage from './templates/CheckoutPage';
import CodeGenerationPage from './templates/CodeGenerationPage';
import EducationFeedbackPage from './templates/EducationFeedbackPage';
import GenerationSocialsPostPage from './templates/GenerationSocialsPostPage';
import PhotoEditingPage from './templates/PhotoEditingPage';
import PricingPage from './templates/PricingPage';
import SignInPage from './templates/SignInPage';
import ThanksPage from './templates/ThanksPage';
import UpdatesAndFaqPage from './templates/UpdatesAndFaqPage';
import VideoGenerationPage from './templates/VideoGenerationPage';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AdminPanel from './templates/AdminPanel';
import AdminDashboard from './templates/AdminDashboard';
import { AdminLogin } from './templates/AdminLogin';
import { VerifyCode } from './templates/AdminLogin/VerifyCode';
import { VerifyAdminOTP } from './templates/AdminLogin/VerifyAdminOTP';

export const UserContext = createContext<any | null>(null);

function App() {
  const [mainData, setMainData] = useState<any[]>([]);
  const [ip, setIP] = useState<string>("")
  const [email, setemail] = useState<string>("");
  const [emailError, seteEmailError] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [Code, setCode] = useState<string>("");
  const [ip_, setIP_] = useState<string>("")
  const [identity, setIdentity] = useState<string>("");
  const [adminEmailError, setAdminEmailError] = useState<string>("");
  const [adminPasswordError, setAdminPasswordError] = useState<string>("");
  // const [renderTagData, setRenderTagData] = useState<boolean>(false)
  const [passwordError, setpasswordError] = useState<string>("");
  const [visibleAddBtn, setVisibleAddBtn] = useState<boolean>(false);

  const value = {
    visibleAddBtn,
    setVisibleAddBtn,
    passwordError, 
    setpasswordError,
    adminPasswordError,
    setAdminPasswordError,
    emailError,
    seteEmailError,
    mainData,
    setMainData,
    email,
    setemail,
    ip,
    OTP,
    setOTP,
    adminEmailError,
    setAdminEmailError,
    Code,
    setCode,
    identity,
    setIdentity,
    ip_,
    // renderTagData,
    // setRenderTagData
  };

  const getData = async () => {
    try{
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP(res.data.ip);
    }
    catch(error){
      console.log(error);
    }
    
  };
  const getIdentityData = async () => {
    try{
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP_(res.data.ip);
    }
    catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getIdentityData();
  }, []);

  return (
    <main className="font-sans">
      <style>
        {`
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-karla: 'Karla', sans-serif;
          }

          @import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=block');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=block');

          html {
            font-family: var(--font-karla);
          }

          #headlessui-portal-root {
            font-family: var(--font-inter);
          }
        `}
      </style>
      <ColorModeProvider>
        <ColorModeScript
          initialColorMode="system"
          key="chakra-ui-no-flash"
          storageKey="chakra-ui-color-mode"
        />
        <UserContext.Provider value={value}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/sign-in' element={<SignInPage />} />
              <Route path='/admin-login' element={<AdminLogin />} />

              <Route path='/verifyAdminOTP' element={<VerifyAdminOTP />} />
              <Route path='/verifyCode' element={<VerifyCode />} />

              {/* <Route path='/verifyCode' element={<VerifyCode />} /> */}
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
              <Route path='/admin' element={<AdminPanel />} /> 
              <Route path='/applications' element={<ApplicationsPage />} />
              <Route path='/audio-generation' element={<AudioGenerationPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/code-generation' element={<CodeGenerationPage />} />
              <Route path='/education-feedback' element={<EducationFeedbackPage />} />
              <Route path='/generation-socials-post' element={<GenerationSocialsPostPage />} />
              <Route path='/photo-editing' element={<PhotoEditingPage />} />
              <Route path='/pricing' element={<PricingPage />} />
              <Route path='/thanks' element={<ThanksPage />} />
              <Route path='/updates-and-faq' element={<UpdatesAndFaqPage />} />
              <Route path='/video-generation' element={<VideoGenerationPage />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
        <Toaster
          containerStyle={{
            bottom: 40,
            left: 20,
            right: 20,
          }}
          position="bottom-center"
          gutter={10}
          toastOptions={{
            duration: 2000,
          }}
        >
          {(t) => (
            <div
              style={{
                opacity: t.visible ? 1 : 0,
                transform: t.visible
                  ? "translatey(0)"
                  : "translatey(0.75rem)",
                transition: "all .2s",
              }}
            >
              {resolveValue(t.message, t)}
            </div>
          )}
        </Toaster>
      </ColorModeProvider>
    </main>
  );
}
export default App;