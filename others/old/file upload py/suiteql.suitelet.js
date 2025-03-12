/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/file', 'N/log', 'N/query'], function(file, log, query) {
    
  function onRequest(context) {
      var data = JSON.parse(context.request.body);

      //context.response.write(JSON.stringify(data.params));
      //return;
      var results = query.runSuiteQL({ query: data.sql, params: data.params }).asMappedResults();		
      context.response.write(JSON.stringify(results));
  }

  return {
      onRequest: onRequest
  };
});
