import { NextResponse } from "next/server";
import { api } from "../../convex/_generated/api"; 
import { useMutation } from "convex/react";
interface Review {
  product_id: string;
  rating: number;
  title: string;
  review: string;
  reviewer_id: string;
  verified: boolean;
}
const useCreateReview = () => {
        const create = useMutation(api.reviews.createReview);

        const CreateReview = async (review: Review) =>{
                try{
                const response = await create({ ...review });
                 if(!response?.success){
                        return { success: false, message: response.message, status: 400  }
                }
                return { success: true, message:response.message, status: 200 }
                }catch{
                        return  { success: false, message: "Sorry,  Can not upload at this time please try again later" };
                        
                }
        }
        return { CreateReview };
 }
 export default useCreateReview;