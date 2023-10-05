import s from './Heroes.module.css'

export default function Heroes({text}) {
  return (
    <div className={s.ctn} style={{backgroundImage: `linear-gradient(180deg, #000000f8, #0000006e), url(${text.bg})`}}>
      <div className={s.wrp}>
        <h1 className={s.title}>{text.title1} <span> {text.title2} </span> {text.title3}</h1>
        <p className={s.subtitle}>{text.description}</p>
      </div>
    </div>
  )
}
