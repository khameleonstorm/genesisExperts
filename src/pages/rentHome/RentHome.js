import { useEffect, useState } from 'react'
import Heroes from '../../components/heroes/Heroes'
import Nav from '../../components/nav/Nav'
import { states } from '../../utils/states'
import { rent } from '../../utils/heroText'
import Footer from '../../components/footer/Footer'
import Filter from '../../components/filter/Filter'
import Properties from '../../components/properties/Properties'
import { MoonLoader } from 'react-spinners';

export default function RentHome() {
  const [pending, setPending] = useState(true)
  const [properties, setProperties] = useState(null)
  const [error, setError] = useState('')
  const [city, setCity] = useState('Birmingham')
  const [stateCode, setStateCode] = useState('AL')
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setPending(true)
  async function fetchData() {
  try {
    const res = await fetch(`https://us-real-estate.p.rapidapi.com/for-rent?offset=0&limit=42&state_code=${stateCode}&city=${city}&sort=newest`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_NEW_KEY,
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    })

    const { data, status } = await res.json();
    if(status === 200){
      setProperties(data.results)
    }

  } catch (err) {
    setError(err.message)
  }}

  fetchData()
  setPending(false)
  }, [city, stateCode])


  const handleChange = (e) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
      setProperties(properties.filter(property => {
        return property.permalink.toLowerCase().includes(inputValue.toLowerCase())
      }))
  };


  
  if(pending && !properties){
    return (
      <div className="spinnerContainer">
        <div className="spinner">
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }


if(properties && !pending){
  return (
    <>
    <Nav />
    <Heroes text={rent}/>
    <Filter handleChange={handleChange} setStateCode={setStateCode} setCity={setCity} states={states}/>
    <Properties props={properties} rent={true}/>
    <Footer />
    </>
  )
}}
