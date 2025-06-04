import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useFile } from '@/app/FileContext';

interface SearchModel {
  onClose: () => void;
}

const ImageSearchModal: React.FC<SearchModel> = ({ onClose,  }) => {

        const fileInputRef = useRef<HTMLInputElement>(null);
        const [dragged,setDragged] = useState(false)
        const router = useRouter()
        const { setFile } = useFile();

  const handleDrop = async(e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragged(false)
    const files = e.dataTransfer.files;
    const file = files && files[0];
    if (file && file.type.startsWith('image/')) {
      setFile([file])
      router.push("/imageResults")
            onClose()
      
    }
  };


  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Selected file:', file);
      setFile([file])
       router.push("/imageResults")
      onClose()
    }
  };


  return (
        <>
        <div
          className={`fade-in fixed md:mx-auto z-40 inset-0  shadow-lg  flex  w-[100%] h-[100%] mt-[38%] md:mt-[0%]   overflow-auto overflow-x-hidden bg-black/2 dark:bg-transparent dark:shadow-gray-800 `}
          onClick={onClose}
        >
                     
        <div
      className={`mx-auto  px-5   fade-in w-72 h-48 gap-4 mt-36 border-2 border-dashed bg-gray-200 border-gray-300 rounded-3xl text-center p-4 cursor-pointer`}
      onClick={(e)=>{ fileInputRef.current?.click();e.stopPropagation()}}
       onDragOver={(e) => {e.preventDefault(),setDragged(true)}}
       onDragLeave={(e) =>{e.preventDefault(),setDragged(false)}}
      onDrop={handleDrop}
      style={{ backgroundImage: `url("images/imgSearch.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col gap-6 justify-center items-center text-black">
        <h1 className="font-bold">Drag or Click to add Image</h1>
        {dragged ? (<h1 className="font-bold text-3xl text-red-600">Drop Here</h1>):("")}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
       </div>
        </>

  );
};

export default ImageSearchModal;