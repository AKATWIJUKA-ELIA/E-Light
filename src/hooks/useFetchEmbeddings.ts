"use client"
      type response={
        success:boolean
        message: string
        status:number
      }
      
const useFetchEmbeddings = () => {
    const Authenticate = async (productName: string | "",productDescription:string) => {
     try {
        const response = await fetch('/api/createsession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                        productName: productName,
                        productDescription: productDescription
                }),
        });

                        
                        if (!response.ok) {
                                throw new Error('Failed to create session');
                        }
                        
                        return { success: true, status: 201, message: 'Success' };
                } catch (error) {
                        console.error('Error during session creation:', error);
                        return { success: false, status: 500, message: `Internal Server Error ${error}` };
                }
    };


  return {Authenticate };
};

export default useFetchEmbeddings;