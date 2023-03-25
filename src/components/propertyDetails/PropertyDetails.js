import { Swiper, SwiperSlide } from "swiper/react";
import millify from "millify";

// Import Swiper s
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// importing s from
import s from "./PropertyDetails.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import {  useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useFirestore } from '../../hooks/useFirestore'
import Message from '../message/Message'
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useNavigate } from "react-router-dom";


export default function PropertyDetails({details, userDetails}) {
  const navigate = useNavigate()
  const createdAt = new Date().toLocaleString()
  const { addDocument } = useFirestore("transactions")
  const { user } = useAuth()
  const [message, setMessage] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)

  console.log(details)

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
          addDocument({ title: "Rent", amount, desc, createdAt, email: user.email, pending: "failed" })
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
          addDocument({ title: "Buy", amount, desc, createdAt, email: user.email, pending: "failed" })
        }
        
      } else {
        navigate("/login")
      }
      
    }





  return (details &&
    <div  className={s.container}>
       {message && <Message success={success} failed={failed}  setMessage={setMessage}/>}
      <h2>More Details, <span>More</span> Satisfaction. </h2>
      <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          speed={700}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          // pagination={{
          //   clickable: true,
          // }}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className={s.mySwiper}
        >
          {details.photos.map((Detail, index) =>
             <div key={index} className={s.photos}>
                <SwiperSlide className={s.swiperslides}>
                  <img src={Detail.href} alt={Detail.type}/>
                </SwiperSlide>
            </div>
            )}
        </Swiper>
          <div className={s.text}>
            <h2><span>${millify( details.list_price || details.list_price_max || details.list_price_min)}{(details.status === "for_rent") && <p>/Monthly</p>}</span>
            <span>{details.description.sqft || details.description.sqft_max || details.description.sqft_min}<p>sqft</p></span>
            <span>{details.description.beds || details.description.beds_max || details.description.beds_min}<p>bd</p></span>
            <span>{details.description.baths || details.description.baths_max || details.description.baths_min}<p>bth</p></span>
            </h2>
            <p className={s.date}>{details.list_date} <span> {details.status}</span></p>
            <p>{details.description.text}</p>

            <div className={s.tags}>
              {details.tags.map((tag, i) => <p key={i}>{tag}</p>)}
            </div>
            {(details.status === "for_rent")  && <button className="bigBtn full" 
            onClick={ 
              () => handleRent( details.list_price || details.list_price_max || details.list_price_min, 
                details.permalink)}
            >
              Rent
            </button>}
            {!(details.status === "for_rent")  && <button className="bigBtn full"
            onClick={ 
              () => handleBuy( details.list_price || details.list_price_max || details.list_price_min, 
                details.permalink)}
            >
              Buy
              </button>}
          </div>
    </div>
  )
}
