const mongoose = require('mongoose')

 global.food_items=0;
const connectDB =async  (url) => {
  try{
  await  mongoose.connect(url, {
    useNewUrlParser: true,
  })
  console.log('connected')
  const fetched_data=await mongoose.connection.db.collection('my collection');
  const mydata=await fetched_data.find({});
   await mydata.toArray().then((mydata)=>{
    
     global.food_items=mydata;
      // console.log(food_items);
  })
  const fetched_cat=await mongoose.connection.db.collection('food_Category');
  const catdata=await fetched_cat.find({});
   await catdata.toArray().then((data)=>{
     global.food_cat=data;
      // console.log(food_cat);
  })
}
  catch(err){
    console.log('Connection failed');
  }
}

// module.exports = connectDB
// module.exports = food_items;
module.exports = {
  connectDB,
  // food_items
};