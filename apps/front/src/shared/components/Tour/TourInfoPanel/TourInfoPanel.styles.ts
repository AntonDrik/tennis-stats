import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import theme from '../../../../theme/theme'

const Wrapper = styled(Stack)({
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#F1F0EF",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    position: 'relative'
})

const ButtonWrapper = styled(Button)({
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40
})

export default {
    Wrapper,
    ButtonWrapper
}