import { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";
import LoginScreen from "./components/LoginScreen";
import { googleLogout } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import PoastedFeedbacks from "./components/PoastedFeedbacks";
function App() {
  const [login, setLogin] = useState(false);
  const [allFeedback, setAllFeedback] = useState(null);
  const getFeedbacks = async () => {
    const URI_SLUG = "/api/v1/feedback/getfeedback";
    const URI_HEAD = import.meta.env.VITE_BACKEND_URI;
    try {
      const response = await fetch(`${URI_HEAD}${URI_SLUG}`);
      const data = await response.json();
      setAllFeedback(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (login) {
      localStorage.setItem("loginInfo", JSON.stringify(login));
    } else {
      const data = localStorage.getItem("loginInfo");
      setLogin(JSON.parse(data));
    }

    getFeedbacks();
  }, [login]);

  return login ? (
    <main className='min-h-screen flex flex-col gap-4 items-center p-3'>
      <Toaster />
      <header className='w-full flex justify-end'>
        <button
          onClick={() => {
            localStorage.removeItem("loginInfo");
            googleLogout();
            setLogin(false);
          }}
          className='border border-red-500 p-3 duration-300 rounded-md hover:bg-red-600 hover:text-white'>
          Log out
        </button>
      </header>
      <h1 className='text-5xl'>Feedback App</h1>
      <div className='w-full flex flex-col items-center'>
        <h3>Tell us about our products</h3>
        <FeedbackForm getFeedback={getFeedbacks} login={login} />
        <hr className='w-[80%] h-[2px] mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-400' />
        <PoastedFeedbacks data={allFeedback} />
      </div>
    </main>
  ) : (
    <LoginScreen setLogin={setLogin} />
  );
}

export default App;

