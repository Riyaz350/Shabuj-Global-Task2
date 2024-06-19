import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import auth from "../../../firebase.config"
import { createContext, useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
    const [loading, setLoading] =useState(true)
    const [user, setUser] =useState(null)
    const [usersApplications, setUsersApplications] = useState([])
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
        
        axiosPublic.get(`/applications`)
        .then(data=>setUsersApplications(data?.data.filter(applicant => applicant?.cpMail === user?.email))
        
    )
        
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })

        



        return()=>{
          unSubscribe()  
        }
    },[user?.email, axiosPublic])



    const authInfo = { user,loading,month, setMonth, createUser, signInUser,signInPop, logOut, userData, usersApplications }

return(
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
)
}

export default AuthProvider;