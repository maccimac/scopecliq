import axios from 'axios'
import { useState, useEffect } from "react";

const Home = () => {

    const [clients, setClients] = useState([])
    const getClients = async() =>{
            const res = await axios.get(global.config.API+'/clients')
            console.log(res.data)
            setClients(res.data)
            // const json = await res.json()
            // console.log(json.data)
            // setClients(res.json().data)

    }
    useEffect(()=>{
        getClients()
        console.log({clients})
    }, [])


    return (
        <div>
            <div>ScopeCliq</div>
            {clients.length && clients.map(
                (c) => (
                    <div>
                        {c.name}
                    </div>   

                )
            )}
    </div>    
    )
    
}


export default Home;