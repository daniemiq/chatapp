'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";

import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from 'react-icons/bs'
import axios from "axios";
import {toast} from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react'




type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        if(session?.status === 'authenticated'){
            console.log("Authenticated buddy ton't worry")
        }
    }, [])

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        } 
     } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
     })

     const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went Wrong! '))
            .finally(() => setIsloading(false))
        }
 
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })

            .then((callback) => {
                if(callback?.error){
                    toast.error('Invalid Credentials')
                }
                if(callback?.ok && !callback?.error){
                    toast.success('Successfully Logged In')
                }
            })

            .finally(() => setIsloading(false))
        }
     }

     const socialAction = (action: string) => {
        setIsloading(true)

        signIn(action, {redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials')
            }
            if(callback?.ok && !callback?.error){
                toast.success('Successfully Logged In')
            }
        })
        .finally(() => setIsloading(false))
     }
    return ( 
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                    >
                {variant === 'REGISTER' && (
                    <Input id="name"
                       label="Name" 
                       register={register}
                       errors={errors}
                       disabled={isLoading}
                    />
                )}

                <Input id="email"
                    label="Email Address"
                    type="email" 
                    register={register}
                       disabled={isLoading}
                       errors={errors}
                />
                <Input id="password"
                    label="Password"
                    type="password" 
                    register={register}
                       disabled={isLoading}
                       errors={errors}
                />
                <div>
                    <Button disabled={isLoading}
                            fullWidth
                            transition
                            type="submit"
                    >
                        {variant === 'LOGIN' ? 'Sign In' : 'Sign Up'}
                    </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">

                        <div className="w-full border-t border-gray-400"/>
                        
                    </div>
                    <div className=" relative flex justify-center text-sm">

                        <span className=" bg-white px-2 text-gray-400">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex gap-2">
                    <AuthSocialButton icon={BsFacebook}
                                      
                                      onClick={() => socialAction('github')}
                    />
                    <AuthSocialButton icon={BsGoogle}
                                      onClick={() => socialAction('google')}
                    />

                </div>
              </div>
              <div className=" flex gap-2
                              justify-center text-sm mt-6
                              px-2 text-sky-500"
              >
                <div>
                    {variant === 'LOGIN' ? 'New to FreshChat ?': 'Already have an account ?'}
                </div>
                <div className="underline cursor-pointer"
                     onClick={toggleVariant}
                >
                    {variant === 'LOGIN' ? 'Create an Account' : 'Login'}
                </div>
              </div>
            </div>
        </div>
     );
}
 
export default AuthForm;