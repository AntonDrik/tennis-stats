import { atom } from 'jotai'


const OPENED_SIDEBAR_WIDTH = 200
const CLOSED_SIDEBAR_WIDTH = 0

const sidebarAtom = atom({ isOpen: false, width: CLOSED_SIDEBAR_WIDTH })
const changeSidebarAtom = atom(
    null,
    (get, set) => {
        const isOpen = get(sidebarAtom).isOpen
        
        set(sidebarAtom, {
            isOpen: !isOpen,
            width: !isOpen ? OPENED_SIDEBAR_WIDTH : CLOSED_SIDEBAR_WIDTH
        })
    })

export {
    sidebarAtom,
    changeSidebarAtom
}