import { LoginForm } from '@/components/login-form'
import React from 'react'

function Login() {
  return (
    <div className="flex min-h-svh rounded-lg flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login