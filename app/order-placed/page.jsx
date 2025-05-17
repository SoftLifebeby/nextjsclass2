'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const Page = () => {
  const { router } = useAppContext()
  const [countdown, setCountdown] = useState(7) // Initialize countdown to 5 seconds

  useEffect(() => {
    const handleRedirect = () => {
      router.push('/my-orders')
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1) // Decrease countdown by 1 every second
    }, 1000)

    const redirectTimer = setTimeout(() => {
      handleRedirect()
    }, 7000) // Redirect after 5 seconds

    return () => {
      clearInterval(timer) // Cleanup the interval
      clearTimeout(redirectTimer) // Cleanup the timeout
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <svg
        className="md:w-30 md:h-30 w-25 h-25 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h1 className="text-3xl font-extrabold text-gray-800">Order Confirmed!</h1>
      <p className="mt-4 text-lg text-gray-600">
        Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
      </p>
      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-500">
          Track your order status in your account or contact our support team for assistance.
        </p>
        <p className="text-sm text-gray-500">
          Stay connected with us on social media for the latest updates and offers.
        </p>
      </div>
      <p className="mt-6 text-lg text-gray-700">
        You will be redirected in <span className="font-bold">{countdown}</span> seconds...
      </p>
    </div>
  )
}

export default Page
