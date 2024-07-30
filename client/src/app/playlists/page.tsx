import React from 'react'
import Navbar from '../widgets/navbar/navbar'
import Cards from "../widgets/cards/cards"
export default function playlists() {
  return (
    <>
        <Navbar/>
        <div className="flex justify-center flex-wrap" >
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
        </div>
    </>
  )
}
