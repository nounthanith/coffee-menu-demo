import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProduct from './useProduct'
import api from '../../lib/api'

function Detail() {
  const { id } = useParams()
  const { product, loading, error, getProductById } = useProduct()

  useEffect(() => {
    getProductById(id)
  }, [id, getProductById])

  // --- Loading/Error States ---
  if (loading) return <div className="p-8 font-mono border-2 border-gray-700 bg-white">Loading product details...</div>
  if (error) return <div className="p-8 text-red-700 font-mono border-2 border-red-700 bg-red-100">Failed to load product details. Please check the network.</div>
  if (!product) return <div className="p-8 font-mono border-2 border-gray-700 bg-white">Product not found.</div>
  // ---------------------------

  const imgSrc = product.image?.startsWith('http')
    ? product.image
    : `${(import.meta.env.VITE_BASE_URL || '').replace(/\/$/, '')}/${String(product.image || '').replace(/^\//, '')}`

  return (
    // Main Container: Squared, bordered, group for hover, side-by-side flex layout
    <div className="bg-white border-2 border-gray-700 group flex flex-col md:flex-row max-w-5xl mx-auto">
      
      {/* 1. Image Section (Left) */}
      <div className="relative w-full md:w-1/2 h-80 md:h-auto bg-gray-100 border-b-2 md:border-b-0 md:border-r-2 border-gray-700 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          // Image scale effect
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = 'https://via.placeholder.com/800x500?text=Image+Not+Available'
          }}
        />
      </div>

      {/* 2. Detail Section (Right) */}
      <div className="w-full md:w-1/2 p-6 space-y-5 font-mono">
        
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-gray-200 pb-3">{product.name}</h1>
        
        {/* Category & Price Block */}
        <div className="flex justify-between items-center pb-3">
            {product.category?.name && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-semibold bg-emerald-600 text-white border-2 border-gray-700">
                    {product.category.name}
                </span>
            )}
            <p className="text-3xl font-extrabold text-emerald-600">
                {product.price?.toLocaleString()}៛
            </p>
        </div>

        {/* Description */}
        <div className="border-t border-b border-gray-200 py-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Product Description:</h2>
            {product.description && product.description !== 'None'
                ? <p className="text-gray-700 text-base">{product.description}</p>
                : <p className="text-gray-500 italic text-sm">No detailed description available.</p>
            }
        </div>
        
        {/* Action Buttons */}
        <div className="pt-3 flex items-center space-x-4"> 
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-block px-4 py-2 border-2 border-gray-700 text-gray-700 font-bold hover:bg-gray-200 hover:border-emerald-600 transition"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default Detail