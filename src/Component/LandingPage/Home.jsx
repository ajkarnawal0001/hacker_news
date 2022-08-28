import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {randomUrl, searchUrl } from '../Redux/actionTypes'
import { Search } from '../SearchBar/Search'
import  './Home.css'
import Modal from 'react-modal'
import { customStyles, ModelImage } from './ModelStyle'

export const Home = () => {
    const [page,setPage] = useState(1) 
    const [query,setQuery] = useState("")
    const [news,setNews] = useState([]) //storing photos in array
    const [loading,setLoading] = useState(false) //
    const [currentImage,setCurrenetImage] = useState(null)
    const [scroll,setscroll] = useState(true)


    useEffect(()=>{
        fetchPhotos(page,query)
        if(scroll===true){
            document.body.style.overflow = 'unset';
        }else{
            document.body.style.overflow = 'unset';
        }
    },[page,query,scroll])

    const fetchPhotos = async(page,query)=>{
        setLoading(true)
        let url;
        if(query){
            url = `${searchUrl}&page=${page}&query=${query}`
        }else{
            url = `${randomUrl}&page=${page}`
        }
        axios.get(url)
        .then((res)=>{
            let data = res.data.hits
            console.log(data)
            setNews((oldNews)=>{
                if(query && page===1){
                    return [...data.results]
                }else if(query && page){
                    return [...oldNews,...data.results]
                }
                else{
                    return [...oldNews,...data]
                }
            })
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        const event = window.addEventListener("scroll",()=>{
            if((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight-2){
                setPage((oldPage)=>{
                    return oldPage+1
                })
            }
        })
        return () => window.removeEventListener("scroll",event)
    },[])
    const openModel= (item)=>{
    setCurrenetImage(item.urls.raw)   
    }
    const handleSearch = (payload)=>{
        setQuery(payload)
        setPage(1)
    }
    return (
        <Cont>
            <Modal isOpen={!!currentImage} onRequestClose={()=>setCurrenetImage(null)} style={customStyles}>
            <ModelImage src={currentImage} alt="Sorry"/>
            </Modal>
            <Search handleSearch={handleSearch}/>
            {/* <RightCarousel className="carousel"/> */}
            <div className="js-grid hover14 column masonry" >
            {(news&&(
                news.map((item,i)=>(
                    <div key={i} onClick={()=>openModel(item)} className="item">
                    <figure>
                    <GridBox >
                        {item.title}
                        </GridBox>
                        </figure>           
                </div>
                ))
                ))}
                </div>
        </Cont>
    )
}
const Cont = styled.div`
    width:100%;
    margin:2rem auto;
`
const GridBox = styled.h1`
    /* object-fit:cover; */
    width:100%;
    height:100%;
`