// function htmlContent(title, text, verificationLink) {
//   return `
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//           max-width: 800px;
//           margin: 20px auto;
//           padding: 20px;
//           color: #000;"
//         >
//           <h3 style="color: #000;">
//             <img src="cid:Logo" alt="NVM Patient" style="width: 40px; margin-right: 10px;" />
//             Greetings,
//           </h3>
//           <h2 style="text-align: center; color: #000;"><strong>${title}</strong></h2>
//           <p style="color: #000;">${text}</p>
//           <a
//         href="${verificationLink}"
//         style="display: block; text-align: center; margin-top: 30px"
//       >
//         <button
//           style="
//             background-color: #4caf50;
//             border: none;
//             color: white;
//             padding: 15px 32px;
//             text-align: center;
//             text-decoration: none;
//             display: inline-block;
//             font-size: 16px;
//             border-radius: 4px;
//           "
//         >
//           Verify Account
//         </button>
//       </a>
//           <p style="color: #000;"><strong>Kindly note:</strong> Please be aware of phishing sites and always make sure you are visiting the official NVM Patient website when entering sensitive data.</p>
//           <p style="margin-top: 60px; text-align: center; color: #000; font-size: 12px;">
//             © 2024 NVM Patient. All rights reserved.
//           </p>
//         </div>
//       </body>
//     </html>
//   `;
// }

// module.exports = htmlContent;

function htmlContent(title, text, verificationLink) {
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          color: #000;"
        >
          <h3 style="color: #000;">
            <img src="cid:Logo" alt="NVM Patient" style="width: 40px; margin-right: 10px;" />
            Greetings,
          </h3>
          <h2 style="text-align: center; color: #000;"><strong>${title}</strong></h2>
          <p style="color: #000;">${text}</p>
          <a
        href=${verificationLink}
        style="display: block; text-align: center; margin-top: 30px">
        <button
          style="
            background-color: #4caf50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 4px;
          "
        >
          Verify Account
        </button>
      </a>
          <p style="color: #000;"><strong>Kindly note:</strong> Please be aware of phishing sites and always make sure you are visiting the official NVM Patient website when entering sensitive data.</p>
          <p style="margin-top: 60px; text-align: center; color: #000; font-size: 12px;">
            © 2024 NVM Patient. All rights reserved.
          </p>
        </div>
      </body>
    </html>
    `;
}

module.exports = htmlContent;
