// Is file mein hamare saare email templates rahenge

// Yeh hamara main master template hai
const masterTemplate = (data) => {
    // Default values, agar koi data na mile to
    const defaults = {
        header: "Message from RentSmart",
        greeting: "Hello,",
        body: "This is a default message.",
        buttonText: "Learn More",
        buttonUrl: "https://rentsmart.com", // Aapki website ka URL
    };
    // Data aur defaults ko merge karein
    const content = { ...defaults, ...data };

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Basic Styles */
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .header { background-color: #14b8a6; color: #ffffff; padding: 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px; color: #333333; line-height: 1.6; }
            .content h2 { color: #0d9488; margin-top: 0; }
            .button-container { text-align: center; margin-top: 20px; }
            .button { background-color: #14b8a6; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; }
            .footer { background-color: #f1f5f9; color: #64748b; text-align: center; padding: 20px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${content.header}</h1>
            </div>
            <div class="content">
                <h2>${content.greeting}</h2>
                ${content.body}
                <div class="button-container">
                    <a href="${content.buttonUrl}" class="button">${content.buttonText}</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} RentSmart. All rights reserved.</p>
                <p>Indore, Madhya Pradesh, India</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Alag-alag email types ke liye data yahan define karenge
const getWelcomeEmailData = (name) => {
    return {
        header: "Welcome to RentSmart!",
        greeting: `Hello, ${name}!`,
        body: `
            <p>Thank you for joining RentSmart, the best place to rent and share goods in your community.</p>
            <p>We're excited to have you on board. You can now start exploring items or list your own to start earning.</p>
        `,
        buttonText: "Start Exploring",
        buttonUrl: "https://rentsmart.com/explore" // [TODO] Aapki website ka link
    };
};

module.exports = {
    masterTemplate,
    getWelcomeEmailData,
    // Future mein yahan aur templates add kar sakte hain (e.g., getForgotPasswordData)
};
