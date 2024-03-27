import React, { useState } from 'react'

function ContactForm() {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[query,setQuery]=useState('')
    const handelSubmit = async (e) => {
        e.preventDefault();
      
        const url = 'http://127.0.0.1:8000/api/contacts/';
      
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${name}`,
            email: `${email}`,
            query: `${query}`,
          }),
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.json();
         console.log(data);
         setName('')
         setEmail('')
         setQuery('')
        } catch (error) {
          console.error('Error submitting data:', error);
          // Handle error appropriately (e.g., show an error message)
        }
      };
  return (
    <>
       <div className="container mt-5">
    <h2 style={{textAlign: 'center'}}>GET IN TOUCH </h2>
    <p className="pb-2 border-bottom" style={{fontSize: '20px', textAlign:'center'}}>Contact us anytime you want. We are open to all suggestions from our audience.</p>
   <form onSubmit={handelSubmit}>
    <div className="mb-3 my-4">
        <label for="exampleFormControlInput1" className="form-label">Name</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Arijit Nandy" value={name} onChange={(e)=>setName(e.target.value)} />
    </div>

    <div className="mb-3 my-4">
        <label for="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>

<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Enter your message</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder ='message...' value={query} onChange={(e)=>setQuery(e.target.value)}></textarea>
</div>
<button className="btn btn-primary" >Submit</button>
</form>
</div>

    </>
  )
}

export default ContactForm
