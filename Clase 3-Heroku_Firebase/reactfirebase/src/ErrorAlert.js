import authFirebaseErrors from './authErrors';
import React from 'react'


export default (props) => {
    if (props.error) {
        return <p>{authFirebaseErrors[props.error.code]}</p>
    }
    return <p></p>
}