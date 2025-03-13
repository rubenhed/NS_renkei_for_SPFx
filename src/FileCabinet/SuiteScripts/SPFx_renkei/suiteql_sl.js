/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */

//https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2210&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQVhNErAxA2RTx8ktjnsORgOoqu5T5GDRS7u-hhQFJ130
define(['N/query'], function(query)  {
  
  function onRequest(scriptContext) {
      const data = JSON.parse(scriptContext.request.body);
      var sql;

      switch ( data.type ) {
        case 'customer':
          sql = "SELECT * FROM customer WHERE altname LIKE ?"
          break;
          
        case 'department':
          sql = "SELECT * FROM department WHERE name LIKE ?";
          break;
          
        case 'location':
          sql = "SELECT * FROM location WHERE name LIKE ?";
          break;
          
        case 'classification':
          sql = "SELECT * FROM classification WHERE name LIKE ?";
          break;
        
        case 'item':
          sql = "SELECT id, displayname, subsidiary FROM item WHERE displayname LIKE ?";
          break;
          
        default:
          scriptContext.response.write(JSON.stringify({ error: 'Unsupported type' }));
          return;
      }

      //scriptContext.response.write(JSON.stringify(data.params));
      //return;
      const results = query.runSuiteQL({ query: sql, params: data.params }).asMappedResults();		
      scriptContext.response.write(JSON.stringify(results));
  }

  return {
      onRequest: onRequest
  };
});
