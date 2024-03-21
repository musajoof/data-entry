import { useState } from 'react'
import GambiaFlag from "./assets/Flag_of_The_Gambia.svg.png";
import CoatOfArm from "./assets/Coat_of_arms.svg.png";
import SearchImage from "./assets/search.svg"

function App() {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

  // Update the scan button click handlers to send data to your server
const handleScan = async (documentType) => {
  try {
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName, // You need to define firstName and lastName in your state
        lastName,
        documentType,
      }),
    });

    if (response.ok) {
      console.log('Document scanned and uploaded successfully');
    } else {
      console.error('Error uploading document');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSaveApplicant = async() => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/saveApplicant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        // Add other form data as needed
      }),
    });

    if (response.ok) {
      console.log('Applicant data saved successfully');
    } else {
      console.error('Error saving applicant data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <>
      <div>
        <div className="bg-slate-200 p-2 w-[1300px] m-auto">
          <div className="flex justify-between items-center bg-white p-2 mb-5">
            <img className="w-20" src={GambiaFlag} alt={"Gambia flag"} />
            <h1 className="font-bold text-lg">Gambia Biometric Passport Data Entry</h1>
            <img className="w-20" src={CoatOfArm} alt={"Coat of arm"} />
          </div>
          <div className="border-2 border-slate-300 p-3 mt-4">
            <h1 className="relative -top-6 bg-white w-[145px]">Personal Informaton </h1>
            <div className='mx-auto flex justify-start items-center w-64 h-8 bg-white p-2 border-2 rounded-md'>
              <img className='w-4 mr-2'  src={SearchImage} alt="search Image" />
              <input className='w-60 bg-white rounded-md text-slate-800 outline-none' type="text" placeholder='Search'/>
            </div>
            <form className="w-full  rounded-md p-2 pt-10" action="">
              <div className='flex justify-between items-center'>
                <div className="w-1/2 flex items-center space-x-2 mt-2">
                  <label htmlFor="lastName" id="lastName" className="w-20">First Name</label>
                  <input
                      className="outline-none uppercase border border-slate-700 rounded-md p-2 text-lg w-3/4 h-10"
                      type="text"
                      name="lastName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                  />
                </div>
                <div className="w-1/2 flex items-center space-x-2 mt-2">
                  <label htmlFor="lastName" id="lastName" className="w-20">Last Name</label>
                  <input
                      className="outline-none uppercase border border-slate-700 rounded-md p-2 text-lg w-3/4 h-10"
                      type="text"
                      name="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                  />
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <div className="w-1/2 flex items-center space-x-2 mt-2">
                  <label htmlFor="lastName" id="lastName" className="w-20">P. O. B</label>
                  <input
                      className="outline-none uppercase border border-slate-700 rounded-md p-2 text-lg w-3/4 h-10"
                      type="text"
                      name="lastName"
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
                </div>
                <div className="w-1/2 flex items-center space-x-2 mt-2">
                  <label htmlFor="lastName" id="lastName" className="w-20">D. O. B</label>
                  <input
                      className="outline-none uppercase border border-slate-700 rounded-md p-2 text-lg w-3/4 h-10"
                      type="text"
                      name="lastName"
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5 border p-2 text-center ml-28">
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56" aria-required></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Indexes</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>      
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56" aria-required></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">ID Documents</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56" aria-required></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Bank Receipt</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56"></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Alkalos Attestation</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56"></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Police Report</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56"></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Naturization</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56"></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Marriage Certificate</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56"></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Legal Guidian</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
                <div className='border-2 border-slate-400 w-60 p-1 rounded-lg'>
                  <div className="bg-white w-56 h-56" aria-required></div>
                  <span className="mt-2 font-semibold text-lg text-slate-500">Enroll Receipt</span>
                  <div className='flex justify-between items-center mt-2 w-56'>
                    <button className='w-20 h-8 bg-red-500 text-white font-semibold rounded-md'>Cancel</button>
                    <button onClick={() => handleScan('Indexes')} className='w-20 h-8 bg-green-500 text-white font-semibold rounded-md'>Scan</button>
                  </div>
                </div>
              </div>

              <div className=' w-full text-center'>
                <button onClick={handleSaveApplicant} className='bg-green-600 w-3/4 h-10 mt-5 rounded-xl text-white font-bold text-xl m-auto'>Save Applicant</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
