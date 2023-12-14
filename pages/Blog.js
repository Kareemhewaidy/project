import React, { useState } from "react";
import Meta from "@/components/Meta";
import Styles from '@/styles/Blog.module.css';

const Blog = () => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    subject: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch API to save data to server
      const response = await fetch('/api/saveBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Blog saved successfully!');
        
      } else {
        console.error('Error saving blog.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Meta title="Add Blog" />
      <form className={Styles.form} onSubmit={handleFormSubmit}>
        <br />
        <label htmlFor="uname"><b>Username</b></label>
        <input type="text" name="username" placeholder="Enter Username" required className={Styles.input} onChange={handleInputChange} />

        <label htmlFor="title"><b>Title</b></label>
        <input type="text" name="title" placeholder="Enter Blog Title" required className={Styles.input} onChange={handleInputChange} />

        <label htmlFor="subject"><b>Subject</b></label>
        <input type="text" name="subject" placeholder="Write Something.." required className={Styles.input} onChange={handleInputChange} />

        <button type="submit" className={Styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default Blog;