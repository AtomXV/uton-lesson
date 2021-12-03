const {exec} = require ('./mysql')

const saveData = (devideId,dataInChain,txHash,deviceTime) => {
    console.log(devideId)
    console.log(dataInChain)
    console.log(txHash)
    console.log(deviceTime)

    const insertSql = `insert into sensorData (device_id,data,tx_hash,device_time) values` + `('${devideId}','${dataInChain}','${txHash}','${deviceTime}')`
    console.log("----sql语句为：",insertSql)
    return exec(insertSql).then(insertData =>{
        console.log('----insertData为：', insertData)
        if (!insertData.insertId){
            return null
        }
        return {
            id : insertData.insertId
        }
    }).then(dataId => {
        return getDBtime(dataId.id)
    }).then(dbTime =>{
        return dbTime
    })
}

const getDBtime = (id) => {
    let sql = `select db_time from sensorData where id=${id}`
    return exec(sql).then(dbTime =>{
        if (dbTime ===0){
            console.log("err")
        }
        return dbTime
    })
}

module.exports = {
    saveData
}