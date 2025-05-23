import React from 'react';

export default function Settings() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold">Settings</h3>
        </div>
        <div className="px-6 py-4 flex flex-col items-center gap-4">
          <span className="text-lightblue">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
          <p className="text-gray-600 text-lg text-center">
            Settings and configuration options will be available here soon.
          </p>
        </div>
      </div>
    </main>
  );
}