const pool = require('./../../config/database');

module.exports = {
    createTags: (data, callBack) => {
        pool.query(
            `INSERT INTO tags (name) VALUES (?)`,
            [
                data.name,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteTags: (id, callBack) => {
        pool.query(
            `DELETE FROM tags WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    updateTags: (data, callBack) => {
        pool.query(
            `UPDATE tags SET name = ? WHERE id = ?`,
            [
                data.name,
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
    getTags: callBack => {
        pool.query(
            `SELECT id, name FROM tags`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
}