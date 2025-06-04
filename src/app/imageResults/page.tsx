"use client"
import React, { useEffect, useState }  from 'react'
import { useFile } from '../FileContext'
import Categories from '@/components/Category/page'
import useGenerateImageEmbeddings from '@/hooks/useGenerateImageEmbeddings'
import { useRouter } from 'next/navigation'; 
import useImageSearch from '@/hooks/useImageSearch'

const ImageResults =  () => {
        const { file } = useFile();
        const [data,setData] = useState([])
        const {EmbedImage} = useGenerateImageEmbeddings()
        const router = useRouter()
        const imageSearch = useImageSearch();
        const ImageVectorSearch = imageSearch?.ImageVectorSearch;
       if (file && file.length<0) {
            return (
                router.push("/")
            );
        }
useEffect(() => {
         
                const ImageEmbed = async(files:File[]) =>{
                const embeds = await EmbedImage(files);
                
                if(!embeds.success){
                        console.log("Error while generating embeddings",embeds.status)
                        return;
                }
                let response;
                if (ImageVectorSearch) {
                    response = await ImageVectorSearch(embeds.data?embeds.data[0] || []:[]);
                    console.log("ImageVectorSearch response:", response);
                    setData(response||[])
                } else {
                    console.error("ImageVectorSearch is undefined");
                }
        }
         ImageEmbed(file);
}, [file]);
        
        return (
            <div >
                <Categories relatedProducts={data||[]} category='' image={file[0]} />
            </div>
        );
}

export default ImageResults