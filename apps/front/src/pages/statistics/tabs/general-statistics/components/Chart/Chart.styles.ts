import {ResponsiveContainer as RechartsContainer} from 'recharts'
import styled from 'styled-components'
import theme from '../../../../../../theme/theme'


const ResponsiveContainer = styled(RechartsContainer)({
    backgroundColor: '#F9F9F9',
    padding: '10px',
    paddingBottom: '10px',
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
})

export default {
    ResponsiveContainer
}