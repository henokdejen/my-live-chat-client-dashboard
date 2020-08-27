export const getTimeInMyTimeZone = (originalTime, originalOffset) => {
    let currentOffset = new Date().getTimezoneOffset()
    let offsetDifference = originalOffset - currentOffset
    console.log('here', currentOffset, originalTime, originalOffset, offsetDifference)

    let localTime = new Date(originalTime + (offsetDifference * 60000))
    console.log('fine', originalTime + (offsetDifference * 60000))
    return localTime
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export const getFormatedFullDate = (date) => {
    return `${monthNames[date.getMonth()].slice(0, 3)} ${date.getDay()}, ${date.getFullYear()}`
}

// export const getMessageObject = (messageFromServer) => {
//     return {
//         id: '',
//         conversationID: '',
//         createdAt: {
//             time: 'microseconds', // this should be in the server time zone
//             timeZone: 'offset'
//         },
//         sender: {
//             id: '',

//         },
//         text: '',
//         imageUrl: '',
//         imageAlt: '',
//         fileUrl: ''
//     }
// }

