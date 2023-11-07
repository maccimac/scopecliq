import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import { storeProject} from '../store/project-store';
import { useDispatch, useSelector} from 'react-redux';
import { setAsClient} from '../store/user-store';


const Invoice = () => {
    const api = global.config.API
    const dispatch = useDispatch()
    const project = useSelector(storeProject)
    const { invoiceId } = useParams();

    const getInvoiceDetails = async () =>{
        const res = await axios.get(`${api}/invoices/1`)
        console.log({res})
    }


    useEffect(()=>{
        getInvoiceDetails()
    }, [])

    return(
        <div class="sq-invoice">
            
            {invoiceId}
        </div>
    )
}
export default Invoice;

