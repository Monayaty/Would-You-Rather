// Format Date
export const formatDate = (timestamp) =>
{
    const myDate = new Date(timestamp)
    const time = myDate.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + myDate.toLocaleTimeString()
}

const generateUID = () => 
{
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const formatQuestion = ({
    optionOneText,
    optionTwoText,
    author
}) => 
{
    console.log(optionOneText, optionTwoText, author)
    return{
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne:{
            votes:[],
            text: optionOneText
        },
        optionTwo:{
            votes:[],
            text: optionTwoText
        }
    }
}