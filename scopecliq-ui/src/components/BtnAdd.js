import axios from 'axios'
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { isClient} from '../store/user-store';


export const BtnAdd = ({
    cb
}) => {

    const api = global.config.API;
    const clientMode = useSelector(isClient);

    
    return(
        <div onClick={cb} class="sq-btn-add">
            <i class="fa-solid fa-plus"></i>
        </div>
    )
}

export default BtnAdd;