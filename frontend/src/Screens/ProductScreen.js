import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function ProductScreen(){
    const params = useParams()
    const {slug} =params
    console.log(slug) 

    useEffect(()=>{
        const fetchProduct= async()=>{
            const result=await axios.get(`/api/product/slug/${slug}`)
            console.log(result)
        };
        fetchProduct();
    },[slug])
    return(
        <div>
            <h1>{slug}</h1>
        </div>
    )
}
export default ProductScreen