import React from 'react'

const Nextbutton = ({page , setPage}) => {
  return (
    <div>
          <div className="flex justify-between w-[91%] mx-auto mt-8">
  <button
    className={`w-[6rem] rounded-lg h-[3rem] mx-2 text-white font-semibold 
                bg-gray-500  shadow-md hover:bg-gray-600 
                hover:shadow-lg transition duration-300 disabled:opacity-50`}
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
  >
    Previous
  </button>
  <button
    className={`w-[6rem] rounded-lg h-[3rem] mx-2 text-white font-semibold 
                bg-red-500  shadow-md hover:bg-red-600 
                hover:shadow-lg transition duration-300`}
    onClick={() => setPage((prev) => prev + 1)}
  >
    Next
  </button>
</div>
    </div>
  )
}

export default Nextbutton
