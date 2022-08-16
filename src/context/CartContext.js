import { createContext, useState } from "react";


const CartContext = createContext()

const CartProvider = ({children}) =>{
    const [cartProducts, setCartProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)

    const preciosProductos = cartProducts.map((product) => product.price * product.countQuantity)
    let totalPreciosProductos = preciosProductos.reduce((a,b) => a+b, 0)

    console.log("cartProducts: ", cartProducts)

    const addProductToCart = (product) => {
        const productIndex = cartProducts.findIndex((productInCart) => productInCart.id  === product.id)
        if(productIndex === -1){
            setTotalProducts(totalProducts + product.countQuantity)
            setCartProducts([...cartProducts, product])
        } else{
            const cartCopy = [...cartProducts];
            cartCopy[productIndex].countQuantity = cartCopy[productIndex].countQuantity + product.countQuantity
            setCartProducts(cartCopy)
            
/*             const cartCopy = [...cartProducts];
            if(cartCopy[productIndex].countQuantity >= cartCopy[productIndex].stock){
                console.log(cartCopy[productIndex].countQuantity)
                alert(`Maximo permitido: ${product.stock}`)
            } else{
                cartCopy[productIndex].countQuantity = cartCopy[productIndex].countQuantity + product.countQuantity
                console.log("cartCopy: ",cartCopy[productIndex].stock)

            } */
        }

/*         const isProductInCart = cartProducts.find((productInCart) => productInCart.id  === product.id)

        const newArray = cartProducts.map(productInCart =>{
            if(productInCart.id === product.id){
                return {...productInCart, countQuantity: productInCart.countQuantity + product.countQuantity}
            } else{
                return productInCart;
            }
        })
        setCartProducts(newArray) */
    }

    const clear = () => {
        setCartProducts([])
        setTotalProducts(0)
    }

    const removeItem = (id) => {

        const newCart = cartProducts.filter((product) => product.id !== id)
        setCartProducts(newCart)
/* 
        const newCart = cartProducts.filter((product) => product.id !== id)
        const totalQuantity = cartProducts.map((product) => product.countQuantity)
        let totalDeEso = totalQuantity.reduce((a,b) => a+b, 0)
       
        console.log("Que es totalProducts", totalProducts)
        setCartProducts(newCart) */


/*         let totalDeEso = totalQuantity.reduce((a,b) => a+b, 0)
        let resultado = totalDeEso - totalProducts


        console.log("QUantity TOtal: ", resultado) */
        
        
/*         const totalNewCart = newCart.map((product)=> product.countQuantity)
        let totalDeEso = totalNewCart.reduce((a,b) => a+b, 0)
        setTotalProducts(totalNewCart - totalDeEso)
        console.log("Total de esto:", totalDeEso)
        console.log("Productos tottales: ", totalProducts) */

    }

    
    const data = {
        cartProducts,
        /* para modificarlos se pone setcartproducts */
        setCartProducts,
        clear,
        removeItem,
        addProductToCart,
        totalProducts,
        totalPreciosProductos
    }
    
    return(
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider

export { CartContext }