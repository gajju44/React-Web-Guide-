import React from 'react'
import '../globals.css'
import { Menu } from 'lucide-react';
import logo from '@/public/logo.svg'
import Image from 'next/image';
function Navbar() {
  return (
    <div className='flex justify-between fixed w-full top-0 items-center p-4 text-white'>
      
        <a href="" className='flex items-center justify-center gap-3'> <Image src={logo} alt='logo' /> PIXPORT</a>
      <div className=' gap-4 hidden lg:flex'>
        <a href="" className='softwareBtn p-2 !text-xs px-6 font-thin'>Software +</a>
        <a href="" className=' p-2 !text-xs  font-thin'>About Us</a>
        <a href="" className=' p-2 !text-xs font-thin'>Blog</a>
        <a href="" className=' p-2 !text-xs  font-thin'>Pricing</a>
        <a href="" className=' p-2 !text-xs  font-thin'>How It Works</a>
        <a href="" className=' p-2 !text-xs  font-thin'>Contact</a>
        </div>

        <a href="" className='bg-[#1b1c2f] py-3 rounded-full p-2 '><Menu strokeWidth={1.8} /></a>

    </div>
  )
}

export default Navbar
