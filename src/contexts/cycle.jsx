import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CycleContext = createContext({
    cycles: [],
    activeCycleId: null,
    createNewCycle: () => {},
    markCurrentCycleAsFinished: () => {},
    interruptedCurrentCycle: () => {},
    activeCycle: undefined,
})

const CYCLES_KEY_LOCALSTORAGE = '@lab-timer365:cycles-1.0.0'
const ACTIVE_CYCLE_LOCALSTORAGE = '@lab-timer365:active-cycle-1.0.0'

export function CycleProvider({ children }) {
    const [cycles, setCycles] = useState(() => {
        const cyclesStorage = localStorage.getItem(CYCLES_KEY_LOCALSTORAGE)

        if(cyclesStorage) {
            return JSON.parse(cyclesStorage)
        }
        return []
    })
    const [activeCycleId, setActiveCycleId] = useState(() => {
        const activeCycleStorage = localStorage.getItem(ACTIVE_CYCLE_LOCALSTORAGE)

        return activeCycleStorage
    })

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
        setCycles((prevCycles) => {
            let newCycleState = [...prevCycles, newCycle]
            
            localStorage.setItem(CYCLES_KEY_LOCALSTORAGE, JSON.stringify(newCycleState))

            return newCycleState
        })
        setActiveCycleId(id)
        localStorage.setItem(ACTIVE_CYCLE_LOCALSTORAGE, id)
    }

    function markCurrentCycleAsFinished() {
        const newStateCycle = cycles.map(cycle => {
            if(cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    finishedDate: new Date()
                }
            }
            return cycle
        })
        /** Atualizando os estados */
        setCycles(newStateCycle)
        setActiveCycleId(null)

        /** Atualização do localStorage */
        localStorage.setItem(CYCLES_KEY_LOCALSTORAGE, JSON.stringify(newStateCycle))
        localStorage.removeItem(ACTIVE_CYCLE_LOCALSTORAGE)
    }

    function interruptedCurrentCycle() {
        const newStateCycle = cycles.map(cycle => {
            if(cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    interruptedDate: new Date()
                }
            }
            return cycle
        })
        /** Atualizando os estados */
        setCycles(newStateCycle)
        setActiveCycleId(null)

        /** Atualização do localStorage */
        localStorage.setItem(CYCLES_KEY_LOCALSTORAGE, JSON.stringify(newStateCycle))
        localStorage.removeItem(ACTIVE_CYCLE_LOCALSTORAGE)
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    return (
        <CycleContext.Provider 
            value={{ 
                cycles, 
                activeCycleId, 
                activeCycle, 
                createNewCycle, 
                markCurrentCycleAsFinished, 
                interruptedCurrentCycle 
            }}
        >
            {children}
        </CycleContext.Provider>
    )
}

CycleProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


export function useCycle() {
    const context = useContext(CycleContext)
    return context
}