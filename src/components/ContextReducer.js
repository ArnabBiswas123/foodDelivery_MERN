import React,{useContext, useReducer} from 'react'


const CartStateContext=React.createContext();
const CartDispatchContext=React.createContext();


//reducer function takes the previous state and present state and with that returns a new state
const reducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
                return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
        case 'REMOVE':
            let newarr=[...state]
            newarr.splice(action.index,1)
            //delete 1 element from newarr from action.index

            return newarr
            case "UPDATE":
                let arr = [...state]
                arr.find((food, index) => {
                    if (food.id === action.id) {
                        // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                        arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                    }
                    return arr
                })
                return arr
            case 'DROP':
                let empArray=[]
                return empArray
        default:
            console.log("Error in reducer");
    }
}

export const CartProvider=((props)=>{

const [state,dispatch]=useReducer(reducer,[]);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {props.children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
})
export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(CartDispatchContext)