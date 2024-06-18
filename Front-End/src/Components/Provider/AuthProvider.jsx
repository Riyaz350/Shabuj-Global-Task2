import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import auth from "../../../firebase.config"
import { createContext, useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
// import useAxiosPublic from "../../Hooks/useAxiosPublic"

export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
    // const axiosPublic = useAxiosPublic()
    const [loading, setLoading] =useState(true)
    const [user, setUser] =useState(null)
    const [month, setMonth] =useState('january')
    const [userData, setUserData] = useState({})
    const axiosPublic = useAxiosPublic()
    const createUser = ( email, password) =>{
        setLoading(true)
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInPop = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        axiosPublic.get(`/user/${user?.email}`)
        .then(data=>setUserData(data.data))
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            const userEmail = currentUser?.email || user?.email 
            const loggedUser = {email: userEmail}
            
            setUser(currentUser)
            setLoading(false)
            if(currentUser){

                const userEmail = {email: currentUser.email}
                // create token
                // axiosPublic.post('/jwt', userEmail )
                // .then(res =>{
                //     if(res.data.token){
                //         localStorage.setItem('access-token', res.data.token)
                //         setLoading(false);

                //     }
                // })
            }
            else{

                localStorage.removeItem('access-token')
                setLoading(false);
            }
        })
        return()=>{
          unSubscribe()  
        }

        
    },[user?.email, axiosPublic])



    const authInfo = { user,loading,month, setMonth, createUser, signInUser,signInPop, logOut, userData }

return(
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
)
}

export default AuthProvider;