// import dao
const pool = require("../dao/padosee_dao.js");

// export queries
module.exports = {
  // create new connection
  create: (data, callback) => {
    pool.query(
      `INSERT INTO connections SET ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
  // create new connection
  createMultiple: (data, callback) => {
    pool.query(
      `INSERT INTO connections(request_id,camera_id) VALUES ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
  // get all connections
  getConnections: (callback) => {
    pool.query(`SELECT * FROM connections`, (error, results, fields) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, results);
      }
    });
  },
  // get connection by id
  getConnectionById: (id, callback) => {
    pool.query(
      `SELECT * FROM connections WHERE connect_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },
  // get connections by camera id
  getConnectionsByCameraId: (id, callback) => {
    pool.query(
      `SELECT * FROM connections WHERE camera_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
  // update connection
  updateConnection: (data, callback) => {
    pool.query(
      `UPDATE connections SET ? WHERE connect_id = ?`,
      [data, data.connect_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
  // delete connection
  deleteConnection: (id, callback) => {
    pool.query(
      `DELETE FROM connections WHERE connect_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },
  // get connection by id
  getConnectionByRequestId: (id, callback) => {
    pool.query(
      `SELECT * FROM connections WHERE request_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },
  // get connection by id
  getCameraWithAssignStatus: (body, callback) => {
    const request_id = body.request_id;
    const user_id = body.user_id;
    pool.query(
      `SELECT DISTINCT *, CASE WHEN conn.connect_id IS NULL THEN FALSE ELSE TRUE END AS is_assigned FROM camera_list cam_table LEFT JOIN (select * from connections where request_id = ?) as conn ON cam_table.cam_id=conn.camera_id  WHERE cam_table.user_id = ? ORDER BY cam_table.cam_id ASC`,
      [request_id, user_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },
};
