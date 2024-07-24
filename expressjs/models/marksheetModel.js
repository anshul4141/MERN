const Marksheet = require('../models/marksheetModel');

const addMarksheet = (marksheetData) => {
    const newMarksheet = new Marksheet(marksheetData);
    return newMarksheet.save()
        .then(savedMarksheet => ({ marksheet: savedMarksheet, message: 'Data added successfully' }))
        .catch(error => { throw new Error(error.message); });
};

const updateMarksheet = (marksheetId, updateData) => {
    return Marksheet.findByIdAndUpdate(marksheetId, updateData, { new: true })
        .then(updatedMarksheet => {
            if (!updatedMarksheet) throw new Error('Marksheet not found');
            return updatedMarksheet;
        })
        .catch(error => { throw new Error(error.message); });
};

const deleteMarksheet = (marksheetId) => {
    return Marksheet.findByIdAndDelete(marksheetId)
        .then(deletedMarksheet => {
            if (!deletedMarksheet) throw new Error('Marksheet not found');
            return { message: 'Marksheet deleted successfully' };
        })
        .catch(error => { throw new Error(error.message); });
};

const getMarksheetById = (marksheetId) => {
    return Marksheet.findById(marksheetId)
        .then(marksheet => {
            if (!marksheet) throw new Error('Marksheet not found');
            return marksheet;
        })
        .catch(error => { throw new Error(error.message); });
};

const getMeritList = () => {
    return Marksheet.find()
        .then(marksheets => {
            if (!marksheets || marksheets.length === 0) throw new Error('No marksheets found');
            // Calculate total marks and sort in descending order
            marksheets.forEach(marksheet => {
                marksheet.totalMarks = marksheet.physics + marksheet.chemistry + marksheet.maths;
            });
            marksheets.sort((a, b) => b.totalMarks - a.totalMarks);
            return marksheets;
        })
        .catch(error => { throw new Error(error.message); });
};

const searchMarksheets = (query) => {
    return Marksheet.find(query)
        .then(marksheets => marksheets)
        .catch(error => { throw new Error(error.message); });
};

module.exports = {
    addMarksheet,
    updateMarksheet,
    deleteMarksheet,
    getMarksheetById,
    getMeritList,
    searchMarksheets
};
