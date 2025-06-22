import React from "react";
import { Oval } from 'react-loader-spinner'
import { ProductReview } from "@/components/Product/product-reviews"


interface ProductProps {
  product: {
    _id: string;
    product_name: string;
    product_image: string[];
    product_price: string;
    product_description: string;
    product_owner_id:string
  };
}

const ProductReviews: React.FC<ProductProps> = ({ product }) => {

  return (
    <div className="flex flex-col lg:flex-row gap-2 bg-white mt-5 shadow-md overflow-hidden p-4 dark:bg-dark ">
      {product ?(<ProductReview productId={product._id} productName={product.product_name} />):(
        <Oval
                                                visible={true}
                                                height="30"
                                                width="30"
                                                color="#0000FF"
                                                secondaryColor="#FFD700"
                                                ariaLabel="oval-loading"
                                                />
      )}
    </div>
  );
};

export default ProductReviews;
