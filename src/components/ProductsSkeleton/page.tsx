import { Oval } from "react-loader-spinner";
import { CardContent } from "../ui/card";

const ProductSkeleton = () => {
        return (
          <CardContent className="relative  bg-gray-500 animate-pulse  flex rounded-lg items-center justify-center  h-36 overflow-hidden w-full">
              <div className="flex  opacity-95 w-[100%] h-[100%] items-center justify-center">
                        <div className="flex"><h1 className='text-2xl text-dark  '>Sh</h1></div>
                        <div className="flex">
                                <Oval
                                        visible={true}
                                        height="30"
                                        width="30"
                                        color="#0000FF"
                                        secondaryColor="#FFD700"
                                        ariaLabel="oval-loading"
                                        />
                        </div>
                                        <div className="flex text-2xl text-dark  ">p<span className="text-gold">Cheap</span>.  .  .</div>
                                </div>
          </CardContent>
        );
      };
      export default ProductSkeleton;