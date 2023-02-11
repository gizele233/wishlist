"use strict";
const validateBody = (request, response, next) => {
    const { body } = request;
    if (body.name === undefined) {
        response.status(400).json({ message: 'The field name is required' });
    }
    if (body.name === '') {
        response.status(400).json({ message: 'The field name cannot be empty' });
    }
    if (body.email_address == undefined) {
        response.status(400).json({ message: 'The field email_address is required' });
    }
    if (body.email_address == undefined) {
        response.status(400).json({ message: 'The field email_address cannot be empty' });
    }
    next();
};
module.exports = {
    validateBody,
};
