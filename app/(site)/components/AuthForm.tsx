'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [isLoading, setIsloading] = useState(false)

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
            // AXIOS 
        }
 
        if (variant === 'LOGIN') {
        //    AUTH
        }
     }

     const socialAction = (action: string) => {
        setIsloading(true)
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
                    />
                )}

                <Input id="email"
                    label="Email Address"
                    type="email" 
                    register={register}
                    errors={errors}
                />
                <Input id="password"
                    label="Password"
                    type="password" 
                    register={register}
                    errors={errors}
                />
                <div>
                    <Button>Login</Button>
                </div>
              </form>
            </div>
        </div>
     );
}
 
export default AuthForm;