/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

//https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2221&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQ6k-43w5fPa8Ma7R5AiZWPhJeDkH4prVl5snti3f6HUk
define(['N/query'], 
  (query) => {
  
    const customer = (searchWord) => {
      //"SELECT * FROM customer WHERE altname LIKE ?"

      const myQuery = query.create({
        type: query.Type.CUSTOMER_SUBSIDIARY_RELATIONSHIP
      });

      const myEntityJoin = myQuery.autoJoin({
        fieldId: "entity"
      });

      const condition = myQuery.createCondition({
        fieldId: 'name',
        operator: query.Operator.CONTAIN,
        caseSensitive: true,
        values: searchWord
      });

      myQuery.condition = myQuery.and(
        condition
      );

      myQuery.columns = [
        myQuery.createColumn({
          fieldId: 'subsidiary' 
        }),
        myQuery.createColumn({
          fieldId: 'name' 
        }),
        myEntityJoin.createColumn({
          fieldId: 'id' 
        }),
      ];

      return myQuery
    }

    const onRequest = (scriptContext) => {

      scriptContext.response.addHeader({
        name: 'Access-Control-Allow-Origin',
        value: '*' //https://gadelius.sharepoint.com
      });
      scriptContext.response.addHeader({
          name: 'Access-Control-Allow-Headers',
          value: 'Content-Type'
      });
      if (scriptContext.request.method === 'OPTIONS') {
          scriptContext.response.write("ok");
          return;
      }

      const data = JSON.parse(scriptContext.request.body);
      let myQuery;

      switch ( data.type ) {
        case 'customer':
          myQuery = customer(data.params)
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
      const results = myQuery.run().asMappedResults();		
      scriptContext.response.write(JSON.stringify(results));
    }

  return { onRequest };
});
