import { FindOperator } from "typeorm"

interface IFindManyByIdOptions {
    onlyFinished?: boolean
    date?: FindOperator<Date>
}

export {
    IFindManyByIdOptions
}