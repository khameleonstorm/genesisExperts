import { useEffect, useState } from 'react'
import Heroes from '../../components/heroes/Heroes'
import Nav from '../../components/nav/Nav'
import { states } from '../../utils/states'
import { rent } from '../../utils/heroText'
import Footer from '../../components/footer/Footer'
import Filter from '../../components/filter/Filter'
import Properties from '../../components/properties/Properties'
import useCollection from '../../hooks/useCollection'

export default function RentHome() {
  const [properties, setProperties] = useState(null)
  const [error, setError] = useState('')
  const [city, setCity] = useState('Detroit')
  const [stateCode, setStateCode] = useState('MI')
  const [inputValue, setInputValue] = useState("")
  const { document, isPending } = useCollection('profile', false, true);

  useEffect(() => {
  async function fetchData() {
  try {
    const res = await fetch(`https://us-real-estate.p.rapidapi.com/for-sale?offset=0&limit=42&state_code=${stateCode}&city=${city}&sort=newest`, {
      method: 'GET',
      params: {offset: '0', limit: '42', state_code: stateCode, city, sort: 'newest'},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_NEW_KEY,
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    })

    const { data, status } = await res.json();
    if(status === 200){
      setProperties(data.results)
    }

    console.log(data.results)

  } catch (err) {
    setError(err.message)
  }}

  fetchData()
  }, [city, stateCode])


  const handleChange = (e) => {
    setInputValue(e.target.value)
      setProperties(properties.filter(property => {
        return property.permalink.toLowerCase().includes(inputValue.toLowerCase())
      }))
  };



  return (properties &&
    <>
    <Nav />
    <Heroes text={rent}/>
    <Filter handleChange={handleChange} setStateCode={setStateCode} setCity={setCity} states={states}/>
    <Properties props={properties} userDetails={document[0]}/>
    <Footer />
    </>
  )
}
