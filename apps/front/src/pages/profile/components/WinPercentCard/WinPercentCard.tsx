import Stack from '@mui/material/Stack'
import { IProfile } from '@tennis-stats/types'
import { MiniCardStyles } from '../../../../shared/components'
import Styled from './WinPercentCard.styles'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'


function WinPercentCard({ prev, todayDiff }: IProfile['winPercent']) {

    const totalWinPercent = ((prev + todayDiff).toFixed(2)) + '%'

    const isPositive = todayDiff >= 0
    const diffValue = isPositive ? `+${todayDiff}%` : `${todayDiff}%`

    return (
        <MiniCardStyles.Wrapper>
            <Stack alignItems={'center'} mb={1}>
                <MiniCardStyles.Title>
                    Процент побед
                </MiniCardStyles.Title>

                <Styled.Subtitle isPositive={isPositive}>
                    За сегодня ({diffValue})
                </Styled.Subtitle>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={-0.5}>
                {
                    isPositive
                        ? <ArrowDropUpIcon sx={{ color: '#218358', ...Styled.IconStyles }}/>
                        : <ArrowDropDownIcon sx={{ color: '#CE2C31', ...Styled.IconStyles }}/>
                }
                <MiniCardStyles.ValueText>{totalWinPercent}</MiniCardStyles.ValueText>
            </Stack>
        </MiniCardStyles.Wrapper>
    )

}

export default WinPercentCard
