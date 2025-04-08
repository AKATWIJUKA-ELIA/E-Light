import {mutation, query} from "./_generated/server"
import {v} from "convex/values"

export const generateUploadUrl = mutation(async (ctx)=>{
      return await ctx.storage.generateUploadUrl()
})


export const createProduct = mutation({
        args:{
              products: v.object({
                approved: v.boolean(),
                product_cartegory: v.string(),
                product_condition: v.string(),
                product_description: v.string(),
                product_image: v.array(v.string()),
                product_name: v.string(),
                product_owner_id: v.string(),
                product_price: v.string(),
                  }),
        },
        handler: async (ctx, args) => {
              console.log(args.products)
              await ctx.db.insert("products", {
                    ...args.products,
              });
        },
  })

  export const getProducts = query({
           
        handler: async (ctx) => {
      const products = await ctx.db.query("products").filter((q)=> q.eq(q.field("approved"), true)).collect(); 
//       console.log(products)
      return Promise.all(
        products.map(async (product) => ({
          ...product,
          product_image: product.product_image ? await ctx.storage.getUrl(product.product_image[0]) : null,
         
        }))
      
      );
      
    },
    
  })

  export const getProduct = query({
        args:{id: v.string(),},
              handler: async (ctx, args) => {
                     const single = await ctx.db.query("products").filter((q)=> q.eq(q.field("_id"), args.id)).first(); 
                //      console.log("Single Job",single)
                    if (single) {
                        single.product_image = await Promise.all(
                            single.product_image.map(async (image: string) => {
                                return await ctx.storage.getUrl(image);
                            })
                        );
                    }
                    return single
                    },
                    })