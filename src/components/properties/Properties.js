import { useState } from 'react'
import s from "./Properties.module.css"
import millify from "millify"
import { useFirestore } from '../../hooks/useFirestore'
import Message from '../message/Message'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'




export default function Properties({props, rent, user, error}) {
  const navigate = useNavigate()
  const createdAt = new Date().toLocaleString()
  const { addDocument } = useFirestore("transactions")
  const [message, setMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(()=> {
    if(user){
      const docRef = doc(db, "profile", user.email)
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setUserDetails({id: doc.id, ...doc.data()})
        } else {
          console.log("No such document!")
        }
      })
      .catch(error => console.log("Error getting document:", error));
    }
  }, [user])

    const handleRent = (amount, desc) => {
      if (user) {
        if (amount < userDetails.bal.balance) {
          setSuccess(true) 
          setFailed(false)
          addDocument({ title: "Rent", amount, desc, createdAt, email: user.email, pending: false })
          setMessage(true)

          let cal = userDetails.bal.balance - amount
          const docRef = doc(db, "profile", user.email)
          updateDoc(docRef, {"bal.balance": cal})
        }

        if(amount > userDetails.bal.balance) {
          setFailed(true)
          setSuccess(false)
          setMessage(true)
        }

        
      } else {
        navigate("/login")
      }    
    }

    const handleBuy = (amount, desc) => {
      if (user) {
        if (amount < userDetails.bal.balance) {
          setSuccess(true) 
          setFailed(false)
          addDocument({ title: "Buy", amount, desc, createdAt, email: user.email, pending: false })
          setMessage(true)

          let cal = userDetails.bal.balance - amount
          const docRef = doc(db, "profile", user.email)
          updateDoc(docRef, {"bal.balance": cal})
        }

        if(amount > userDetails.bal.balance) {
          setFailed(true)
          setSuccess(false)
          setMessage(true)
        }
        
      } else {
        navigate("/login")
      }   
    }


  return (props &&
      <div className={s.ctn}>
        <div className={s.wrp}>
        {message && <Message success={success} failed={failed}  setMessage={setMessage}/>}
        {!(!error && props.length > 1) && 
        <div className={s.error}>
          <p className='formError'>Could not fetch data from database...</p>
        </div>}
        <div className={s.content} >
            {(props && !error) && props.map(prop => 
              <div className={s.box} key={prop.property_id}>
                    <div className={s.img}>
                      <img loading="eager" width={300} height={230} src={prop.primary_photo? prop.primary_photo.href : prop.photos[0].href} alt={prop.description.type} />
                    </div>
                    <div className={s.text}>
                      {!rent && <h3>${millify( prop.list_price || prop.list_price_max || prop.list_price_min )}</h3>}
                      {rent && <h3>${millify( prop.list_price || prop.list_price_max || prop.list_price_min )}<span>/M</span></h3>}
                        <h4>
                        {prop.description.type}
                        <span>Beds: {prop.description.beds_max || prop.description.beds_min || prop.description.beds} Sqft: {prop.description.sqft_max || prop.description.sqft_min || prop.description.sqft}
                        </span>
                      </h4>
                      <p>{prop.permalink.substring(0, 35)}...</p>
                      <div className={s.buttons}>
                        {rent &&
                        <Link to={`/rent-home/${prop.property_id}`}>
                          <button className={s.button}>View</button>
                        </Link>
                        }
                        {!rent &&
                        <Link to={`/buy-home/${prop.property_id}`}>
                          <button className={s.button}>View</button>
                        </Link>
                        }
                        <button className={s.button2} onClick={rent ? 
                          
                          () => handleRent( prop.list_price || prop.list_price_max || prop.list_price_min , prop.permalink) : 
                          () => handleBuy( prop.list_price || prop.list_price_max || prop.list_price_min , prop.permalink)}
                        >
                        {rent ? "Rent" : "Buy"}
                        </button>
                      </div>
                    </div>
                </div>
            )}
          </div>
          </div>
      </div>
  )
}
