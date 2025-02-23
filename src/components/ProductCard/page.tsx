import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: {
        product_id: string;
    product_name: string;
    product_image: string;
    product_price: number;
    product_description: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      {/* Product Image */}
      <Link href={`/products/${product.product_id}`} className="block">
        <Image
          src={product.product_image}
          alt={product.product_name}
          width={300}
          height={300}
          className="w-full h-64 object-cover rounded-lg hover:opacity-90 transition"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          <Link href={`/products/${product.product_id}`} className="hover:underline">
            {product.product_name}
          </Link>
        </h2>
        
        <p className="text-gray-600 text-sm">{product.product_description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-blue-600">Shs : {product.product_price}</span>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
