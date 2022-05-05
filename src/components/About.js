import React, { useContext, useEffect }  from 'react'
import NoteContext from '../context/NoteContext'

const About = () => {
  const a = useContext(NoteContext)

  useEffect(() => {
    a.update()
  }, [])


  return (
    <>
    <p>This is about page, Hi I am  {a.state.name}, My Job role is {a.state.role}</p>
    </>
  )
}

export default About