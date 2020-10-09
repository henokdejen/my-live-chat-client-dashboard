export const parseReportDataToGraph = (reportFromServer) => {

    console.log('fine', reportFromServer.length, reportFromServer[0].entryInfo.dayShort)

    if (reportFromServer.length && reportFromServer[0].entryInfo.dayShort) {
        let formatedReport = reportFromServer.map(report => {
            let rep = {name: `${report.entryInfo.monthShort} ${report.entryInfo.date}`}

            if ('conversations' in report) rep.conversations = report.conversations
            if ('visitors' in report) rep.visitors = report.visitors
            if ('tickets' in report ) rep.tickets = report.tickets

            return rep
        })
        return formatedReport
    }
}