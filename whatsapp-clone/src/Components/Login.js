import { Button } from '@mui/material'
import React from 'react'
import './Login.css'
import {auth, provider} from '../firebase'
import {useStateValue} from '../StateProvider'
import {actionTypes} from '../reducer'


function Login() {
    // pull action from data layer
    const [{}, dispatch] = useStateValue();


    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            }
        ).catch((e)=>alert(e.message) )
    }

  return (
    <div className='login'>
        <div className="login__container">
            <img src="../../images/WhatsApp.svg" alt="Not reachable" />
            
            <div className="login__text">
                <h1>Sign in to Whatsapp</h1>
            </div>

            <Button onClick={signIn} >Sign in with Google</Button>

        </div>
    </div>
  )
}

export default Login