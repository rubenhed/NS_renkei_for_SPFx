/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/file', 'N/log', 'N/query'], function(file, log, query)  {
  
  function onRequest(context) {
      const data = JSON.parse(context.request.body);
      var sql;

      var myCustomerQuery = query.create({
        type: query.Type.CUSTOMER
      });
      
      myCustomerQuery.condition = myCustomerQuery.createCondition({
          fieldId: 'defaultaddress',
          operator: query.Operator.START_WITH,
          values: '370-8522'
      });
      
      var mySQLCustomerQuery = myCustomerQuery.toSuiteQL();
      
      var results = mySQLCustomerQuery.run(); 
    
              
      //const results = query.runSuiteQL({ query: sql, params: data.params }).asMappedResults();		
      context.response.write(JSON.stringify(results));
  }

  return {
      onRequest: onRequest
  };
});
