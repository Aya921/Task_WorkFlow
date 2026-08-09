import { useContext } from "react"
import { SignupContext } from "../context/signup_context"

export const useSignupContext = () => {
    const context=useContext(SignupContext)
    if (!context) {
        throw new Error("useSignupContext must be used within a SignupProvider");
    }
    return context;
}