import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import LoginScreen from "./components/LoginScreen";
import { googleLogout } from "@react-oauth/google";
function App() {
  const [login, setLogin] = useState(false);

  return login ? (
    <main className='min-h-screen flex flex-col gap-4 items-center p-3'>
      <header className='w-full flex justify-end'>
        <button
          onClick={() => {
            setLogin(false);
            googleLogout();
          }}
          className='border p-3 duration-300 rounded-md hover:bg-slate-200'>
          Log out
        </button>
      </header>
      <h1 className='text-5xl'>Feedback App</h1>
      <div className='w-full flex flex-col items-center'>
        <h3>Tell us about our products</h3>
        <FeedbackForm login={login} />
      </div>
    </main>
  ) : (
    <LoginScreen setLogin={setLogin} />
  );
}

export default App;

