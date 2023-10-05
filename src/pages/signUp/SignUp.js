import styles from './SignUp.module.css';
import Nav from '../../components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import {AiFillCamera} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { countries } from '../../utils/countries';
import axios from 'axios';
import { useSignup } from '../../hooks/useSignup';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import emailjs from '@emailjs/browser';


export default function SignUp() {
  const form = useRef();
  const { authIsReady, user } = useAuth()
  const navigate = useNavigate()
  const {signUp, isPending, error} = useSignup()
  const [countryName, setCountryName] = useState("")
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    country: countryName,
    image: {},
    referral: '',
    gender: '',
    bitcoinAddress: '',
    ethereumAddress: '',
    usdtAddress: '',
    emailChecked: false,
    policyChecked: false,
    showPassword: false,
  });

  const [formError, setFormError] = useState({
    fullName: null,
    username: null,
    email: null,
    phoneNumber: null,
    country: null,
    image: null,
    gender: null,
    referral: null,
    bitcoinAddress: null,
    usdtAddress: null,
    emailChecked: null,
    policyChecked: null,
  })


  // handling change for input fields
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling password toggle mode
  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword });
  };

  // handling mouse event 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handling image upload
  const handleImageUpload = (e) => {
    setValues({...values, image: e.target.files[0] });
  };

  // handling checkbox
  const handleCheckBox = (prop) => (e) => {
    setValues({...values, [prop]: e.target.checked});
    setFormError({ ...formError, [prop]: null })
  };


  // handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      country: values.country,
      image: values.image,
      referral: values.referral,
      password: password,
      gender: values.gender,
      bitcoinAddress: values.bitcoinAddress,
      ethereumAddress: values.ethereumAddress,
      usdtAddress: values.usdtAddress,
    };

    // validating form
    if(values.fullName === "") {
      setFormError({...formError, fullName: "Full name is invalid"});
      return
    }

    if(values.fullName.length < 3) {
      setFormError({...formError, fullName: "Full name is too short"});
      return
    }

    if(values.username === "") {
      setFormError({...formError, username: "Username is invalid"});
      return
    }

    if(values.username.length < 3) {
      setFormError({...formError, username: "Username is too short"});
      return
    }

    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }

    if(values.phoneNumber === "" || values.phoneNumber.length < 5) {
      setFormError({...formError, phoneNumber: "Phone Number is invalid"});
      return
    }

    if(values.country === "") {
      setFormError({...formError, country: "Select Your Country"});
      return
    }

    if(values.gender === "") {
      setFormError({...formError, gender: "Select Your Gender"});
      return
    }

    if(values.image === undefined) {
      setFormError({...formError, image: "Image is invalid"});
      return
    }

    if(values.image.size > 5000000) {
      setFormError({...formError, image: "Image size is too large"});
      return
    }

    if(password === "") {
      setFormError({...formError, password: "Password is invalid"});
      return
    }

    if(password.length < 6) {
      setFormError({...formError, password: "Password is too short"});
      return
    }

    if(values.policyChecked === false) {
      setFormError({...formError, policyChecked: "Please agree to the terms and conditions"});
      return
    }

    if(values.emailChecked === false) {
      setFormError({...formError, emailChecked: "Please agree to receive emails"});
      return
    }
    signUp(data);

    // sending data to server
    emailjs.sendForm('service_z98ilg7', 'template_vdnxqxc', form.current, '4XJeofv3Cw2pDpuHH')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });


    console.log(data);
  };


  useEffect(() => {
  axios.get('https://ipapi.co/json/').then((response) => {
      setCountryName(response.data.country_name);
  }).catch((error) => {
      console.log(error);
  });

  if(user) {
    navigate('/dashboard')
  }
  }, [user, navigate]);


  return ((authIsReady && !user) &&
    <div className="formCtn">
      <Nav black={true}/>
      <form className='form' onSubmit={handleSubmit} ref={form}>
        <h1>Create An Account</h1>
        <input 
        placeholder='Full Name'
        type="text" 
        {...(formError.fullName && {error: true, helperText: formError.fullName})}
        autoComplete='off'
        className="formInput" 
        onChange={handleChange("fullName")}/>

        <input 
        placeholder='Username'
        type="text" 
        autoComplete='off'
        {...(formError.username && {error: true, helperText: formError.username})}
        className="formInput" 
        onChange={handleChange("username")}/>

        <input 
        name='email'
        placeholder='Email'
        type="email" 
        autoComplete='off'
        {...(formError.email && {error: true, helperText: formError.email})}
        className="formInput" 
        onChange={handleChange("email")}/>

        <input
        name='phoneNumber'
        placeholder='Phone Number'
        type="tel"
        autoComplete='off'
        {...(formError.phoneNumber && {error: true, helperText: formError.phoneNumber})}
        className="formInput" 
        onChange={handleChange("phoneNumber")}/>

        <select
          value={values.country}
          onChange={handleChange('country')}
          className='formInput'
        >
          <option readOnly>Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
            ))}
        </select>


        <select
          value={values.gender}
          onChange={handleChange('gender')}
          className='formInput'>
          <option readOnly>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* password input and event */}
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            inputProps={{
              autoComplete: 'new-password',
            }}
            id="outlined-adornment-password"
            placeholder=''
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...(formError.password && {error: true, helperText: formError.password})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <div className={styles.upload}>
          <p>{values.image.name === undefined? "Upload Profile Picture" : `${values.image.name}`}</p>
          {formError.image && <p className={styles.error}>{formError.image}</p>}
          <input accept="image/*" 
          type="file" className="formInput" 
          onChange={handleImageUpload}/>
          <AiFillCamera />
        </div>

        <input 
        className="formInput" 
        onChange={handleChange("referral")}/>

        <p>Payment Details</p>

        <input 
        className="formInput" 
        onChange={handleChange("bitcoinAddress")}/>

        <input 
        className="formInput" 
        onChange={handleChange("ethereumAddress")}/>

        <input 
        className="formInput" 
        onChange={handleChange("usdtAddress")}/>

        <section className={styles.checkbox}>
          <input 
          type="checkbox" onClick={handleCheckBox("policyChecked")}/>
          <p>I agree to the <Link to="/policy">Terms and Condition</Link></p>
        </section>
        
        <section className={styles.checkbox}>
          <input 
          type="checkbox" onClick={handleCheckBox("emailChecked")}/>
          <p>I agree to receive third party email</p>
        </section>
        {formError.policyChecked && <p className="formError">{formError.policyChecked}</p>}
        {formError.emailChecked && <p className="formError">{formError.emailChecked}</p>}
        {error && <p className="formError">{error}</p>}

        {!isPending && <button className="bigBtn full">Sign Up</button>}
        {isPending && <button disabled className="bigBtn full load" style={{opacity: "50%"}}><PulseLoader color='#000000' size={10}/> </button>}
        
      <Link to="/login" className={styles.link}>Already have an account? Login</Link>
      </form>

    </div>
  );
}
