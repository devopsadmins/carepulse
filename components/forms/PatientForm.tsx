"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { FormFieldType } from "@/types/FormFieldType"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"


const PatientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email:"",
            phone:""
        }
    })
    const onSubmit = async({name, email, phone}: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true)
        try{
            const userData = {
                name,
                email,
                phone
            }
            const user = await createUser(userData)
            
            if (user) {
                router.push(`/patients/${user.$id}/register`)
                setIsLoading(false)
            }
            
        }catch(error){
            console.log(error)
        }
        
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Olá 👋</h1>
                    <p className="text-dark-700">Agende sua primeira consulta.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Nome completo"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="jhondoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="DDD + Telefone"
                    placeholder="(DDD) 91234-5678"
                />
                <SubmitButton isLoading={isLoading}>Iniciar</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm