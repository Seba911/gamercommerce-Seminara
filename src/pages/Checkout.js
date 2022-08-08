import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Fab from '@mui/material/Fab';


import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';


import * as React from 'react';

import { Table } from 'reactstrap';

const CheckOut = () => {

    const { cartProducts, clear, removeItem } = useContext(CartContext)

    return (
        <div className=''>
            <h1 className="text-white">Pagina Checkout</h1>
            {cartProducts.length === 0 ? 
                    <div className='text-center '>
                        <div className=''>
                            <RemoveShoppingCartIcon style={{color:"gray"}}/>
                        </div>
                        <div>
                            <p className='w-50 m-auto' style={{fontSize:".75em", color:"gray", textAlign:"center"}}>Aún no tenes productos cargados</p> 
                        </div>
                    </div>
                    :
                    cartProducts.map((product) =>{
                    {console.log("Titulo del producto: " , product.title)}
                    return(
                        <div key={product.id} className="card px-4 m-3">
                            <h6>{product.title}</h6>
                            <div className='d-flex'>
                                <img style={{width:"90px"}} src={product.img} alt={product.title}/>
                                <div className='m-3'>
                                    <p style={{fontSize:".6em"}}><strong>Precio:</strong> $ {product.price} c/u</p>
                                    <div className='d-flex'>
                                        <p className='m-0 p-0' style={{fontSize:".6em"}}>{console.log("Cantidad: ", product.countQuantity )}CANTIDAD: {product.countQuantity}</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                <Fab size="small" color="warning" className="" aria-label="add" onClick={() => removeItem(product.id)}>
                                    <DeleteIcon />
                                </Fab>

                                </div>
                            </div>
                            
                            <hr className="" />
                        </div>
                    )
                })}
                
        </div>
    )
}
export default CheckOut