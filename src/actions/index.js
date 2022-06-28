import {auth,provider,storage} from '../firebase'
import db from '../firebase'
import { SET_LOADING_STATUS, SET_USER,GET_ARTICLES} from './actionType'
import store from '../store'


export const setUser = (payload) => {
    return {
        type: SET_USER,
        user: payload,
    }
}


export const setLoading = (status) => {
    return {
        type: SET_LOADING_STATUS,
        status: status
    }
}

export const getArticles = (payload) => {
    return {
        type:GET_ARTICLES,
        payload: payload
    }
}
export const signInApi = () => {

    return (dispatch) => {
        
        auth.signInWithPopup(provider)
        .then(payload => {
            dispatch(setUser(payload.user))
            console.log(store.getState())
        }).catch (error => alert(error.message))
    }
}


export const getUserAuth = () => {
    return (dispatch) => {
        auth.onAuthStateChanged(async(user) => {
            if (user){
                dispatch(setUser(user))
                console.log(user.displayName)
            }
        })
    }
}


export const signOutApi = () => {
    return(
        (dispatch) => {
        auth.signOut()
        .then(() => {
            dispatch(setUser(null))
        })
        .catch((error) => {console.log(error.message)})
        }
    )
}

export function postArticleAPI(payload) {
return(dispatch) => {
    dispatch(setLoading(true))
    if (payload.image !== ''){
        const upload = storage.ref(`images/${payload.image.name}`)
        .put(payload.image);

        upload.on('state_changed',(snapshot) => {
            const progress= 
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(`Progress : ${progress}%`);

            if (snapshot.state === 'RUNNING'){
            console.log(`Progress : ${progress}%`);
             
            }
 
        }, error => console.log(error.code),
            async () => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL()
                db.collection('articles').add({
                    actor:{
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date:payload.timeStamp,
                        image: payload.user.photoURL
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments:0,
                    description: payload.description,
                })
                dispatch(setLoading(false))
            }
        );

    }else if(payload.video){
        db.collection('articles').add({
            actor:{
                    description: payload.user.email,
                        title: payload.user.displayName,
                        date:payload.timeStamp,
                        image: payload.user.photoURL
            },
            video: payload.video,
            sharedImg: '',
            comments:0,
            description: payload.description,
        })
        dispatch(setLoading(false))

    }
}
}

export function getArticleAPI(){
    return (dispatch) => {
        let payload;

        db.collection('articles').orderBy('actor.date','desc')
        .onSnapshot((snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data())
            dispatch(getArticles(payload))
        })
    }
}
