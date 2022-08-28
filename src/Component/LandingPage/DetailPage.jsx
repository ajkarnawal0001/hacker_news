import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { detailUrl } from '../Redux/actionTypes'
import { Cont } from './Home'

export const DetailPage = () => {
    const params = useParams()
    const [detailNews,setDetailNews] = useState()
    const objid = params.objectID
    const fetchDetails =()=>{
        
        const url = `${detailUrl}${objid}`
        axios.get(url)
        .then((res)=>{
            console.log(res.data)
        })       
    }
    useEffect(()=>{
        fetchDetails()
    },[])
  return (
    <Cont>DetailPage</Cont>
  )
}
