const ProductSkeleton = () => {
        return (
          <div className="bg-white flex flex-col rounded-lg shadow-md overflow-hidden animate-pulse">
            {/* Image Skeleton */}
            <div className="relative w-full h-64 bg-gray-200"></div>
      
            {/* Product Details Skeleton */}
            <div className="p-4 flex flex-col gap-2">
              {/* Product Name */}
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      
              {/* Product Description */}
              <div className="h-4 bg-gray-300 rounded w-full"></div>
      
              {/* Footer (Price & Date) */}
              <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                <div className="h-5 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        );
      };
      export default ProductSkeleton;