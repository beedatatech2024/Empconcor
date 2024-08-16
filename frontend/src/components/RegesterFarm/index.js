
import React, { useState } from 'react'
import './index.css'
import axios from 'axios'
import { baseUrl } from "../config";




const Regester = () => {
  const [name,setName]=useState('')
  const [position,setJobposition]=useState('')
  const [experience,setExperience]=useState('')
  const [location,setlocation]=useState('')
  const [salary,setSalary]=useState('')
  const [email,setEmail]=useState('')
  const [phoneNo,setNumber]=useState('')
  const [about,setAbout]=useState('')
  const [address,setAddress]=useState('')


  const submithandler = (event)=>{
    event.preventDefault()
      axios.post(`${baseUrl}user` , {name, position, experience, location, salary, email, phoneNo, about, address})
      .then(res => {
        alert("User Added Successfully")
      })
      .catch(err => console.log(err))
      setName('')
      setJobposition('')
      setExperience('')
      setlocation('')
      setSalary('')
      setEmail('')
      setNumber('')
      setAbout('')
      setAddress('')
  }
      

  return (
    <>
    <div id='register' className='Er-bg22'>
      <div className='Er-bg1'>
          <h1 className='Er-head1'>Employe Register</h1>
          <form onSubmit={submithandler} >
            <div className='Er-card1'>
              <input className='Er-input1' value={name}  type="text" placeholder='Enter Your Full Name' onChange={e =>setName(e.target.value)} required/><br/>
              <input className='Er-input1' value={position} type="text" placeholder='Enter Your  Job-Position' onChange={e =>setJobposition(e.target.value)} required/><br/>
              <input className='Er-input1' value={experience}  type="text" placeholder='Enter Your Experience' onChange={e =>setExperience(e.target.value)} required/><br/>
              <input className='Er-input1' value={location} type="text" placeholder='Enter Your Location' onChange={e =>setlocation(e.target.value)} /><br/>
              <input className='Er-input1' value={salary} type="date" placeholder='Enter Your Previous Salary' onChange={e =>setSalary(e.target.value)} required/><br/>
              <input className='Er-input1' value={email} type="text" placeholder='Enter Your Email' onChange={e =>setEmail(e.target.value)} required/><br/>
              <input className='Er-input1' value={phoneNo} type="text" placeholder='Enter Your contact-number' onChange={e =>setNumber(e.target.value)} required/><br/>
              <input className='Er-input1' value={about} type="text" placeholder='Enter How did you here about us' onChange={e =>setAbout(e.target.value)} required/><br/>
              <textarea className='Er-input12' value={address}  type="text" placeholder='Enter Your Address' onChange={e =>setAddress(e.target.value)} required/><br/>
              <button  className='Er-button1'>Submit</button>
              <p className='Er-para1'>By clicking "Submit" Register your Data In our Website</p>
            </div>
          </form>
      </div>
    </div>
    </>
  )
}

export default Regester