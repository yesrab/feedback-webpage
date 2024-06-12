import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);

  return login ? (
    <main className='min-h-screen flex flex-col gap-4 items-center p-3'>
      <header className='w-full flex justify-end'>
        <button
          onClick={() => {
            setLogin(false);
          }}
          className='border p-3 duration-300 rounded-md  hover:bg-slate-200'>
          Log out
        </button>
      </header>
      <h1 className='text-5xl '>Feedback App</h1>
    </main>
  ) : (
    <main className='min-h-scree flex flex-col gap-4 items-center p-3'>
      <h1 className='text-5xl text-center'>Please Login</h1>
      <button
        onClick={() => {
          setLogin(true);
        }}
        className='border duration-300 rounded-md w-[20%] hover:border-2 hover:bg-slate-200'>
        Login
      </button>
    </main>
  );
}

export default App;

