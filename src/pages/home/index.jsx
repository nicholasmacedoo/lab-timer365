import { useState } from "react";
import { Button } from "../../components/button";
import { NewCycle } from "../../components/new-cycle";
import { Timer } from "../../components/timer";
import { useForm, FormProvider } from 'react-hook-form'

import './home.css'

export function HomePage() {
    const methods = useForm()
    const { handleSubmit } = methods
    const [cycles, setCycles] = useState([])
    const [activeCycleId, setActiveCycleId] = useState(null)

    /** 
     * @param {Object} data Dados para criação de um novo ciclo
     * @param {String} data.task
     * @param {number} data.minutesAmount 
     */
    function createNewCycle({ task, minutesAmount }) {
        // id : string
        // task: string
        // minutesAmount: number
        // startDate: Date
        // interruptedDate?: Date | undefined
        // finishedDate?: Date | undefined
        const id = String(new Date().getTime())

        const newCycle = {
            id,
            task,
            minutesAmount,
            startDate: new Date()
        }

        // setCycles([...cycles, newCycle])
        setCycles((prevCycles) => [...prevCycles, newCycle])
        setActiveCycleId(id)
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)


    return (
        <form className="container--home" onSubmit={handleSubmit(createNewCycle)}>
            <FormProvider {...methods}>
                <NewCycle />
            </FormProvider>
           
            <Timer activeCycle={activeCycle} />

            <Button>Começar</Button>    
        </form>
    )
}
