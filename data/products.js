    const products = [
      {
        name: 'Modern 3-Seater Sofa',
        // Yeh filename bilkul sahi hai
        images: ['/images/sofa.jpg'], 
        description: 'Comfortable and stylish sofa for your living room.',
        category: 'Furniture',
        pricePerDay: 849,
      },
      {
        name: 'Queen Size Bed',
        // Hum is image ko bed ke liye use kar rahe hain
        // Filename ko bilkul aaram se check karein
        images: ['/images/LED-TV-Rental-Bangalore.jpg'], 
        description: 'A comfortable queen size bed for a good night sleep.',
        category: 'Furniture',
        pricePerDay: 999,
      },
      {
        name: 'Smart TV 43 inch',
         // Is filename mein space aur brackets ka dhyan rakhein
        images: ['/images/36 (1).jpg'],
        description: '4K Ultra HD Smart LED TV.',
        category: 'Electronics',
        pricePerDay: 1299,
      },
    ];
    
    module.exports = products;
    