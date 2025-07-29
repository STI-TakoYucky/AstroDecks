import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { User } from 'lucide-react';
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';

export default function UsernameComponent({setEmailVerified, username, setUsername, email, password}: any) {

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleUsernameVerification = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { status } = await axios.post(`${import.meta.env.VITE_API_URL}/api/protected/verify-username`,{ username });
            
            if (status == 200) {
                setError(null)
                const { data: signUpData } = await axios.post(`${import.meta.env.VITE_API_URL}/api/protected/sign-up`,{ email: email.trim(), password: password.trim(), username:username.trim() });
                setSuccess(signUpData.message)
                setTimeout(() => {
                    navigate('/sign-in')
                }, 2000);
            }

        } catch (error: any) {
            setError(error.response.data.message);
        }
    }

  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-header-font">You are almost there!</CardTitle>
          <CardDescription>
            Enter your username and you are good to go!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleUsernameVerification(e)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3 relative">
                  <User size={18} className="absolute bottom-[9px] left-3 text-gray-600"/>
                  <Input
                    type="text"
                    className='px-10'
                    onChange={(e) => setUsername(e.target.value)}
                    pattern='^.{5,30}$'
                    required
                    onInvalid={(e) => {
                        e.preventDefault()
                        setError("Invalid username, it should be 5-30 letters long.")
                    }}
                  />
                </div>

                <div>
                    {error && <p className="text-red-600">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}
                </div>
                <div className='flex gap-2'>
                    <Button type='button' onClick={() => setEmailVerified((prev: any) => !prev)} variant={"outline"} className="w-1/2">
                        Back
                    </Button>
                    <Button disabled={success ? true: false} type="submit" className="w-1/2">
                        Confirm
                    </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
