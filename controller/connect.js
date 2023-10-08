// const {MongoClient} = require('mongodb');

// async function main() {
//   const client = new MongoClient('mongodb://localhost:27017');

//   try {
//     await client.connect();
    
//     const db = client.db('pos_db');
    
//     // Thêm admin mặc định
//     await db.collection('users').insertOne({
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: '123456', 
//       role: 'admin' 
//     });

//     // Thêm mẫu sản phẩm
//     await db.collection('products').insertMany([
//       {
//         name: 'Iphone X',
//         category: 'Phone',
//         quantity: 10,
//         price: 1000
//       },
//       {
//         name: 'Samsung Galaxy S10',
//         category: 'Phone',
//         quantity: 5,
//         price: 800
//       }
//     ]);
    
//     // Thêm mẫu khách hàng
//     await db.collection('customers').insertOne({
//       name: 'John Doe',
//       phone: '0123456789',
//       email: 'john@example.com',
//       address: '123 Main St'
//     });
    
//     console.log('Added sample data');
    
//   } catch(e) {
//     console.error(e);
//   } finally {
//     client.close();
//   }
// }

// main();