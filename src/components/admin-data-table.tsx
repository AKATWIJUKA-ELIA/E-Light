import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
      } from "@/components/ui/table"
      import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { Button } from "./ui/button";
import EditModal from "./EditModal/page";
import DeleteModal from "./DeleteModal/page";
import { useEffect, useState } from "react";
import ApproveRevokeModal from "./ApproveRevoke/page";
import useGetProductById from "@/hooks/useGetProductById";
interface Product {
        _id:string,
  approved: boolean,
  product_cartegory: string,
  product_condition: string,
  product_description: string,
  product_image: string,
  product_name: string,
  product_owner_id: string,
  product_price: string,
  _creationTime:Date
}
interface DataTableProps {
  products: Product[];
}
const DataTable: React.FC<DataTableProps> = ({ products }) => {
        const [isvisible, setisvisible] = useState(false);
        const [ischange, setischange] = useState(false);
        const [isdelete, setisdelete] = useState(false);
        const [productId, setproductId] = useState("");
        const[action, setaction] = useState(Boolean)
        
        const HandleApproveRevoke=(ProductId:string)=>{
                setproductId(ProductId)
                setischange(true)
        }

        const {data:product} = useGetProductById(productId)
                useEffect(()=>{
                        if(product){
                                setaction(product.approved)
                        }
                })
        const HandleEdit=(ProductId:string)=>{
                setproductId(ProductId)
                setisvisible(true)
        }
        const HandleDelete=(ProductId:string)=>{
                setproductId(ProductId)
                setisdelete(true)
        }

        return (
                <>
                <div className="w-full overflow-x-auto rounded-lg border">
                {products?( <Table className="min-w-[800px]">
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Condition</TableHead>
                      <TableHead className="text-right">Image</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Date Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.product_name}</TableCell>
                        <TableCell className="font-medium">{product.product_cartegory}</TableCell>
                        <TableCell>{product.product_description}</TableCell>
                        <TableCell className="text-right">{product.product_condition}</TableCell>
                        <TableCell className="text-right">
                          <Image
                            src={product.product_image}
                            width={50}
                            height={50}
                            alt={product.product_name}
                            className="rounded"
                          />
                        </TableCell>
                        <TableCell className="text-right">{product.product_price}</TableCell>
                        <TableCell className="text-right">
                          {product.approved ? "Approved" : "Pending"}
                        </TableCell>
                        <TableCell className="text-right">
                          <time dateTime={new Date(product._creationTime).toISOString()}>
                            {new Date(product._creationTime).toLocaleDateString()}
                          </time>
                        </TableCell>
                        <TableCell className=" justify-center  flex gap-1">
                        <Button className="flex  bg-blue-400 hover:bg-blue-700 transition-transform duration-500 " onClick={()=>{HandleApproveRevoke(product._id)}} >{product.approved? "Revoke" : "Approve"}</Button>
                        <Button className="flex  bg-blue-400 hover:bg-blue-700 transition-transform duration-500 " onClick={()=>{HandleEdit(product._id)}} >Edit</Button>
                        <Button className="flex bg-red-400  hover:bg-red-700 transition-transform duration-500 " onClick={()=>{HandleDelete(product._id)}}  >Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>):(
                        <Oval
                        visible={true}
                                    height="80"
                                    width="80"
                                    color="#0000FF"
                                    secondaryColor="#ddd"
                                    ariaLabel="oval-loading"
                                    wrapperClass=""
                        />
                )}
              </div>
                <EditModal isvisible={isvisible} onClose={() => setisvisible(false)} productId={productId} />
                <DeleteModal isdelete={isdelete} onClose={() => setisdelete(false)} productId={productId} />
                <ApproveRevokeModal ischange={ischange}  onClose={() => setischange(false)} productId={productId} Action={action}/>
                </>
              
        )
      }
      export default DataTable;