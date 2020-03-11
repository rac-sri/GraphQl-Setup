import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const query = gql`
  query AllPets{
    pets{
      id
      name 
      type
    }
  }
`
export default function Pets () {
  const [modal, setModal] = useState(false)
  const {data , loading , error} = useQuery(query)

  const onSubmit = input => {
    setModal(false)
  }
  
  if(loading)
  {
    return <Loader />    //since useQuery is async in background
  }
if(error)
  {
    return <p>error</p>
  }

  if(error)
  console.log(data)
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets}/>
      </section>
    </div>
  )
}
