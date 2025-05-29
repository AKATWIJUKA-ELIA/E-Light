"use client"
      type response={
        success:boolean
        message: string
        status:number
        embeddings:[]
      }
      
export const generateEmbeddings = async (productName: string | "",productDescription:string|"",productCategory:string|"") => {

     try {
        const response = await fetch('http://127.0.0.1:8000/embed/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                        productName: productName,
                        productDescription: productDescription,
                        productCategory: productCategory
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