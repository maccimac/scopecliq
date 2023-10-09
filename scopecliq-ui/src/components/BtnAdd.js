import axios from 'axios'
import { useState, useEffect } from "react";
import logo from '../assets/img/logo@2x.png'

export const BtnAdd = ({
    cb
}) => {
    return(
        <div onClick={cb} class="sq-btn-add">
            <i class="fa-solid fa-plus"></i>
        </div>
    )
}

export default BtnAdd;