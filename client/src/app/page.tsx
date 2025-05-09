"use client"
import React from 'react'
import Link from 'next/link';
import Header from './widgets/Header'
import Hero from './widgets/Hero'
import VideoPlayer from './widgets/VideoPlayer'
import Features from './widgets/Features'
import HowItWorks from './widgets/HowItWorks'
import CTA from './widgets/CTA'
import Footer from './widgets/Footer'
import BackgroundAnimation from './widgets/BackgroundAnimation'
import Subscription from './widgets/Subscription'
import { signIn } from "next-auth/react";

const page = () => {

  return (
    <>
      <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative">
        <BackgroundAnimation />
        <Header />
        <main>
          <Hero />
          <VideoPlayer />
          <Features />
          <HowItWorks />
          <Subscription />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default page