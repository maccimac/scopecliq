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
        const res = await axios.get(api+'/deliverables/project/'+ projId)
        console.log(res.data)
        setDeliverables(res.data)
    }

    const updateDeliverableStatus = async() => {
        // const payloadStatus = {
        //     status: "updated"
        // }

        // const res = await axios.post(`${api}/deliverables/update/1`, payloadStatus, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        // });
        // console.log(res)

        const res = await axios.post(`${api}/deliverables/update/1/status/not_started`)
        console.log(res)

    }

    const editDeliverable = async(deliverable) => {
        const payloadStatus = {
            // ...deliverable,
            description: deliverable.description + " (Edited)",
        }

        const res = await axios.post(`${api}/deliverables/edit/${deliverable.id}`, payloadStatus, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)
        getDeliverables()
    }

    const addDeliverable = async(milestoneId) =>{

        const payloadStatus = {
            description: "New deliverable"
        }

        const res = await axios.post(`${api}/deliverables/add/milestone/${milestoneId}`, payloadStatus, {
            headers: {
              "Content-Type": "application/json",
            },
        });
        console.log(res)

        getDeliverables()

    }

    const addMilestone = async() => {
        const payloadStatus = {
            name: title,
            description: "new desc"
        }
        const res = await axios.post(`${api}/milestones/add/${projId}`, payloadStatus, {
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
                        {d.description} / {d.status} / {d.milestone_id } /<button onClick={()=>{editDeliverable(d)}}>Edit</button>
                    </div>   
                )
            )}

            <br/>

            {milestones.length && milestones.map(
                (m, i) => (
                    <div>
                        {m.name} / {m.description} / <button onClick={()=>{addDeliverable(m.id)}}>Add deliverable to milestone</button>
                    </div>   


                )
            )}

            <input value={title} onChange={evt => setTitle(evt.target.value)}></input>
            <button onClick={addMilestone}>add milestone</button>
    </div>    
    )
    
}


export default Home;