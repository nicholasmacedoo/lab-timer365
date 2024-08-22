import { useFormContext } from 'react-hook-form'
import './new-cycle.css'


export function NewCycle() {
    const { register, formState } = useFormContext()
    // props drilling
    /** 
     * {
     *  task: value,
     *  minutesAmount: value
     * }
     */
    // formState.errors.task
    return (
        <div className='container--new-cycle'>
            <label htmlFor="task">Vou trabalhar em</label>
            <div className='container--input-form'>
                <input 
                    list='list-ideas'
                    type="text" 
                    id="task" 
                    placeholder='Criar timer365...' 
                    {...register('task', 
                        { 
                            required: {
                                value: true,
                                message: "Este campo é obrigatório",
                            },
                        }
                    )} 
                />
                {formState.errors.task && (
                    <p className='text-error'>
                        {formState.errors.task.message}
                    </p>
                )}
            </div>

            <datalist id="list-ideas">
                <option value="Projeto lab365" />
                <option value="Mini projeto" />
                <option value="Exercicios da semana" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <input type="number" id="minutesAmount" {...register('minutesAmount', { valueAsNumber: true })} />

            <span>minutos.</span>
        </div>
    )
}