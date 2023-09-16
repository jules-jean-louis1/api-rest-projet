const pool = require('./../../config/database');

module.exports = {
    createProjects: (data, callBack) => {
        pool.query(
            `INSERT INTO projects (name, short_des, des, created_at)
            VALUES (?, ?, ?, NOW())`,
            [
                data.name,
                data.short_des,
                data.des,
                data.description,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getProjects: callBack => {
        pool.query(
            `SELECT id, name, short_des, des, created_at FROM projects`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getProjectsById: (id, callBack) => {
        pool.query(
            `SELECT id, name, short_des, des, created_at FROM projects WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateProjects: (data, callBack) => {
        pool.query(
            `UPDATE projects SET name = ?, short_des = ?, des = ? WHERE id = ?`,
            [
                data.name,
                data.short_des,
                data.des,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
}