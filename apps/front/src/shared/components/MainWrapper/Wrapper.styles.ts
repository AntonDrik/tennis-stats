import styled from 'styled-components'


interface IContentProps {
    $sidebarWidth: number
}

const Content = styled.main<IContentProps>(
    {
        padding: 18,
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
        transition: '.3s'
    },
    ({$sidebarWidth}) => ({
        width: `calc(100% - ${$sidebarWidth}px)`,
        marginLeft: $sidebarWidth,
    })
)

export default {
    Content
}