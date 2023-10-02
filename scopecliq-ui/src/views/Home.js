import axios from 'axios'
import { useState, useEffect } from "react";

const Home = () => {
    const api = global.config.API
    const projId = 2;

    const [clients, setClients] = useState([])
    const [deliverables, setDeliverables] = useState([])
    const [milestones, setMilestones] = useState([])

    const [title, setTitle] = useState("milestoneTitle")

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

    const createMilestone = async() => {
        const payloadStatus = {
            name: title,
            description: "new desc"
        }
        const res = await axios.post(`${api}/milestones/create/${projId}`, payloadStatus, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)
        setTitle('')
        getMilestones()

    }

    const getMilestones = async() => {
        const res = await axios.get(api+'/milestones/project/'+projId)
        console.log(res.data)
        setMilestones(res.data)
    }

    useEffect(()=>{
        getClients()
        console.log({clients})
        updateDeliverableStatus();
        getDeliverables();
        getMilestones();
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

            {milestones.length && milestones.map(
                (m) => (
                    <div>
                        {m.name} / {m.description}
                    </div>   

                )
            )}

            <input value={title} onChange={evt => setTitle(evt.target.value)}></input>
            <button onClick={createMilestone}>Create milestone</button>
    </div>    
    )
    
}


export default Home;