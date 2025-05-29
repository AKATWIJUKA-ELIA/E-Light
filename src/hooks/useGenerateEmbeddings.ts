import { generateEmbeddings } from "@/lib/generateEmbeddings";

const  useGenerateEmbeddings = () =>{
        
        const Embed = async (product_name:string,product_description:string,productCategory:string)=>{
                try{
                        const embeddings = await generateEmbeddings(product_name,product_description,productCategory);
                        console.log("Embeds :",embeddings)
                        if(!embeddings.success){
                                return {success:false,status:embeddings.status, data:embeddings.data}
                        }
                         return {success:true,status:embeddings.status, data:embeddings.data}
                }catch{
                         return {success:false,status:.500, data:[]}
                }
        }
        return {Embed}
}
export default useGenerateEmbeddings;