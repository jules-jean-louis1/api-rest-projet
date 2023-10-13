const pool = require('./../../config/database');

module.exports = {
    createProjects: (data, callBack) => {
        const { name, description, github, website, tags } = data;
        // Extraire le nom du fichier image de l'objet
        const images = data.images.filename;

        pool.query(
            `INSERT INTO projects (name, description, github, website, images, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())`,
            [
                name,
                description,
                github,
                website,
                images, // Insérer le nom du fichier image
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                const id = results.insertId;
                const tagsData = tags ? tags.map(tag => [id, tag]) : [];
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
    getAllProjects: (tags, name, date, callBack) => {
        let sql = `SELECT projects.* FROM projects`;
        let sqlTags = `SELECT tags.* FROM tags`;

        const params = [];

        if (tags !== 'All') {
            sql += ` INNER JOIN projects_tags ON projects.id = projects_tags.project_id
                INNER JOIN tags ON projects_tags.tags_id = tags.id
                WHERE tags.name = ${tags}`;
            params.push(tags);
        }

        if (name) {
            sql += ` AND projects.name LIKE ?`;
            params.push(`%${name}%`);
        }
        if (date !== 'DESC') {
            sql += ` ORDER BY projects.created_at ${date}`;
            params.push(date);
        }        
        pool.query(
            sql,
            params,
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