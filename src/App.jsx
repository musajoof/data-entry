// App.jsx
import { useState } from 'react';
// import axios from 'axios';
import GambiaFlag from "./assets/Flag_of_The_Gambia.svg.png";
import CoatOfArm from "./assets/Coat_of_arms.svg.png";
import SearchImage from "./assets/search.svg";

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pob: '',
    dob: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleScan = (documentType) => {
    alert(`Please use the connected scanner to scan the ${documentType}.`);
  };

  const handleSaveApplicant = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const { firstName, lastName, pob, dob } = formData;

    if (!firstName || !lastName || !pob || !dob) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/saveApplicant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save applicant data.');
      }

      setSuccessMessage('Applicant data saved successfully.');
      setFormData({ firstName: '', lastName: '', pob: '', dob: '' });
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Network error. Please ensure the server is running.');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.get('http://localhost:3001/searchApplicant', {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching applicants:', error);
      setError('Error fetching search results. Make sure the server is running.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-slate-200 p-4 max-w-[1300px] mx-auto">
      <header className="flex justify-between items-center bg-white p-4 mb-6 rounded-lg shadow-sm">
        <img className="w-20" src={GambiaFlag} alt="Gambia flag" />
        <h1 className="font-bold text-xl text-center">Gambia Biometric Passport Data Entry</h1>
        <img className="w-20" src={CoatOfArm} alt="Coat of arm" />
      </header>

      <section className="border-2 border-slate-300 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>

        <div className="flex items-center w-full sm:w-96 h-12 bg-white p-2 border-2 rounded-md mb-8">
          <img className="w-5 mr-2" src={SearchImage} alt="search" />
          <input
            className="w-full outline-none text-slate-800"
            type="text"
            placeholder="Search by name or place of birth"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
            <ul className="space-y-3">
              {searchResults.map((applicant, index) => (
                <li key={index} className="border p-3 rounded-md bg-slate-50">
                  <p><strong>Name:</strong> {applicant.firstName} {applicant.lastName}</p>
                  <p><strong>Place of Birth:</strong> {applicant.pob}</p>
                  <p><strong>Date of Birth:</strong> {applicant.dob}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 font-semibold mb-4">{successMessage}</p>}

        <form onSubmit={handleSaveApplicant} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                className="w-full border rounded-md p-3 uppercase outline-none"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="w-full border rounded-md p-3 uppercase outline-none"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="pob" className="block font-medium mb-2">Place of Birth</label>
              <input
                type="text"
                id="pob"
                className="w-full border rounded-md p-3 uppercase outline-none"
                value={formData.pob}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                id="dob"
                className="w-full border rounded-md p-3 outline-none"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
            Save Applicant
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {["Indexes", "ID Documents", "Bank Receipt", "Alkalos Attestation", "Police Report", "Naturization", "Marriage Certificate", "Legal Guardian", "Enroll Receipt"].map((doc) => (
            <div key={doc} className="border-2 border-slate-400 p-4 rounded-lg text-center bg-slate-50">
              <div className="bg-gray-200 w-full h-52 mb-3 rounded-md"></div>
              <span className="font-semibold text-lg text-slate-700">{doc}</span>
              <div className="flex justify-between mt-4">
                <button className="w-20 h-9 bg-red-500 text-white rounded-md hover:bg-red-600">Cancel</button>
                <button
                  type="button"
                  onClick={() => handleScan(doc)}
                  className="w-20 h-9 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Scan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
