import { PrivateRoute } from "@/components/routing/PrivateRoute";
import Image from "next/image";
import Head from "next/head";
export default function Home() {
  return (
    <PrivateRoute>
      <Head>
        <title>Home | Bug tracker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Welcome to the best bug tracker tool!
        </h1>
      </div>
      <div className="flex flex-wrap flex-col items-center">
        <Image
          src="https://zdzsyykqcghvtgnapyon.supabase.co/storage/v1/object/sign/bugtracker/pitch.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJidWd0cmFja2VyL3BpdGNoLnN2ZyIsImlhdCI6MTYxODIxODk0MiwiZXhwIjoxOTMzNTc4OTQyfQ.kopJB87xIEMAYgeDu0KiN3x4VdLoYccdTcLPNt8tg9M"
          width="480"
          height="435"
          alt="Bug tracker"
        />
        {/* <div className="xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
              Shooting Stars
            </h2>
            <p className="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waist co, subway tile
              poke farm.
            </p>
          </div>
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
              The Catalyzer
            </h2>
            <p className="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waist co, subway tile
              poke farm.
            </p>
          </div>
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
              Neptune
            </h2>
            <p className="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waist co, subway tile
              poke farm.
            </p>
          </div>
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
              </svg>
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
              Melanchole
            </h2>
            <p className="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waist co, subway tile
              poke farm.
            </p>
          </div>
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
              Bunker
            </h2>
            <p className="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waist co, subway tile
              poke farm.
            </p>
          </div>
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
              Ramona Falls
            </h2>
            <p className="leading-relaxed text-base">
              Fingerstache flexitarian street art 8-bit waist co, subway tile
              poke farm.
            </p>
          </div>
        </div> */}
      </div>
    </PrivateRoute>
  );
}
