import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { backButtonAtom, IBackButton } from './BackButton.state'


function useBackButton(props: IBackButton) {
    
    const setBackButton = useSetAtom(backButtonAtom)
    
    useEffect(() => {
        setBackButton(props)
        
        return () => {
            setBackButton(null)
        }
    }, [])
    
}

export default useBackButton