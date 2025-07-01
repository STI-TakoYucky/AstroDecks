import { SignUp } from '@clerk/clerk-react'

function App() {

  return (
    <main className='flex justify-center h-screen items-center'>
        <SignUp signInUrl="/sign-in" signInFallbackRedirectUrl="/"/>
    </main>
  )
}

export default App
