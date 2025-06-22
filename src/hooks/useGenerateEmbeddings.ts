import { generateEmbeddings } from "@/lib/generateEmbeddings";

const  useGenerateEmbeddings = () =>{
        
        const Embed = async (whatToEmbed:string)=>{
                try{
                        const embeddings = await generateEmbeddings(whatToEmbed);
                        // console.log("Embeds :",embeddings)
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