import './new-cycle.css'

export function NewCycle() {
    return (
        <div className='container--new-cycle'>
            <label htmlFor="task">Vou trabalhar em</label>
            <input type="text" id="task" placeholder='Criar timer365...' />

            <label htmlFor="minutesAmount">durante</label>
            <input type="number" id="minutesAmount"/>

            <span>minutos.</span>
        </div>
    )
}