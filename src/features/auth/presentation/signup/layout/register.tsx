import { SignupProvider } from "../context/signup_provider"
import { VerificationPage } from "../pages/verification_page"
import { SignupLayout } from "./signup_layout"

export const Register=()=>{
    return(
       
       <SignupProvider>
        <SignupLayout>
            <VerificationPage/>
        </SignupLayout>
       </SignupProvider>
       
    )
}