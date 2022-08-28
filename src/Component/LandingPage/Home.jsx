import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {randomUrl, searchUrl } from '../Redux/actionTypes'
import { Search } from '../SearchBar/Search'
import  './Home.css'
import {  Link } from 'react-router-dom'

export const Home = () => {
    const [page,setPage] = useState(1) 
    const [query,setQuery] = useState("")
    const [news,setNews] = useState([]) //storing photos in array
    const [loading,setLoading] = useState(false) //
    const [scroll,setscroll] = useState(true)

    useEffect(()=>{
        fetchNews(page,query)
        if(scroll===true){
            document.body.style.overflow = 'unset';
        }else{
            document.body.style.overflow = 'unset';
        }
    },[page,query,scroll])

    const fetchNews = async(page,query)=>{
        setLoading(true)
        let url;
        if(query){
            url = `${searchUrl}page=${page}&query=${query}`
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
    const handleSearch = (payload)=>{
        setQuery(payload)
        setPage(1)
    }
    return (
        <Cont>
            <Search handleSearch={handleSearch}/>
            {/* <RightCarousel className="carousel"/> */}
            <div className="js-grid hover14 column masonry" >
            {(news&&(
                news.map((item,i)=>(
                    <Link to={`/news/${item.objectID}`}>
                    <div key={i} 
                    // onClick={()=>{
                    //     history(`/news/${item.objectID}`)
                    // }} 
                    className="item">
                    <figure>
                    <GridBox >
                        <h4 style={{
                            padding:"2px"
                        }}>Author: {item.author}</h4>
                        <hr />
                        <h4 
                        style={{
                            padding:"2px"
                        }}>Title: {item.title}</h4>
                        </GridBox>
                        </figure>           
                </div>
                </Link>
                ))
                ))}
                </div>
        </Cont>
    )
}
export const Cont = styled.div`
    width:100%;
    margin:2rem auto;
`
const GridBox = styled.div`
    font-size:20px;
    width:100%;
    height:100%;
    border:3px solid gray;
     -webkit-box-shadow: 3px 9px 3px #9E9E9E;
    -moz-box-shadow: 3px 9px 3px #9E9E9E;
    box-shadow: 3px 9px 3px #9E9E9E;
`