import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import Footer from '../../components/footer/Footer'
import useCollection from '../../hooks/useCollection'
import PropertyDetails from '../../components/propertyDetails/PropertyDetails'
import { useParams } from 'react-router-dom'

export default function HomeDetails() {
  const [property, setProperty] = useState(null)
  const [error, setError] = useState('')
  const { document } = useCollection('profile', false, true);
  const { id } = useParams();

  useEffect(() => {
  async function fetchData() {
  try {
    const res = await fetch(`https://us-real-estate.p.rapidapi.com/property-detail?property_id=${id}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_NEW_KEY,
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    })

    const { data, status } = await res.json();
    if(status === 200){
      setProperty(data)
    }


  } catch (err) {
    setError(err.message)
  }}

  fetchData()
  }, [id])

  return (property &&
    <>
    <Nav />
    <PropertyDetails details={property} userDetails={document[0]}/>
    <Footer />
    </>
  )
}
