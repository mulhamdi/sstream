import React, { useState } from 'react';

export default function AnimeSynopsis({ title, synopsis }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (synopsis === 'N/A')
    return (
      <a
        href={`https://www.google.com/search?q=sinopsis+${title}`}
        target='_blank'
      >
        <button className='btn-download' type='button'>
          Cari Sinopsis
        </button>
      </a>
    );

  return (
    <div>
      {/* CREDIT: https://flowbite.com/docs/components/modal/#default-modal */}
      {/* Modal toggle */}
      <button
        onClick={() => setIsModalOpen(true)}
        className='btn-download'
        type='button'
      >
        Tampilkan Sinopsis
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id='synopsis-modal'
          tabIndex='-1'
          aria-hidden='true'
          className='fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-semiBlack-600 bg-opacity-50'
        >
          <div className='relative max-h-full w-full max-w-2xl p-4'>
            {/* Modal content */}
            <div className='relative rounded-lg bg-semiBlack-500 shadow'>
              {/* Modal header */}
              <div className='flex items-center justify-between rounded-t border-b border-semiBlack-700 p-4 md:p-5'>
                <h3 className='text-xl font-semibold text-white'>Sinopsis</h3>
                <button
                  type='button'
                  className='bg-transparent ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white hover:bg-semiBlack-400 hover:text-blue'
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className='h-3 w-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className='space-y-4 p-4 md:p-5'>
                {synopsis.map((text, index) => (
                  <p
                    key={`sinopsis${index}`}
                    className='loading-relaxed text-base text-white'
                  >
                    {text}
                  </p>
                ))}
              </div>
              {/* Modal footer */}
              <div className='flex items-center rounded-b border-t border-semiBlack-400 p-4 md:p-5'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='btn-close'
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
