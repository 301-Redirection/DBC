/**
 *  This class defines an the action that are required by the default page
 *  of the application, with events such as logging, logging out etc.
 */

const fs = require('fs');
const path = require('path');
const mime = require('mime');

class IndexController {
    static getHomePage(request, response) {
        if (request.user) {
            response.redirect('/user');
            return;
        }
        response.render('index', { title: 'Backend testing of auth0' });
    }

    static logout(request, response) {
        request.logout();
        response.redirect('/');
    }

    static failure(request, response) {
        const error = request.flash('error');
        const errorDescription = request.flash('error_description');
        request.logout();
        response.render('failure', {
            error: error[0],
            errorDescription: errorDescription[0],
        });
    }

    static test(request, response) {
        response.status(500).send({ message: 'This is an error response' });
    }

    static download(request, response) {
        const file = `${__dirname}/../Lua/${request.params.id}.zip`;
        const filename = path.basename(file);
        const mimetype = mime.lookup(file);
        response.setHeader('Content-disposition', `attachment; filename=${filename}`);
        response.setHeader('Content-type', mimetype);
        const filestream = fs.createReadStream(file);
        filestream.pipe(response);
        response.download(file);
    }

    static testAuthentication(request, response) {
        response.status(500).send({ message: 'you have been sucessfully authenticated' });
    }
}
module.exports.IndexController = IndexController;
