import React, {useState, useEffect} from 'react'
import { db } from './firebase'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

function Post({postId, imageUrl, username, caption}) {
   
  
    const [comments, setcomments] = useState([])
    const [comment, setcomment] = useState("")

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").onSnapshot((snapshot) => {
                setcomments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    const postComment = (event) => {

    }
   
    return (
        <div className='post'>
            <div className='post__header'>
                 <Avatar classname='post__avatar'
                  alt="Sharp" src="/static/images/avatar/1.jpg" />
              <h3> {username}</h3> 
            </div>
           

            <img className='post__image'
             src={imageUrl} />

            <h4 className='post__text'> <strong> {username}</strong>  {caption}</h4>

            <div classname='post__comments'>
                {comments.map((comment) => {
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                })}

            </div>

            <form classname='post__commentBox'>
                <input 
                    className='post__input'
                    type='text'
                    placeholder='Enter a comment...' 
                    onChange={event => setcomment(event.target.value)} 
                    value={comment}/>

                    <button
                     className='post__button'
                     disabled={!comment}
                     type='submit'
                     onClick={postComment}>
                         Post
                     </button>
            </form>
        </div>
    )
}

export default Post
