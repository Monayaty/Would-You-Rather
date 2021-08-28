const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('The Action: ', action)
    const nextState = next(action)
    console.log('The new State is : ', store.getState())
    console.groupEnd()
    return nextState;
}
export default logger;