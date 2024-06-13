import React, { useState } from "react";
const BACKENDURI = import.meta.env.VITE_BACKEND_URI;
import toast from "react-hot-toast";
const FeedbackForm = ({ getFeedback, login }) => {
  const [formData, setFormData] = useState({
    name: login?.name || "",
    email: login?.email || "",
    summary: "",
    idea: "",
    topic: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitFeedback = async () => {
      const response = await fetch(
        `${BACKENDURI}/api/v1/feedback/submitFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    };

    toast.promise(submitFeedback(), {
      loading: "Submitting feedback...",
      success: (data) => {
        console.log(data);
        setFormData({
          name: login?.name || "",
          email: login?.email || "",
          summary: "",
          idea: "",
          topic: "",
        });
        getFeedback();
        return "Thank you for your feedback!";
      },
      error: (err) => `Error submitting form: ${err.toString()}`,
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='md:w-[50%] w-full flex flex-col items-center my-3 gap-2'>
      <p className='w-full'>Your Name: {login?.name}</p>
      <p className='w-full'>Your Email: {login?.email}</p>
      <input
        className='w-full border rounded-md border-black px-3 py-2'
        type='text'
        name='summary'
        placeholder='One sentence that summarizes your Experience'
        value={formData.summary}
        onChange={handleChange}
        required
      />
      <textarea
        name='idea'
        value={formData.idea}
        required
        onChange={handleChange}
        placeholder='Why your Idea is useful, who would benefit and how it should work?'
        className='border min-h-44 resize-none border-black px-3 py-2 rounded-md w-full'
      />
      <p className='w-full'>Please select the topic for your feedback :</p>
      <div className='flex flex-col md:flex-row px-2 gap-2 w-full mb-3'>
        <span className='flex items-center gap-3 '>
          <input
            required
            className='sr-only peer'
            type='radio'
            id='features'
            name='topic'
            value='topic_1djxlq13'
            onChange={handleChange}
            checked={formData.topic === "topic_1djxlq13"}
          />
          <label
            htmlFor='features'
            className='border hover:scale-105 bg-white duration-150 rounded-md px-3 py-1 peer-checked:bg-blue-200'>
            Product Features ⚙️
          </label>
        </span>
        <span className='flex items-center gap-3'>
          <input
            required
            type='radio'
            className='sr-only peer'
            id='pricing'
            name='topic'
            value='topic_5d9ok81d'
            onChange={handleChange}
            checked={formData.topic === "topic_5d9ok81d"}
          />
          <label
            className='border hover:scale-105 bg-white duration-150 rounded-md px-3 py-1 peer-checked:bg-green-200'
            htmlFor='pricing'>
            Product Pricing 💰
          </label>
        </span>
        <span className='flex items-center gap-3'>
          <input
            required
            type='radio'
            id='usablity'
            className='sr-only peer'
            name='topic'
            value='topic_63p08yev'
            onChange={handleChange}
            checked={formData.topic === "topic_63p08yev"}
          />
          <label
            className='border hover:scale-105 bg-white duration-150 rounded-md px-3 py-1 peer-checked:bg-red-200'
            htmlFor='usablity'>
            Product Usablity 💁‍♂️
          </label>
        </span>
      </div>
      <button
        type='submit'
        className='border duration-300 ease-in-out w-28 py-1 hover:bg-yellow-400 hover:text-white border-yellow-400 px-3 rounded-md'>
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
