import s from './Testimonials.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Autoplay } from "swiper";
import { useEffect, useState } from 'react';
import  Quote from '../../assets/quote.svg';

export default function Testimonials({ testimonials }) {
  const [slidesPerView, setSlidesPerView] = useState(0.96);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 600) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(0.99);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className={s.ctn}>
      <h1 className='title'>Testimonials</h1>
      <Swiper
        slidesPerView={slidesPerView}
        freeMode={true}
        modules={[FreeMode, Autoplay]}
        className={s.wrp}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >

          {testimonials.map((doc, i) => 
          <SwiperSlide className={s.slide} key={i}>
            <div className={s.avatar}>
              <img width={40} height={40} src={`https://robohash.org/${doc.name}`} alt='avatar'/>
              <p className={s.name}>{doc.name}</p>
            </div>

            <p>{doc.message}</p>
            <img src={Quote} className={s.quote} width={60} height={60} alt='quote'/>
          </SwiperSlide> 
          )}
      </Swiper>
    </div>
  )
}
