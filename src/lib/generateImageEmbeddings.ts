"use client"
      type response={
        success:boolean
        message: string
        status:number
        embeddings:[]
      }
      
export const generateImageEmbeddings = async (files:File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
     try {
        const response = await fetch('http://127.0.0.1:8000/embed/image', {
                method: 'POST',
                body: formData
        }); 
        const res:response = await response.json();
        if (res.status!=200) {
                throw new Error('Failed to generate Embeddings');
        }
        // console.log("Embeddings are :",res.embeddings ) 
        return { success: true, status: res.status, data: res.embeddings };
} catch (error) {
        console.error('An Error occurred while generating Embeddings:', error);
        return { success: false, status: 500, message: `Internal Server Error ${error}` };
}
    };
//     generateEmbeddings("Iphone","SamSung")