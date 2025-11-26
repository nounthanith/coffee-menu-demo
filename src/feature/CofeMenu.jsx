import React from 'react'
import coffeeMenu from '../data/coffeeMenu'
import { useState } from 'react'
import TextPressure from '../ui/TextPressure'
function CofeMenu() {
  const [menuDetail, setMenuDetail] = useState(null)
  return (
    <div className=" bg-amber-50 py-8 px-4 sm:px-6 lg:px-8 h-fit">
      <h1 className="text-4xl font-bold text-amber-900 mb-4 text-center">ភិមានកាហ្វេ</h1>
      <p className="text-amber-700 text-lg max-w-2xl mx-auto text-center">
        ការជ្រើសរើសកាហ្វេលំដាប់ថ្នាក់ខ្ពស់ដែលផលិតយ៉ាងយកចិត្តទុកដាក់របស់យើង។
      </p>
      <div className="w-24 h-1  bg-amber-700 mx-auto rounded-full mt-4 mb-4"></div>

      <div className="max-w-7xl mx-auto h-[600px] overflow-y-auto scrollbar-hide">

        <table className="w-full">
          <thead className="sticky top-0 z-20 bg-amber-50 ring-1">
            <tr className="border-b-2 border-amber-700">
              <th className="w-1/4 border-2 p-2">ឈ្មោះ</th>
              <th className="w-1/4 border-2 p-2">តម្លៃ</th>
              <th className="w-1/4 border-2 p-2">លម្អិត</th>
            </tr>
          </thead>

          {coffeeMenu.map((coffee) => (
            <tbody key={coffee.id} className="">
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
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-100 p-8">
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

      <div className="w-fit h-fit bg-amber-700 mx-auto rounded-full mt-4 mb-4"></div>
      <div className="max-w-7xl mx-auto border-b">
        <TextPressure
          text="Thank you for your order!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#000"
          strokeColor="#ff0000"
          minFontSize={20}
        />
      </div>

    </div>
  )
}

export default CofeMenu