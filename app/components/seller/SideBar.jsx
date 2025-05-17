'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
  const pathName = usePathname()
  const menuData = [
    {name: 'Add Product', path: '/seller', icon: assets.add_icon},
    {name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon},
    {name: 'Orders', path: '/seller/orders', icon: assets.order_icon},
  ]
  return (
    <div className='w-16 md:w-72 border-r min-h-screen text-sm border-gray-200 flex flex-col '>
      {menuData.map((item) => {
        const isActive = pathName === item.path;
        return (
          <Link href={item.path} key={item.name} passHref>
            <div className={`flex items-center gap-3 px-4 py-3 ${
              isActive ? 'bg-orange-700/30 border-r-4 border-orange-400' : 'hover:bg-gray-100 '}`}>
              <Image src={item.icon} alt={item.name} className='w-7 h-7' />
              <p className='md:block hidden text-center'>{item.name}</p>
            </div>
          </Link>
            
        )
      })}
    </div>
  )
}

export default SideBar
