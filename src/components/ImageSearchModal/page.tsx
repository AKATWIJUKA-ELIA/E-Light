import React, { useRef } from 'react';

interface SearchModel {
  onClose: () => void;
}

const ImageSearchModal: React.FC<SearchModel> = ({ onClose,  }) => {

        const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Dropped file:', file);
      // Process or upload the image here
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Selected file:', file);
      // Process or upload the image here
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow a drop
  };

  return (
        <div className="  fade-in fixed md:mx-auto z-40 inset-0  shadow-lg  flex  w-[100%] h-[100%] mt-[38%] md:mt-[8%]   overflow-auto overflow-x-hidden bg-black/10 dark:bg-dark dark:shadow-gray-800 " onClick={onClose} >                  
                     
        <div
      className="mx-auto px-5 z-50  fade-in w-72 h-48 gap-4 border-2 border-dashed border-gray-300 rounded-3xl text-center p-4 cursor-pointer"
      onClick={(e)=>{ fileInputRef.current?.click();e.stopPropagation()}}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ backgroundImage: `url("images/imgSearch.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex justify-center items-center">
        <h1 className="font-bold">Drag or Click to add Image</h1>
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
      
  );
};

export default ImageSearchModal;