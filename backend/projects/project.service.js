const pool = require('./../../config/database');

module.exports = {
    createProjects: (data, callBack) => {
        pool.query(
            `INSERT INTO projects (name, description, github, link, preview, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                data.name,
                data.description,
                data.github,
                data.link,
                data.preview,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                const id = results.insertId;
                const tagsData = data.tags.map(tag => [id, tag]);

                pool.query(
                    `INSERT INTO project_tags (project_id, tag_id) VALUES ?`,
                    [tagsData],
                    (tagsError, tagsResults) => {
                        if (tagsError) {
                            return callBack(tagsError);
                        }
                        return callBack(null, 'Projet créé avec succès.');
                    }
                );
            }
        );
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