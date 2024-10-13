import { useContext } from "react"
import { Store } from "../Store"

export default function Cart() {
    const {state,dispatch}=useContext(Store)
    console.log({'cartScreen': state})
    return(
        <div>
            <h1>Hii You are in the cart screen </h1>
        </div>
    )
}