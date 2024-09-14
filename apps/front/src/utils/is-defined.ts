export default <V>(value: V): value is V =>
    value !== undefined && value !== null
