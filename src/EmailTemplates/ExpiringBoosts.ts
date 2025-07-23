// import { Id } from "../../convex/_generated/dataModel";

// export interface Product {
//         _id: Id<"products">,
//         approved: boolean,
//         product_cartegory: string,
//         product_condition: string,
//         product_description: string,
//         product_image: string[]
//         product_name: string,
//         product_owner_id: string,
//         product_price: string,
//         product_embeddings?: number[],
//         product_image_embeddings?: number[],
//         product_likes?: number,
//         product_views?: number,
//         product_sponsorship?: {
//                 type?: "basic" | "premium" | "platinum",
//                 duration?: number,
//                 status?: "active" | "expired"
//         }
//         _creationTime: number
// }

// interface SingleExpiryEmailOptions {
//   title?: string;
//   subtitle?: string;
//   headerColor?: string;
//   warningColor?: string;
//   urgentColor?: string;
//   companyName?: string;
//   companyLogo?: string;
//   footerText?: string;
//   unsubscribeUrl?: string;
//   websiteUrl?: string;
//   supportEmail?: string;
//   supportPhone?: string;
// }

// export function generateSingleProductExpiryHTML(
//   product: Product,
//   options: SingleExpiryEmailOptions = {}
// ): string {
//   const {
//     title = "⚠️ Product Expiring Soon",
//     subtitle = "Don't let your product go to waste! Take action now to avoid expiry.",
//     headerColor = "#dc2626",
//     warningColor = "#f59e0b",
//     urgentColor = "#ef4444",
//     companyName = "Your Store",
//     companyLogo = "",
//     footerText = "We're here to help you manage your inventory better!",
//     unsubscribeUrl = "#",
//     websiteUrl = "#",
//     supportEmail = "support@yourstore.com",
//     supportPhone = "(555) 123-4567"
//   } = options;

//   const getUrgencyColor = (days: number) => {
//     if (days <= 1) return urgentColor;
//     if (days <= 3) return warningColor;
//     return "#10b981"; // green for items with more time
//   };

//   const getUrgencyText = (days: number) => {
//     if (days === 0) return "⚠️ EXPIRES TODAY";
//     if (days <= 3) return `⚠️ EXPIRES IN ${days} DAYS`;
//     return `📅 EXPIRES IN ${days} DAYS`;
//   };

//   const getUrgencyBadge = (days: number) => {
//         const today = new Date();
//     if (days > today) return "URGENT";
//     if (days <= 3) return "WARNING";
//     return "NOTICE";
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price);
//   };

//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>${title} - ${companyName}</title>
//     <!--[if mso]>
//     <noscript>
//         <xml>
//             <o:OfficeDocumentSettings>
//                 <o:PixelsPerInch>96</o:PixelsPerInch>
//             </o:OfficeDocumentSettings>
//         </xml>
//     </noscript>
//     <![endif]-->
// </head>
// <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; line-height: 1.6;">
    
//     <!-- Email Container -->
//     <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
//         <tr>
//             <td align="center" style="padding: 20px 0;">
                
//                 <!-- Main Email Content -->
//                 <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;">
                    
//                     <!-- Header -->
//                     <tr>
//                         <td style="background: linear-gradient(135deg, ${headerColor} 0%, ${warningColor} 100%); padding: 30px; text-align: center;">
//                             ${companyLogo ? `
//                             <img src="${companyLogo}" alt="${companyName}" style="max-height: 50px; margin-bottom: 20px;" />
//                             ` : ''}
//                             <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
//                                 ${title}
//                             </h1>
//                             <p style="margin: 12px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
//                                 ${subtitle}
//                             </p>
//                         </td>
//                     </tr>
                    
//                     <!-- Urgency Banner -->
//                     <tr>
//                         <td style="padding: 20px 30px; background: linear-gradient(135deg, ${getUrgencyColor(product.daysUntilExpiry)}15 0%, ${getUrgencyColor(product.daysUntilExpiry)}25 100%); text-align: center;">
//                             <div style="background-color: ${getUrgencyColor(product.daysUntilExpiry)}; color: white; padding: 15px 25px; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
//                                 ${getUrgencyText(product.daysUntilExpiry)}
//                             </div>
//                         </td>
//                     </tr>
                    
//                     <!-- Product Section -->
//                     <tr>
//                         <td style="padding: 30px;">
//                             <div style="text-align: center; margin-bottom: 30px;">
//                                 <h3 style="margin: 0; color: #1f2937; font-size: 24px; font-weight: 600;">
//                                     📦 Product Details
//                                 </h3>
//                             </div>
                            
//                             <!-- Product Card -->
//                             <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 30px; border: 2px solid ${getUrgencyColor(product.daysUntilExpiry)}; position: relative; overflow: hidden;">
                                
//                                 <!-- Urgency Badge -->
//                                 <div style="position: absolute; top: -10px; right: 20px; background-color: ${getUrgencyColor(product.daysUntilExpiry)}; color: white; padding: 8px 16px; border-radius: 0 0 12px 12px; font-size: 12px; font-weight: bold; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
//                                     ${getUrgencyBadge(product.daysUntilExpiry)}
//                                 </div>
                                
//                                 <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
//                                     <tr>
//                                         <!-- Product Image -->
//                                         <td style="width: 200px; vertical-align: top; padding-right: 30px; text-align: center;">
//                                             <div style="width: 180px; height: 180px; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.15); margin: 0 auto;">
//                                                 <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
//                                             </div>
//                                         </td>
                                        
//                                         <!-- Product Details -->
//                                         <td style="vertical-align: top;">
//                                             <!-- Product Name and Category -->
//                                             <h2 style="margin: 0 0 8px 0; color: #1f2937; font-size: 24px; font-weight: 700;">
//                                                 ${product.name}
//                                             </h2>
                                            
//                                             ${product.category ? `
//                                             <div style="margin-bottom: 15px;">
//                                                 <span style="background-color: #e0f2fe; color: #0369a1; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">
//                                                     ${product.category}
//                                                 </span>
//                                                 ${product.quantity ? `
//                                                 <span style="background-color: #f3e8ff; color: #7c3aed; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-left: 8px;">
//                                                     Qty: ${product.quantity}
//                                                 </span>
//                                                 ` : ''}
//                                             </div>
//                                             ` : ''}
                                            
//                                             <!-- Expiry Information -->
//                                             <div style="background-color: ${getUrgencyColor(product.daysUntilExpiry)}20; border-left: 6px solid ${getUrgencyColor(product.daysUntilExpiry)}; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
//                                                 <div style="color: ${getUrgencyColor(product.daysUntilExpiry)}; font-weight: bold; font-size: 16px; margin-bottom: 8px;">
//                                                     Expires: ${formatDate(product.expiryDate)}
//                                                 </div>
//                                                 ${product.location ? `
//                                                 <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
//                                                     📍 Location: ${product.location}
//                                                 </div>
//                                                 ` : ''}
//                                                 ${product.batchNumber ? `
//                                                 <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
//                                                     🏷️ Batch: ${product.batchNumber}
//                                                 </div>
//                                                 ` : ''}
//                                                 ${product.storageInstructions ? `
//                                                 <div style="color: #6b7280; font-size: 14px;">
//                                                     ❄️ Storage: ${product.storageInstructions}
//                                                 </div>
//                                                 ` : ''}
//                                             </div>
                                            
//                                             <!-- Pricing and Actions -->
//                                             ${product.discountPrice ? `
//                                             <div style="margin-bottom: 20px;">
//                                                 <div style="margin-bottom: 10px;">
//                                                     <span style="color: ${headerColor}; font-size: 28px; font-weight: 700;">
//                                                         ${formatPrice(product.discountPrice)}
//                                                     </span>
//                                                     ${product.originalPrice ? `
//                                                     <span style="color: #9ca3af; font-size: 18px; text-decoration: line-through; margin-left: 12px;">
//                                                         ${formatPrice(product.originalPrice)}
//                                                     </span>
//                                                     <span style="background-color: #ef4444; color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-left: 12px;">
//                                                         SAVE ${formatPrice(product.originalPrice - product.discountPrice)}
//                                                     </span>
//                                                     ` : ''}
//                                                 </div>
//                                                 <a href="${websiteUrl}/product/${product.id}" style="display: inline-block; background: linear-gradient(135deg, ${headerColor} 0%, ${warningColor} 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.3s ease;">
//                                                     🛒 Buy Now - Limited Time!
//                                                 </a>
//                                             </div>
//                                             ` : `
//                                             <div style="margin-bottom: 20px;">
//                                                 <a href="${websiteUrl}/product/${product.id}" style="display: inline-block; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
//                                                     📋 View Product Details
//                                                 </a>
//                                             </div>
//                                             `}
//                                         </td>
//                                     </tr>
//                                 </table>
//                             </div>
//                         </td>
//                     </tr>
                    
//                     <!-- Action Section -->
//                     <tr>
//                         <td style="padding: 0 30px 30px 30px;">
//                             <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 16px; padding: 30px; text-align: center; border: 2px solid #0ea5e9;">
//                                 <h3 style="margin: 0 0 15px 0; color: #0c4a6e; font-size: 22px; font-weight: 600;">
//                                     💡 Need Help?
//                                 </h3>
//                                 <p style="margin: 0 0 25px 0; color: #075985; font-size: 16px;">
//                                     Contact our support team for assistance with your product
//                                 </p>
//                                 <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
//                                     <a href="mailto:${supportEmail}" style="display: inline-block; background-color: #0ea5e9; color: white; text-decoration: none; padding: 15px 25px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
//                                         📧 Email Support
//                                     </a>
//                                     <a href="tel:${supportPhone}" style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 25px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
//                                         📞 Call ${supportPhone}
//                                     </a>
//                                 </div>
//                             </div>
//                         </td>
//                     </tr>
                    
//                     <!-- Footer -->
//                     <tr>
//                         <td style="background-color: #1f2937; padding: 30px; text-align: center;">
//                             <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
//                                 ${footerText}
//                             </p>
//                             <p style="margin: 0 0 25px 0; color: #9ca3af; font-size: 14px;">
//                                 This notification helps you avoid waste and save money
//                             </p>
                            
//                             <!-- Social Links -->
//                             <div style="margin-bottom: 25px;">
//                                 <a href="#" style="display: inline-block; margin: 0 12px; width: 45px; height: 45px; background-color: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 45px; text-decoration: none; transition: all 0.3s ease;">
//                                     <span style="color: #ffffff; font-size: 18px;">📘</span>
//                                 </a>
//                                 <a href="#" style="display: inline-block; margin: 0 12px; width: 45px; height: 45px; background-color: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 45px; text-decoration: none; transition: all 0.3s ease;">
//                                     <span style="color: #ffffff; font-size: 18px;">📷</span>
//                                 </a>
//                                 <a href="#" style="display: inline-block; margin: 0 12px; width: 45px; height: 45px; background-color: rgba(255,255,255,0.1); border-radius: 50%; text-align: center; line-height: 45px; text-decoration: none; transition: all 0.3s ease;">
//                                     <span style="color: #ffffff; font-size: 18px;">🐦</span>
//                                 </a>
//                             </div>
                            
//                             <p style="margin: 0; color: #6b7280; font-size: 12px;">
//                                 © 2024 ${companyName}. All rights reserved.<br>
//                                 <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> | 
//                                 <a href="#" style="color: #9ca3af; text-decoration: underline;">Privacy Policy</a>
//                             </p>
//                         </td>
//                     </tr>
                    
//                 </table>
                
//             </td>
//         </tr>
//     </table>
    
// </body>
// </html>
//   `.trim();
// }

// // Example usage function for single product expiry notification
// export function sendSingleProductExpiryEmail(
//   product: SingleExpiringProduct, 
//   customerEmail: string, 
//   options?: SingleExpiryEmailOptions
// ) {
//   const htmlContent = generateSingleProductExpiryHTML(product, options);
  
//   // Here you would integrate with your email service
//   console.log('Generated single product expiry notification HTML for email:', htmlContent);
  
//   return htmlContent;
// }