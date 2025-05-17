import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center mt-5 justify-center'>
      <div className='animate-spin border-5 h-10 w-10 rounded-full border-gray-200 border-t-orange-600'></div>
    </div>
  )
}

export default Loading
