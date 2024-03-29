import { Row } from 'reactstrap'
import ItemList from "../ItemList/ItemList"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
/* collection interactua con las colecciones. Este trae info. getDocs con los documentos */
import { collection, getDocs, query, where } from 'firebase/firestore'
import db from '../../firebaseConfig'

const ItemListContainer = ({section}) =>{

    const [loading, setLoading] = useState(false);

    const [listProducts, setListProducts] = useState([])

    const {categoryId} = useParams()

    const getProducts = async () =>{
        /* primer parametro conexion a firebase, y la otra a la colecion q hacemos referencia */
        const productCollection = collection(db, 'productos')
        /* Snapshot es el objeto q nos devuelve a traves del getDocs */
        setLoading(true)
        const productSnapshot = await getDocs(productCollection)
        const productList = productSnapshot.docs.map( (doc) =>{
            let product = doc.data()
            /* crea una nueva propiedad , la ".id" */
            product.id = doc.id
            return product
        })
        return productList
    }

    useEffect(() =>{
        getProducts()
        .then((res) => {
            setLoading(false)
            setListProducts(res)
        })

    },[])


    useEffect(()=>{
        const queryCollection = collection(db,"productos")
        if (categoryId){
            const queryFilter= query(queryCollection, where("category" , "==", categoryId))
            getDocs(queryFilter)
            .then(res =>setListProducts (res.docs.map(product =>({id: product.id, ...product.data()}))))
        }else{
        getDocs(queryCollection)
        .then(res =>setListProducts (res.docs.map(product =>({id: product.id, ...product.data()}))))
        }
    },[categoryId])
    

    return(
        <Row className="m-0 p-0 justify-content-center">
          <h4 className="mt-4" style={{color:"white", margin:""}}>{section}</h4>

          {/* <ItemList dataProducts={listProducts} /> */}
          {loading ? <Loading /> : <ItemList dataProducts={listProducts} />}
        </Row>
    )
} 
export default ItemListContainer