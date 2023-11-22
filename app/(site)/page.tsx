import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
      <div className='
           flex
           min-h-full
           flex-col
           justify-center
           py-12
           sm:px-6
           lg:px-8
           bg-gray-200'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md:'>
               <Image alt='Logo'
                      height="50"
                      width="50"
                      src="/images/logo.png"
                      className='mx-auto w-auto'/>

                <h2 className=' t-6 text-center text-3xl
                                font-bold tracking-tight text-gray-900'>
                                    Sign in to your Account
                                </h2>
            </div>
        <AuthForm/>
      </div>
  )
}
