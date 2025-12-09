'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { LogOutIcon } from 'lucide-react'

const Logout = () => {
  const handleLogout = async () => {
    await authClient.signOut()
  }

  return (
    <Button onClick={handleLogout} variant='outline'>
      Logout <LogOutIcon />
    </Button>
  )
}

export default Logout
