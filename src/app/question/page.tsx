'use client';

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react';

export default function Question() {
  const [modal, setModal] = useState(true);
  const [modal2, setModal2] = useState(false);
  const [noButton, setNoButton] = useState(true);
  const [modalTitle, setModalTitle] = useState("Are you ready?");
  const [q, setQ] = useState(false);
  const [kick, setKick] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const router = useRouter();

  const playAudio = () => {
    const audio = new Audio("/assets/dadada.mp3");
    audio.play();
    setTimeout(() => {
      setModal(false);
    }, 3500);
  }

  useEffect(() => {
    const image = imgRef.current;
    if (!image) return;

    const handleAnimationEnd = () => {
      const palagi = new Audio("/assets/palagi.mp3");
      image.style.display = 'none';
      palagi.play();
      setQ(true);
    }

    image.addEventListener('animationend', handleAnimationEnd);

    return () => {
      image.removeEventListener('animationend', handleAnimationEnd); 
    };
  }, [modal]);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-red-100'>
      { !modal && <img ref={imgRef} src='/assets/puss.png' className='h-[400px] md:h-[500px] zooming'></img>}

      { modal && <div className='fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full flex items-center justify-center'>
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white mx-3">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">{modalTitle}</h3>
            <div className="flex justify-center mt-4">
              <button className="mx-1 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={playAudio}
              >
                Yes
              </button>
              { noButton && <button className="mx-1 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => {setNoButton(false); setModalTitle("I said, are you ready?")}}
              >
                No
              </button>}
            </div>
          </div>
        </div>
      </div>}

      { q && <div className='flex flex-col items-center justify-center h-screen bg-red-100'>
        <img src='/assets/q.png' className='h-[250px] md:h-[350px] '></img>
        <div className='mt-8 grid grid-cols-1 md:grid-cols-5 w-3/4'>
          <button className="my-1 md:mr-1 md:col-span-4 px-6 py-4  bg-blue-400 text-4xl font-bold text-white rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => {setModal2(true)}}
          >
            Yes
          </button>
          {<button className={`${kick ? "kicking" : ""} my-1 md:ml-1 md:col-span-1 px-4 py-2 bg-red-400 text-white text-sm font-thin rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300`}
            onClick={() => {setNoButton(false); setKick(true)}}
          >
            No
          </button>}
        </div>
      </div>}

      { modal2 && <div className='fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full flex items-center justify-center'>
        <div className="p-8 border w-96 shadow-lg rounded-md bg-white mx-3">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">I LOVE YOU!</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-lg text-gray-500">See you on Feb 14!</p>
              <p className="text-lg text-gray-500">🔫🍴⛸️🍰</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => {router.push("/");}}
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
