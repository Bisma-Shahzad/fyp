import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuth } from "./firebasemethods"

export default function ProtectedRoute({ Component }) {
    const nav = useNavigate()
    useEffect(() => {
        checkAuth().then((uid) => {
            console.log(uid, "User logged in")
        }).catch((err) => {
            console.log(err)
            nav("/")
        })
    }, [])
    return <>
        {<Component />}
    </>
}