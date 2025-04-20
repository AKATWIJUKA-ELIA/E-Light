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
        //       console.log(args.products)
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
        

export const getProductsByIds = query({
args: { ids: v.array(v.string()) }, // Accept an array of product IDs
handler: async (ctx, { ids }) => {
        return await Promise.all(
          ids.map(async (id) => {
            const normalizedId = ctx.db.normalizeId("products", id);
            if (!normalizedId) {
              throw new Error(`Invalid ID: ${id}`);
            }
            const product= await ctx.db.get(normalizedId);
            if(product){
                product.product_image = await Promise.all(
                        product.product_image.map(async (image: string) => {
                                return await ctx.storage.getUrl(image);
                        }
                ))
          }
          return product;
        })
        ); // Fetch all products at once
},

});

export const getImageUrl = query({
        args: { fileId: v.id("_storage") }, // Convex stores files in the `_storage` table
        handler: async (ctx, { fileId }) => {
          return await ctx.storage.getUrl(fileId); // Generate the view URL
        },
      });

      export const getProductsByOwner = query({
        args: { id: v.string() },
        handler: async (ctx, args) => {
          const products = await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("product_owner_id"), args.id))
            .collect();
      
          for (const product of products) {
            product.product_image = await Promise.all(
              product.product_image.map(async (image: string) => {
                return await ctx.storage.getUrl(image);
              })
            );
          }
      
        //   console.log("primary products:", products);
          return products;
        },
      });

      export const getRelatedProducts = query({
        args: { category: v.string() },
        handler: async (ctx, args) => {
          const products = await ctx.db
            .query("products")
            .filter((q) => q.and(
                q.eq(q.field("product_cartegory"), args.category),
                q.eq(q.field("approved"),true)
              ))
            .collect();
      
          for (const product of products) {
            product.product_image = await Promise.all(
              product.product_image.map(async (image: string) => {
                return await ctx.storage.getUrl(image);
              })
            );
          }
      
          console.log("Related products:", products);
          return products;
        },
      });

      export const UpdateProduct = mutation({
        args:{_id: v.id("products"),
                product: v.object({
                _id: v.id("products"),
                 approved: v.boolean(),
                  product_cartegory: v.string(),
                  product_condition: v.string(),
                  product_description: v.string(),
                  product_image: v.array(v.string()),
                  product_name: v.string(),
                  product_price: v.string(),
                    }),
          },
        handler: async (ctx, args) => {
              if(args.product){
              const job = await ctx.db.patch(args._id, args.product);
              return job
              }
              
        }})