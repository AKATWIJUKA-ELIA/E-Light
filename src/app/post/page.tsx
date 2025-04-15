"use client"
import { useUser } from '@clerk/nextjs';
import React, { useRef, useState } from 'react'
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';



const AddProduct =  () => {
        
      const generateUploadUrl = useMutation(api.products.generateUploadUrl);
      const [selectedImage, setSelectedImage] = useState<Array<File> | null>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);

      const createProduct = useMutation(api.products.createProduct)

            const {user} = useUser();

            const userid = user?.id || ''

            interface Product {
                approved: "",
                product_cartegory: "",
                product_condition: "",
                product_description: "",
                product_image: string[],
                product_name: "",
                product_owner_id: "",
                product_price: "",
                }
            const [product, setProduct] = useState<Product>({
                approved: "",
                product_cartegory: "",
                product_condition: "",
                product_description: "",
                product_image: [],
                product_name: "",
                product_owner_id: "",
                product_price: "",
                });
              
                const [isSubmitting, setIsSubmitting] = useState(false);
              
                const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  const { name, value } = e.target;
                  setProduct((prev) => ({...prev,[name]: value,
                  }));
                };

                const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const cleanForm = () => {
                        setProduct({
                                approved: "",
                                product_cartegory: "",
                                product_condition: "",
                                product_description: "",
                                product_image: [],
                                product_name: "",
                                product_owner_id: "",
                                product_price: "",
                        });
                        setSelectedImage(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      };
                  try {
                         // Step 1: Get a short-lived upload URL
                        const postUrl = await generateUploadUrl();
                        const responses = await Promise.all(
                                Array.from(selectedImage || []).map(async (image: File) => {
                                  const result = await fetch(postUrl, {
                                    method: "POST",
                                    headers: { "Content-Type": image.type },
                                    body: image,
                                  });
                            
                                  if (!result.ok) throw new Error("Failed to upload image");
                            
                                  return result.json(); 
                                })
                              );
                        
                              const storageIds = responses.map((res) => res.storageId);
                            
                              const updatedproduct = {
                                ...product,
                                product_image: [...storageIds], // Ensure new IDs are included
                                product_name: product.product_name,
                                product_description: product.product_description,
                                product_owner_id: userid,
                                product_cartegory: product.product_cartegory,
                                approved: false,
                              };
                            
                              console.log("Updated Product: ", updatedproduct);
                        
                        
                        await createProduct({ products: updatedproduct });

                      alert("product created successfully!");
                      cleanForm()
                    
                  } catch (error) {
                    console.error("Error creating product:", error);
                  } finally {
                    setIsSubmitting(false);
                  }
                };

  return (
     <div className=' mt-32 w-[50%]  items-center justify-center  mx-auto bg-gray-200 rounded-lg ' >
      <h1 className='text-2xl font-bold text-center text-black ' >Add  Products</h1>
       <form onSubmit={handleSubmit} className="space-y-4 p-3">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          value={product.product_name}
          onChange={handleChange}
          required
           className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="product_description"
          name="product_description"
          value={product.product_description}
          onChange={handleChange}
          required
           className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm"
        ></textarea>
      </div>

      <div className='flex md:flex md:gap-12'>
      <div>
        <label htmlFor="cartegory" className="flex text-sm font-medium text-gray-700">
          Cartegory
        </label>
        <input
          type="text"
          id="product_cartegory"
          name="product_cartegory"
          value={product.product_cartegory}
          onChange={handleChange}
          required
           className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="condition" className="flex text-sm font-medium text-gray-700">
          Condition
        </label>
        <input
          type="text"
          id="product_condition"
          name="product_condition"
          value={product.product_condition}
          onChange={handleChange}
          required
           className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm"
        />
      </div>
      </div>
      <div>
        <label htmlFor="price" className="flex text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="product_price"
          name="product_price"
          value={product.product_price}
          onChange={handleChange}
          required
           className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm"
        />
      </div>
      <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Attach an Image (Upto 5 images)
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            ref={fileInputRef}
            multiple
            onChange={(event) => setSelectedImage((prev) => [...(prev || []), ...(event.target.files ? Array.from(event.target.files) : [])])}
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Post Product"}
        </button>
      </div>
    </form>
     </div>
  )
}

export default AddProduct