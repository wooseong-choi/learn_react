import React, {Component, useState, useReducer, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function ButtonBox(props){

    let isUpdate = '';

    if( props.uId != null )
        isUpdate = <button><Link to={'/write/'+props.bbsId}>글 수정</Link></button>

    return (
        <div className='buttonBox'>
            <button><Link to={'/list'}>뒤로가기</Link></button>
            {isUpdate}
        </div>
    )
}

function Detail(){
    // const location = useLocation();
    // let temp = location.pathname.split('/');
    // bbsId = temp[temp.length-1];
    const { bbsId } = useParams();

    let [bbs, setBbs] = useState('');

    const [comments, setComments] = useState([]);

    // 댓글 작성 시 필요한 state
    const [newComment, setNewComment] = useState('');

    let user = localStorage.getItem('user');

    let uId;

    if(user != null && user != undefined){
        user = JSON.parse(user);
        uId = user.uid;
    }else
        uId = null;

    const url = 'http://localhost:3333/bbs/detail/'+bbsId;
    // console.log(url);
    useEffect(()=>{
        axios.get(url)
        .then(res =>{
            console.log(res);
            setBbs(res.data);
        }).catch(err=>{
            console.error('Error fetching data:', err);
        })
    },[]);

    const comment_url = 'http://localhost:3333/bbs/comment/'+bbsId;
    useEffect(()=>{
        axios.get(comment_url)
        .then(res =>{
            console.log(res);
            setComments(res.data);
        }).catch(err=>{
            console.error('Error fetching data:', err);
        })
    },[]);



    // 댓글 입력 핸들러
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 추가 핸들러
    const addComment = () => {
        if(uId == null) return alert('로그인한 회원만 작성할수 있습니다.');

        if (newComment.trim() !== '') {
            // 여기서 실제로 API 호출하거나 상태 업데이트
            const newCommentObj = {
                bbs_id:bbsId,
                uid:uId,
                content: newComment,
                use_yn:'Y'
            };
            
            axios.post("http://localhost:3333/bbs/comment",newCommentObj )
                .then(res =>{
                    console.log(res);
                    setBbs(res.data);
                }).catch(err=>{
                    console.error('Error fetching data:', err);
                })

            setComments([...comments, newCommentObj]);
            setNewComment('');
        }
    };

    return (
        <>
        <ButtonBox uId={uId} bbsId = {bbsId} />
        <div className='writeBox'>
            <div>
                <div>
                    <h2>{bbs.title}</h2>
                </div>
                <div>
                    <pre>{bbs.content}</pre>
                </div>
            </div>
            <div className='commentDiv'>
                {/* 댓글 입력 창 */}
                <textarea
                    rows="4"
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={handleCommentChange}
                ></textarea>
                <button onClick={addComment}>댓글 작성</button>

                {/* 댓글 목록 */}
                <ul className='commentList'>
                    {comments.map(comment => (
                        <li key={comment.comment_id}>
                            {comment.content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default Detail;