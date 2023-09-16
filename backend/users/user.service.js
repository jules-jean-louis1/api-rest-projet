const pool = require('./../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users (login, email, password, site_right, created_at)
            VALUES (?, ?, ?, ?, NOW())`,
            [
                data.login,
                data.email,
                data.password,
                data.site_right,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            `SELECT id, login, email, site_right, created_at FROM users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET login = ?, email = ?,, password = ?, site_right = ? WHERE id = ?`,
            [
                data.login,
                data.email,
                data.password,
                data.site_right,
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
    deleteUser: (data, callBack) => {
        pool.query(
            `DELETE FROM users WHERE id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}