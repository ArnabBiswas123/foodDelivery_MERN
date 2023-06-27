const express=require('express');
const router=express.Router()

router.post('/foodData',(req,res)=>{
try {
    // console.log(food_items,food_cat);
    res.send([food_items,food_cat]);
    // res.send(food_cat);
} catch (error) {
    console.log(error);
    res.send("Server Error");
}
})

module.exports=router;