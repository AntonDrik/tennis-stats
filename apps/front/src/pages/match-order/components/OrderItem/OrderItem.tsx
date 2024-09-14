import Typography from '@mui/material/Typography'
import { IMatchOrder } from '@tennis-stats/types'

import Styled from './OrderItem.styles'


interface IProps {
    order: IMatchOrder
}

function OrderItem({ order }: IProps) {
    
    return (
        <Styled.Wrapper spacing={0.5}>
            <Typography>{order.user1.fullName}</Typography>
            <Typography>{order.user2.fullName}</Typography>
        </Styled.Wrapper>
    )
    
}

export default OrderItem