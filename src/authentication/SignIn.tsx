import { SignIn } from '@clerk/clerk-react'

function App() {

  return (
    <main className='flex justify-center h-screen items-center'>
        <SignIn signUpUrl="/sign-up" signUpFallbackRedirectUrl="/"/>
    </main>
  )
}

export default App
