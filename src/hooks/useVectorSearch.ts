import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

const useVectorSearch = () => {
    const Search = useAction(api.products.vectorSearch); 
    try{
    const vectorSearch = async(embeddings:number[])=>{
        const response = await Search({embeding:embeddings});
        return response
    }
    return {vectorSearch};
}catch{
console.log("Error while Fetching Searches")
    }
};

export default useVectorSearch;