import { useForm, FormProvider } from 'react-hook-form'
import { Hand, Play } from 'lucide-react';
import { useCycle } from "../../contexts/cycle";

import { Button } from "../../components/button";
import { NewCycle } from "../../components/new-cycle";
import { Timer } from "../../components/timer";

import './home.css'

export function HomePage() {
    const methods = useForm({
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })
    const { createNewCycle, activeCycle, interruptedCurrentCycle } = useCycle()
    const { handleSubmit, reset, watch } = methods
  
    /** 
     * @param {Object} data Dados para criação de um novo ciclo
     * @param {String} data.task
     * @param {number} data.minutesAmount 
     */
    function onSubmit(data) {
        console.log('novo')
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <form className="container--home" onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <NewCycle />
            </FormProvider>
           
            <Timer />
            
            {
                activeCycle ? (
                    <Button type="button" variant='secondary' onClick={interruptedCurrentCycle}> 
                        <Hand size={24} /> Interromper
                    </Button>    
                ) : (
                    <Button type="submit" disabled={isSubmitDisabled}>
                        <Play size={24} /> Começar
                    </Button>    
                )
            }
        </form>
    )
}
