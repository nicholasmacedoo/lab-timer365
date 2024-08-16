import './timer.css'

export function Timer() {
    return (
        <div className='container--timer'>
            {/* Minutos */}
            <span>0</span>
            <span>0</span>
            {/* Separador */}
            <div className='separator--timer'>:</div>
            {/* Segundos */}
            <span>0</span>
            <span>0</span>
        </div>
    )
}