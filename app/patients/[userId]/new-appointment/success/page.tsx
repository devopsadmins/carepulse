import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import * as Sentry from '@sentry/nextjs'
import { getUser } from '@/lib/actions/patient.actions'

const Success = async({params: { userId }, searchParams}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || ''
  const appointment = await getAppointment(appointmentId)
  const doctor =  Doctors.find((doc) => doc.name === appointment.primaryPhysician)
  const user = await getUser(userId)
  Sentry.metrics.set("user_view_appointment-success", user.name)
  
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
            <Link href="/">
                <Image
                    src="/assets/icons/logo-full.svg"
                    height={1000}
                    width={1000}
                    alt="logo"
                    className="mb-12 h-10 w-fit"
                    />
            </Link>
            <section className="flex flex-col items-center">
                <Image
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                    unoptimized
                />
                <h2 className="header mb-6 max-w-[600px] text-center">
                    Sua <span className="text-green-500">Solicitação de consulta</span> foi enviada com sucesso!
                </h2>
                <p>Retornaremos em breve com a confirmação.</p>
            </section>
            <section className="request-details">
                <p>Detalhes da consulta:</p>
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image!}
                        height={100}
                        width={100}
                        alt="doctor"
                        className="size-6"
                    />
                    <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                </div>
                <div className="flex gap-2">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                    />
                    <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
            </section>
            <Button variant="outline" className="shad-primary-btn" asChild>
                <Link href={`/patients/${userId}/new-appointment`}>Nova Consulta</Link>
            </Button>
            <p className="copyright py-12">© 2024 CarePulse</p>
        </div>
    </div>
  )
}

export default Success