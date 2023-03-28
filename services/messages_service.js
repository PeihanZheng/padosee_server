// import pool
const pool = require('../dao/padosee_dao');

// export queries
module.exports = {
    // insert message
    create: (data, callback) => {
        pool.query(`INSERT INTO messages SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // get all messages 
    getMessages: (callback) => {
        pool.query(`SELECT * FROM messages`, [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    }, 
    // get message by id
    getMessageById: (id, callback) => {
        pool.query(`SELECT * FROM messages WHERE message_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    // update message
    updateMessage: (data, callback) => {
        pool.query(`UPDATE messages SET ? WHERE message_id = ?`, [data, data.message_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    // delete message
    deleteMessage: (id, callback) => {
        pool.query(`DELETE FROM messages WHERE message_id = ?`, [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    }
}