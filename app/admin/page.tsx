import {DataTable} from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {columns} from '@/components/table/columns'

const Admin = async () => {
    
    const appointmens = await getRecentAppointmentList()
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
            <Link href="/" className='cursor-pointer'>
            <Image
                src="/assets/icons/logo-full.svg"
                height={32}
                width={162}
                alt="Logo"
                className="h-8 w-fit"
            />
            </Link>
            <p className="text-16-semibold">Dashboard Administrativo</p>
        </header>
        <main className='admin-main'>
            <section className="w-full space-y-4">
                <h1 className="header">Bem vindo 👋</h1>
                <p className="text-dark-700">Gerencie as novas solicitações de consulta</p>
            </section>
            <section className="admin-stat">
                <StatCard
                   type="appointments"
                   count={appointmens.scheduledCount}
                   label="Consultas agendadas"
                   icon="/assets/icons/appointments.svg"
                />
                <StatCard
                   type="pending"
                   count={appointmens.pendingCount}
                   label="Consultas pendententes"
                   icon="/assets/icons/pending.svg"
                />
                <StatCard
                   type="cancelled"
                   count={appointmens.cancelledCount}
                   label="Consultas canceladas"
                   icon="/assets/icons/cancelled.svg"
                />
            </section>
            <DataTable
                columns={columns}
                data={appointmens.documents}
            />
        </main>
    </div>
  )
}

export default Admin