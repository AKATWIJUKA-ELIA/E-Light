"use client"
      type response={
        success:boolean
        message: string
        status:number
        embeddings:[]
      }
      
export const generateEmbeddings = async (whatToEmbed:string) => {

     try {
        const response = await fetch('https://searchapi-latest.onrender.com/embed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                        whatToEmbed: whatToEmbed,
                }),
        }); 
        const res:response = await response.json();
        if (res.status!=200) {
                throw new Error('Failed to generate Embeddings');
        }
        console.log("Embeddings are :",res.embeddings ) 
        return { success: true, status: res.status, data: res.embeddings };
} catch (error) {
        console.error('An Error occurred while generating Embeddings:', error);
        return { success: false, status: 500, message: `Internal Server Error ${error}` };
}
    };
//     generateEmbeddings("Iphone","SamSung")