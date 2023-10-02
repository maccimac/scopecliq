import axios from 'axios'
import { useState, useEffect } from "react";

const Home = () => {
    const api = global.config.API

    const [clients, setClients] = useState([])
    const [deliverables, setDeliverables] = useState([])
    const getClients = async() =>{
            const res = await axios.get(api+'/clients')
            console.log(res.data)
            setClients(res.data)
            // const json = await res.json()
            // console.log(json.data)
            // setClients(res.json().data)
    }

    const getDeliverables = async() =>{
        const res = await axios.get(api+'/deliverables')
        console.log(res.data)
        setDeliverables(res.data)
        // const json = await res.json()
        // console.log(json.data)
        // setClients(res.json().data)
    }

    const updateDeliverableStatus = async() => {
        const payloadStatus = {
            status: "updated"
        }

        const res = await axios.post(`${api}/deliverables/update/1`, payloadStatus, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)

    }

    useEffect(()=>{
        getClients()
        console.log({clients})
        updateDeliverableStatus();
        getDeliverables();
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
            <br/>
            {deliverables.length && deliverables.map(
                (d) => (
                    <div>
                        {d.name} / {d.status}
                    </div>   

                )
            )}
    </div>    
    )
    
}


export default Home;