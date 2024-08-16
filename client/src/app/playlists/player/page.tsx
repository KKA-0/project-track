import React from 'react'
import CustomizedAccordions from "./../../widgets/accordion/accordion"
import VideoCard from "./../../widgets/videoCard/videoCard"
import Navbar from '@/app/widgets/navbar/navbar'
export default function page() {

  const src = "https://www.youtube.com/embed/DZKOunP-WLQ?rel=0"
  const title = "ouTube video player"

  return (
    <>
      <Navbar/>
      <div className='h-screen bg-green-500 flex'>
        <section className='h-screen w-4/5 bg-blue-500'>
          <iframe
            className='w-full h-4/5'
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </section>
        <section className='h-screen w-1/5 bg-red-500'>
          <CustomizedAccordions/>
        </section>
      </div>
    </>
  )
}
