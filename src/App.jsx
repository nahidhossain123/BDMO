import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const categoryOptions = {
  ডিজিটাল: ['ডোমেইন ও হোস্টিং', 'প্রমোশন (অনলাইন)', 'স্টিমইয়ার্ড ও জুম সাবস্ক্রিপশন'],
  বাচাই: ['অনলাইন বাচাই অলিম্পিয়াড'],
  আঞ্চলিক: ['উৎসব আয়োজনের স্থানীয় খরচ (প্রতিনিধি)', 'স্বেচ্ছাসেবক ও অতিথি বিল', 'আঞ্চলিক লজিস্টিকস ','ঢাকা আঞ্চলিক উৎসব','প্রশ্ন ক্যাম্প'],
  জাতীয়: ['জাতীয় উৎসব'],
  কেন্দ্রীয়: ['কমিটি মিটিং', 'স্বেচ্ছাসেবক মিটিং', 'অন্যান্য'],
  ক্যাম্প: ['ক্যাম্প'],
  আইএমও: ['টিকিট', 'ভিসা প্রসেসিং', 'আইএমও ফি','প্রেস কনফারেন্স','আইএমও ক্যাম্প','স্থানীয় খরচ'],
  সন্মানী: ['স্বেচ্ছাসেবক সম্মানী', 'বেতন ও ভাতা'],
};

function App() {
  const [formData, setFormData] = useState({
    date: new Date(),
    description: '',
    amount: ''
  });
  const [serial, setSerial] = useState(2500);
  const [category, setCategory] = useState('ডিজিটাল');
  const [subCategory, setSubCategory] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    localStorage.setItem('myDate',parseInt(serial)+1)
    const payload = {
      serial:serial,
      date:formData.date,
      cat:category,
      sub:subCategory,
      desc:formData.description,
      amount:formData.amount
    }
    const url = "https://script.google.com/macros/s/AKfycbzWlWSfsgDIerX44gDQuUERs2OxzBegptmdiqDP5gVr4r1c26T4QD-X-GG-ZOIFp3eGgQ/exec"
    fetch(url,{
      method:"POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(payload)
    }).then(res=>res.text()).then(data=>{
      setSerial(parseInt(serial)+1)
      alert(data)
    }).catch(error=>console.log(error))
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    setSubCategory(''); // reset subCategory on change
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  useEffect(() => {
    const savedDate = localStorage.getItem('myDate');
    if (savedDate) {
      setSerial(savedDate);
    }
  }, []);
console.log('Ctegory',serial,category,subCategory)
  return (
    <div className=''>
     <form
      onSubmit={handleSubmit}
      className="container mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4 mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">BDMO Form</h2>

      <div>
        <label className="block text-start font-medium text-gray-700 mb-1">Serial</label>
        <input
          type="number"
          name="serial"
          value={serial}
          onChange={(e)=>setSerial(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-start font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-start font-medium text-gray-700 mb-1">Category</label>
        <select
        name="category"
        value={category}
        onChange={handleCategoryChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="" disabled>Select a category</option>
        <option value="ডিজিটাল">ডিজিটাল </option>
        <option value="বাচাই">বাচাই অলিম্পিয়াড</option>
        <option value="আঞ্চলিক">আঞ্চলিক উৎসব</option>
        <option value="জাতীয়">জাতীয় উৎসব</option>
        <option value="কেন্দ্রীয়">কেন্দ্রীয় খরচ</option>
        <option value="ক্যাম্প">ক্যাম্প</option>
        <option value="আইএমও">আইএমও</option>
        <option value="সন্মানী">সন্মানী</option>
      </select>
      </div>

      <div>
        <label className="block text-start font-medium text-gray-700 mb-1">Sub Category</label>
        <select
        name="category"
        value={subCategory}
        onChange={handleSubCategoryChange}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
      >
            {categoryOptions[category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
      </select>
      </div>

      <div>
        <label className="block text-start font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="block text-start font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
  )
}

export default App
