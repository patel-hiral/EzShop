import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { useDispatch } from 'react-redux';
import { logoutAction } from '@/store/slices/userSlice';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <div className='w-full pt-20'>
      <Card className='w-fit md:w-96 mx-auto'>
        <CardHeader>
          <img src={user.image} alt="" className='h-20 w-20 rounded-full border border-secondary shadow  mx-auto' />
          <p className='text-center font-semibold text-lg'>{user.username}</p>
          <h1 className='py-2 flex items-center text-sm justify-between'>
            <span className='font-semibold'>Name </span>
            {user.firstName} {user.lastName}
          </h1>
          <h1 className='py-2 flex items-center text-sm justify-between'>
            <span className='font-semibold mr-4'>Email </span>
            {user.email}
          </h1>
        </CardHeader>
        <CardContent><Link to="/react-store/orders" className='text-blue-600 hover:underline'>My Orders</Link></CardContent>
        <CardContent className="flex items-center justify-between">
          <Button variant="outline">Edit Profile</Button><Button onClick={() => dispatch(logoutAction())}>Log Out</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile