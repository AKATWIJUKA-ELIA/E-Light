import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

const useImageSearch = () => {
    const Search = useAction(api.products.ImagevectorSearch); 
    try{
    const ImageVectorSearch = async(embeddings:number[])=>{
        const response = await Search({embeding:embeddings});
        return response
    }
    return {ImageVectorSearch};
}catch{
console.log("Error while Fetching Searches")
    }
};

export default useImageSearch;