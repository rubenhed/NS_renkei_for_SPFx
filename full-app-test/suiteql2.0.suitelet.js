/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/file', 'N/log', 'N/query'], function(file, log, query)  {
  
  function onRequest(context) {
      const data = JSON.parse(context.request.body);
      var sql;

      switch ( data.type ) {
        case 'customer':
          sql = "SELECT * FROM entity WHERE entity.altname LIKE ?";
          break;
          
        case 'department':
          sql = "SELECT * FROM subsidiary WHERE subsidiary.name LIKE ?";
          break;
          
        case 'location':
          sql = "SELECT * FROM location WHERE location.name LIKE ?";
          break;
          
        case 'classification':
          sql = "SELECT * FROM classification WHERE classification.name LIKE ?";
          break;
          
        default:
          context.response.write(JSON.stringify({ error: 'Unsupported type' }));
          return;
      }

      //context.response.write(JSON.stringify(data.params));
      //return;
      const results = query.runSuiteQL({ query: sql, params: data.params }).asMappedResults();		
      context.response.write(JSON.stringify(results));
  }

  return {
      onRequest: onRequest
  };
});
