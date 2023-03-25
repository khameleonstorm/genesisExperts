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
  const [city, setCity] = useState('Detroit')
  const [stateCode, setStateCode] = useState('MI')
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
  async function fetchData() {
  try {
    const res = await fetch(`https://us-real-estate.p.rapidapi.com/for-sale?offset=0&limit=42&state_code=${stateCode}&city=${city}&sort=newest`, {
      method: 'GET',
      params: {offset: '0', limit: '42', state_code: stateCode, city, sort: 'newest'},
      headers: {
        'X-RapidAPI-Key': "8d94690c5emshf27b0999e032819p1fc340jsn6688a6a23f2d",
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    })

    const { data, status } = await res.json();
    if(status === 200){
      setProperties(data.results)
      setPending(false)
    }

  } catch (err) {
    setError(err.message)
    setPending(false)
  }}

  fetchData()
  setPending(false)
  }, [city, stateCode])


  const handleChange = (e) => {
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
  

  if(!pending && properties){
  return (
    <>
    <Nav />
    <Heroes text={rent}/>
    <Filter handleChange={handleChange} setStateCode={setStateCode} setCity={setCity} states={states}/>
    <Properties props={properties} />
    <Footer />
    </>
  )
}}
