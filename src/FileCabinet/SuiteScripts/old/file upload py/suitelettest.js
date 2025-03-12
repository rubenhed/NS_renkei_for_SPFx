/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/file', 'N/log'], function(file, log) {
    
    function onRequest(context) {
        var request = context.request;
        var response = context.response;
        
        // Parse the request parameters (assuming they come as query parameters or body data)
        var params = request.parameters;
        
        // Validate the request...
        if (typeof params.name === 'undefined') {
            response.write(JSON.stringify({ error: 'No name was specified.' }));
            return;
        }
        if (typeof params.fileType === 'undefined') {
            response.write(JSON.stringify({ error: 'No fileType was specified.' }));
            return;
        }
        if (typeof params.contents === 'undefined') {
            response.write(JSON.stringify({ error: 'No content was specified.' }));
            return;
        }
        if (typeof params.description === 'undefined') {
            response.write(JSON.stringify({ error: 'No description was specified.' }));
            return;
        }
        if (typeof params.encoding === 'undefined') {
            response.write(JSON.stringify({ error: 'No encoding was specified.' }));
            return;
        }
        if (typeof params.folderID === 'undefined') {
            response.write(JSON.stringify({ error: 'No folderID was specified.' }));
            return;
        }
        if (typeof params.isOnline === 'undefined') {
            response.write(JSON.stringify({ error: 'No isOnline was specified.' }));
            return;
        }
        
        // Proceed with creating the file
        try {
            var fileObj = file.create({
                name: params.name,
                fileType: params.fileType,
                contents: params.contents,
                description: params.description,
                encoding: params.encoding,
                folder: params.folderID,
                isOnline: params.isOnline
            });
            
            // Save the file and get its ID
            var fileID = fileObj.save();
            
            // Load the file to get full details
            fileObj = file.load({ id: fileID });
            
            // Create the response with file information and contents
            var responseObj = {
                info: fileObj,
                content: fileObj.getContents()
            };
            
            response.write(JSON.stringify(responseObj));
        } catch (e) {
            response.write(JSON.stringify({ error: e.message }));
        }
    }

    return {
        onRequest: onRequest
    };
});
