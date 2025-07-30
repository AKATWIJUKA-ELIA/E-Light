export const CreateNewsLetter =(content:string)=>{
        const currentYear = new Date().getFullYear()
        return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ShopCheap Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px 20px; text-align: center; background-color: #007bff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="font-size: 24px; color: #ffffff; margin: 0;">ShopCheap Newsletter</h1>
              <p style="font-size: 16px; color: #e6f0ff; margin: 8px 0 0;">Discover New Products & Updates!</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 20px 30px; font-size: 16px; line-height: 24px; color: #555555;">
              <p style="margin: 0 0 16px;">Hello from ShopCheap,</p>
              <p style="margin: 0 0 16px;">
                Welcome to the latest ShopCheap newsletter! We’re excited to share new products, boosted deals, and updates from our platform, built with @convex_dev and @resend for the #ConvexResendHackathon.
              </p>

              <p style="margin: 0 0 16px;">
              ${content}
              </p>

             
              </table>
              <!-- Call to Action -->
              <p style="margin: 16px 0;">
                Love what you see? Explore more products on ShopCheap or share this newsletter on X to spread the word!
              </p>
           
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f8f8f8; text-align: center; font-size: 14px; color: #777777; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="margin: 0 0 10px;">This is an automated message from ShopCheap. Please do not reply directly.</p>
              <p style="margin: 0;">&copy; ${currentYear} ShopCheap. All rights reserved.</p>
          
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
}