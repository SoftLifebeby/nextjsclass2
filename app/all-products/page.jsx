'use client'
import React from 'react'
import Navbar from '../components/NavBar'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const page = () => {
  const {products} = useAppContext()
  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-7xl flex flex-col items-start px-6 md:px-16 lg:px-32 py-14'>
        <div className='flex flex-col items-start pt-14'>
          <p className='text-2xl font-medium'>All Products</p>
          <div className='w-16 h-2 rounded-2xl bg-orange-600'></div>
          <p className='py-4 text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. 
          </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full'>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
        <Footer />
    </>
  )
}

export default page
