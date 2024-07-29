
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from '@sentry/nextjs'
import AppointmentForm from "@/components/forms/AppointmentForm";

const NewAppointment = async({params: { userId }}: SearchParamProps) => {
    const patient = await getPatient(userId)
    Sentry.metrics.set("user_view_new-appointment", patient.name)

    return (
    <div className="flex h-screen max-h-screen">
        <section className="scrollbar-hide container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
            <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            />
            <AppointmentForm
                type="create"
                userId={userId}
                patientId={patient.$id}
            />
            <p className="copyright py-12 mt-10">© 2024 CarePulse</p>
        </div>
        </section>
        <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        />
    </div>
    )
}

export default NewAppointment
