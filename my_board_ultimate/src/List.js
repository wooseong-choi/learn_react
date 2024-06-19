import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// function getList(){
//     let list = [];

//     let temp = localStorage.getItem('bbsList');

//     if(temp != null && temp != undefined)
//         list = JSON.parse(temp);
//     return list;
// }

function List (){
    const [list, setList] = useState([]);
    // let list;
    useEffect(()=>{
        axios.get('http://localhost:3333/bbs/')
        .then(res =>{
            console.log(res);
            setList(res.data);
        }).catch(err=>{
            console.error('Error fetching data:', err);
        })
    },[]);

    const lis = list.map(li => (
        <li className='list' key={li.bbs_id}>
            {li.bbs_id}. <Link to={'/detail/' + li.bbs_id}>{li.title}</Link>
        </li>
    ));

    return (
        <>
        <div className='buttonBox'>
            <button><Link to={'/write'}>글쓰기</Link></button>
        </div>
        <div >
            <ul>            
                {lis}
            </ul>
        </div>
        </>
    )
}

export default List;