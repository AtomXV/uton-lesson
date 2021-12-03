const mysql = require('mysql2');

MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'uton',
    timezone: '+08:00',//时区设置
    dateStrings: true,//强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回. (默认: false)
}

const con = mysql.createConnection(MYSQL_CONF)
con.connect()

function exec(sql) {
    const promise = new Promise((resolve,reject)=>{
        con.query(sql, (err,result)=>{
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape,
    con
}