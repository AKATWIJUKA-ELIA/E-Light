import { generateImageEmbeddings } from "@/lib/generateImageEmbeddings";

const  useGenerateImageEmbeddings = () =>{
        
        const EmbedImage = async (files:File[])=>{
                try{
                        const embeddings = await generateImageEmbeddings(files);
                        // console.log("Embeds :",embeddings)
                        if(!embeddings.success){
                                return {success:false,status:embeddings.status, data:embeddings.data}
                        }
                         return {success:true,status:embeddings.status, data:embeddings.data}
                }catch{
                         return {success:false,status:.500, data:[]}
                }
        }
        return {EmbedImage}
}
export default useGenerateImageEmbeddings;