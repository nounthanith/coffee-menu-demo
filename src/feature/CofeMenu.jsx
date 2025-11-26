import React from 'react'
import coffeeMenu from '../data/coffeeMenu'
import { useState } from 'react'
function CofeMenu() {
  const [menuDetail, setMenuDetail] = useState(null)
  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">ភិមានកាហ្វេ</h1>
      <p className="text-amber-700 text-lg max-w-2xl mx-auto text-center">
        ការជ្រើសរើសកាហ្វេលំដាប់ថ្នាក់ខ្ពស់ដែលផលិតយ៉ាងយកចិត្តទុកដាក់របស់យើង។
      </p>
      <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mt-4 mb-4"></div>

      <div className="max-w-7xl mx-auto">

        <table className="w-full">
          <thead>
            <tr className="text-center w-full">
              <th className="w-1/4 border-2 p-2">ឈ្មោះ</th>
              <th className="w-1/4 border-2 p-2">តម្លៃ</th>
              <th className="w-1/4 border-2 p-2">លម្អិត</th>
            </tr>
          </thead>
          {coffeeMenu.map((coffee) => (
            <tbody key={coffee.id}>
              <tr className="text-center w-full">
                <td className="w-1/4 border-2 h-28 p-2 font-bold text-xl">{coffee.name}</td>
                <td className="w-1/4 border-2 h-28 p-2 text-lg">{coffee.price} រៀល</td>
                <td className="w-1/4 border-2 h-28 p-2">
                  {coffee.description.length > 35 ? (
                    <>
                      {coffee.description.slice(0, 35)}
                      <span onClick={() => setMenuDetail(coffee)} className="text-amber-700 cursor-pointer hover:text-amber-900">...See more</span>
                    </>
                  ) : (
                    coffee.description
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>

      </div>
      {menuDetail && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{menuDetail.name}</h2>
            <p className="text-lg mb-4">{menuDetail.description}</p>
            <p className="text-lg mb-4 text-red-500">{menuDetail.price} រៀល</p>
            <div className="flex justify-end">
              <button
                onClick={() => setMenuDetail(null)}
                className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CofeMenu