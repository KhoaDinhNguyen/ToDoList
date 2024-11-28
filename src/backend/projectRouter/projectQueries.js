const pool = require('../database');

const createProject = (req, res, next) => {
    const accountName = req.params.user;
    const projectName = req.body.projectName;
    const projectDescription = req.body.projectDescription;
    
    pool.query(`CALL insert_project('${projectName}','${accountName}', CURRENT_DATE, '${projectDescription}');`, (err, result) => {
        if (err) {
            if (err.message === `duplicate key value violates unique constraint "projects_pkey"`) {
                res.status(400).json({message: "Project name duplicate", error: true});
            }
            else {
                res.status(400).json({message: err.message, error: true});
            }
        }
        else {
            res.status(200).json({message: 'Create project sucessfully', error: false});
        }
    });
};

const deleteProject = (req, res, next) => {
    const accountName = req.params.user;
    const { projectName } = req.query;
    
    pool.query(`CALL delete_project('${projectName}', '${accountName}');`, (err, result) => {
        if (err) {
            res.status(400).json({message: err.message, error: true});
        }
        else {
            res.status(200).json({message: 'Delete project sucessfully'});
        }
    })
};

module.exports = {
    createProject,
    deleteProject
};