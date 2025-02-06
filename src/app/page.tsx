'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("Hi! Please enter your name.");
  const [isCorrectName, setIsCorrectName] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  }

  const enterName = () => {
    const namae = name.toLowerCase();
    if (namae === "joy" || namae === "joemathel") {
      setMsg(`Hello, ${namae.charAt(0).toUpperCase() + namae.slice(1)}! Enter your password`);
      setIsCorrectName(true);
    } else {
      setMsg(`Sorry, ${namae.charAt(0).toUpperCase() + namae.slice(1)}! Please try again.`);
    }
  }

  const enterPass = () => {
    const passw = pass.toLowerCase();
    if (passw === "palagi") {
      setMsg("Correct");
      router.push("/question");
    } else {
      setWrongPass(true);
      setMsg("Sorry! Wrong password.");
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-red-100'>
      <img src='/assets/temp.png' className='h-[100px] md:h-[200px] floating'></img>
      <svg xmlns="http://www.w3.org/2000/svg" className='fill-white stroke-black stroke-[3px] floating' height='20'>
        <polygon points="80,0 65,50 35,50" />
      </svg>
      <div className='w-4/5 md:w-2/5 mb-4 text-xl md:text-4xl text-center border-[3px] border-black rounded-full py-3 px-5 bg-white floating font-bold'>{msg}</div>
      <div className='my-1'>
        <input id='name' type='text' placeholder='Name' className='text-black p-2' onChange={handleNameChange} 
          onKeyDown={
            (e) => {
              if (e.key === "Enter") {
                enterName()
              }
            }}>
          </input>
      </div>
      {isCorrectName && <div className='my-1'>
        <input id='pass' type='text' placeholder='Just guess' className='text-black p-2' onChange={handlePassChange} 
          onKeyDown={
            (e) => { 
              if (e.key == "Enter") {
                enterPass()
              }
            }}>
          </input>
      </div> }      
      <button className='my-4 text-xl md:text-2xl bg-blue-400 px-4 py-2 text-white font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={isCorrectName ? enterPass : enterName}>
        ENTER
      </button>
      {wrongPass && <div className='text-sm underline cursor-pointer' onClick={() => {setModal(true)}}>Want a hint?</div>}

      { modal && <div className='fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full flex items-center justify-center'>
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white mx-3">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Hint</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-lg text-gray-500">Our theme song</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
