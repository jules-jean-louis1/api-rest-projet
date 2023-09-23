const pool = require('./../../config/database');

module.exports = {
    createProjects: (data, callBack) => {
        pool.query(
            `INSERT INTO projects (name, description, github, website, images, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())`,
            [
                data.name,
                data.description,
                data.github,
                data.website,
                data.images,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                const id = results.insertId;
                const tagsData = data.tags ? data.tags.map(tag => [id, tag]) : [];
                if (tagsData.length > 0) {
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
                } else {
                    // Aucun tag à insérer, vous pouvez appeler le callback directement
                    return callBack(null, 'Projet créé avec succès.');
                }
            }
        );
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