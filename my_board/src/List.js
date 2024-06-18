import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function getList(){
    let list = [];

    let temp = localStorage.getItem('bbsList');

    if(temp != null && temp != undefined)
        list = JSON.parse(temp);
    return list;
}

function List (){
    const list = getList();
    const lis=[];
    if (list != null && list != undefined){

        for (let i = 0; i < list.length; i++) {
            let li = list[i];
            lis.push(<li className='list' key={li.bbsId} >
                {li.bbsId}. <Link to={'/detail/' + li.bbsId}>{li.title}</Link>
            </li>);
        }
    }   
    // if (lis.length == 0){
    //     lis = <div>'작성된 글이 없습니다.'</div>
    // }
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