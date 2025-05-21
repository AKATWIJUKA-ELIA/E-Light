"use client"
import { useUser } from '@clerk/nextjs';
import React, { useRef, useState } from 'react'
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useSendMail } from '@/hooks/useSendMail';
import useGetCategories from '@/hooks/useGetCategories';
import { useAppSelector } from '@/hooks';



const AddProduct =  () => {
        
      const generateUploadUrl = useMutation(api.products.generateUploadUrl);
      const [selectedImage, setSelectedImage] = useState<Array<File> | null>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);
      const { sendEmail, } = useSendMail();
      const { data: categories } = useGetCategories(); 
      const[successProduct,setsuccessProduct] = useState(false)
      const [ErrorProduct,setErrorProduct] = useState(false)
        const [imagePreview, setImagePreview] = useState<string[]>([])
      const admin = process.env.NEXT_PUBLIC_ADMIN

      const createProduct = useMutation(api.products.createProduct)

            const user = useAppSelector((state)=>state.user.user)
            const userid = user?.User_id || ''

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
                const cleanImageField=()=>{
                        setSelectedImage([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                }
                const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                      const filesArray = Array.from(e.target.files)
                      const maxFileSize = 3 * 1024 * 1024; // 1MB in bytes
                      const validFiles: File[] = [];
                      for (const file of filesArray) {

                        if (!file.type.startsWith("image/")) {
                                alert(`"${file.name}" is not a valid image file.`);
                                cleanImageField();
                                return; 
                              }

                              if (file.size > maxFileSize) {
                                alert(`"${file.name}" is too large. Maximum allowed size is 3MB.`);
                                cleanImageField()
                              } else {
                                validFiles.push(file);
                              }
                            }
                   
                    // Check if adding these files would exceed the 5 image limit
                    if (validFiles.length > 5) {
                      alert("You can only upload up to 5 images")
                      cleanImageField()
                      return
                    }
              
                    setSelectedImage(validFiles)
              
                    // Create preview URLs for the selected images
                    const previewUrls = validFiles.map((file) => URL.createObjectURL(file))
                    setImagePreview(previewUrls)
                  }
                }
                const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                  const { name, value } = e.target;
                  setProduct((prev) => ({...prev,[name]: value,
                  }));
                };

                const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const TIMEOUT_MS = 10000; // ⏱ 10 seconds
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
                const cleanImageField=()=>{
                        setSelectedImage(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                }

                const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
                        return Promise.race([
                          promise,
                          new Promise<T>((_, reject) =>
                            setTimeout(() => reject(new Error("Request timed out")), ms)
                          ),
                        ]);
                      };

                  try {
                        await withTimeout((async () => {
                         // Step 1: Get a short-lived upload URL
                        const postUrl = await generateUploadUrl();
                        if(selectedImage && selectedImage.length > 5){
                                alert("Error, You can only upload upto Five Images")
                                cleanImageField()
                                return
                        }
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
                            
                        // console.log("Updated Product: ", updatedproduct);
                        await createProduct({ products: updatedproduct });
                        setsuccessProduct(true)
                        setTimeout(()=>{
                                setsuccessProduct(false)
                        },5000)
                      cleanForm()
                      cleanImageField()
                      setImagePreview([])
                      sendEmail( `${admin}` ,"New Product Created", `User ${user?.Username}, Added a product`);
                      sendEmail( `${user?.email}`,"New Product Created", `Hello  ${user?.Username}, Your Product was Created Successfully and is pending for Approval You will Be Notified Once Your Product is Approved`);
                })(), TIMEOUT_MS);
                  } catch (error) {
                        setErrorProduct(true)
                    console.error("Error creating product:", error);
                    setTimeout(()=>{
                        setErrorProduct(false)
                    },4000)
                  } finally {
                    setIsSubmitting(false);
                  }
                };

  return (
     <div className=' mt-44 md:mt-32 md:w-[50%]  items-center justify-center  mx-auto bg-gray-200 dark:bg-dark rounded-lg ' >
        {successProduct 
        ? (<h1 className='text-xl  text-center text-green-500 ' > Success😁😁!!!,  your product  is pending for Approval</h1>)
        :(<h1 className='text-2xl font-bold text-center text-black dark:text-white ' >Add  Products</h1>)
        }
        {ErrorProduct && <h1 className='text-2xl font-bold text-center text-red-500 ' >Error creating product 😔😔!!</h1>}
      
       <form onSubmit={handleSubmit} className="space-y-4 p-3 ">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Product Name
        </label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          value={product.product_name}
          onChange={handleChange}
          required
           className="bg-transparent rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white ">
          Description
        </label>
        <textarea
          id="product_description"
          name="product_description"
          value={product.product_description}
          onChange={handleChange}
          required
           className="bg-transparent rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm dark:text-white"
        ></textarea>
      </div>

      <div className='flex md:flex gap-2 md:gap-12'>
      <div>
        <label htmlFor="cartegory" className="flex text-sm font-medium text-gray-700 dark:text-white ">
          Cartegory
        </label>
        <select
          id="product_cartegory"
          name="product_cartegory"
          onChange={handleChange}
          required
           className="bg-transparent rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm dark:text-white"
        >
                <option value=""  >Select category</option>
                {categories?.map((category,index) => (
                <option key={index} value={category.cartegory}>
                  {category.cartegory}
                </option>
              ))}
              </select>
      </div>
      
      <div>
        <label htmlFor="condition" className="flex text-sm font-medium text-gray-700 dark:text-white">
          Condition
        </label>
        <input
          type="text"
          id="product_condition"
          name="product_condition"
          value={product.product_condition}
          onChange={handleChange}
          required
           className="bg-transparent rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm dark:text-white "
        />
      </div>
      </div>
      <div>
        <label htmlFor="price" className="flex text-sm font-medium text-gray-700 dark:text-white">
          Price
        </label>
        <input
          type="number"
          id="product_price"
          name="product_price"
          value={product.product_price}
          onChange={handleChange}
          onKeyDown={(e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  }}
          required
           className="bg-transparent rounded-lg relative block w-full px-3 py-2 border border-double border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-4  focus:border-gray-500 focus:z-10 sm:text-sm dark:text-white "
        />
      </div>
      <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-white">
            Attach an Image (Upto 5 images)
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          { imagePreview.length > 0 && (
              <div className="">
                <p className="text-sm font-medium text-gray-700 mb-2">Selected Images: {selectedImage?.length} of 5 images selected</p>  
                <div className="flex flex-wrap gap-2">
                  {imagePreview.map((src, index) => (
                    <div key={index} className="relative">
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-md border border-gray-300"
                      />
                      {/* <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button> */}
                    </div>
                  ))}
                </div>
              
              </div>
            )}
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