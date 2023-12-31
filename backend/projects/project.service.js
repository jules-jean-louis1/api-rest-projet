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

        const params = [];

        if (tags !== 'All') {
            sql += ` INNER JOIN project_tags ON projects.id = project_tags.project_id
                INNER JOIN tags ON project_tags.tag_id = tags.id
                WHERE tags.name = ${tags}`;
            params.push(tags);
        }

        if (name) {
            sql += ` WHERE projects.name LIKE '%${name}%'`;
            params.push(name);
        }

        sql += ` ORDER BY projects.created_at ${date}`;
        params.push(date);

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
            `SELECT * FROM projects WHERE id = ?`,
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
            `UPDATE projects SET name = ?, description = ?, des = ? WHERE id = ?`,
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
    getProjects: (callBack) => {
        pool.query(
            `SELECT * FROM projects`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProjects: (id, projectData, callBack) => {
        pool.query(
            `UPDATE projects SET name=?, description=?, github=?, website=?, images=?, updated_at=? WHERE id=?`,
            [
            projectData.name,
            projectData.description,
            projectData.github,
            projectData.website,
            projectData.images,
            new Date(),
            id
            ],
            (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    },
}