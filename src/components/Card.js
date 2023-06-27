import React, { useState,useRef,useEffect } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);//for retrieving the keys from key value pairs
    const dispatch=useDispatchCart()
     const data=useCart();
     const priceRef=useRef();

    const [qty,setQty]=useState(1);
    const [size,setSize]=useState("");
    const handleAddToCart=async ()=>{
        //updation logic
            let food=[];
            for(const item of data){
                if(item.id===props.foodItem._id){
                food=item;
                break;
            }}
            if(food!==[]){
                if(food.size===size){
                        await dispatch({type:'UPDATE',id:props.foodItem._id,price:finalPrice,qty:qty})
                        return;
                }
            
            else if(food.size!==size){
                await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
                return
            }
            return;}
            await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
            
            
    }
     
    let finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[]);


    return (
        <div><div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" style={{ height: "180px", objectFit: 'fill' }} alt="no" />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className="container w-100">
                    <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{setQty(e.target.value)}}>
                        <option key="1" value="1">1</option>
                        <option key="2" value="2">2</option>
                        <option key="3" value="3">3</option>
                        <option key="4" value="4">4</option>
                        <option key="5" value="5">5</option>
                        <option key="6" value="6">6</option>
                    </select>
                    <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                        {priceOptions.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                    </select>
                    <div className="d-inline h-100 fs-5">
                        {/* ₹ -> alt+4+ctrl together */}
                        ₹{finalPrice}/-
                    </div>
                </div>
                <hr></hr>
                <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div></div>
    )
}
