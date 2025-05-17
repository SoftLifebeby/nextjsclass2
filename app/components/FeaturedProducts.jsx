"use client"
import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const FeaturedProducts = () => {
  const { products, router } = useAppContext()
  return (
    <div className="flex mx-auto max-w-7xl flex-col items-center pt-14 p-4">
      <h1 className="text-2xl w-full font-medium text-left">Popular Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button className="px-12 py-3 border rounded hover:bg-gray-200/90 transition" onClick={() => router.push('/all-products')}>Load More</button>
    </div>
  )
}

export default FeaturedProducts
