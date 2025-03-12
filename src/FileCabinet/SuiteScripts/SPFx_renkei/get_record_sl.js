/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

//https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2209&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQIi0jfOnlwySoM-3-NKYjDHPPqlkBBTjswP-P9ys2RBI
define(['N/record'],

  (record) => {
    const onRequest = (scriptContext) => {
      const data = JSON.parse(scriptContext.request.body);
      let result;

      switch ( data.type ) {
        case 'customer':
          sql = "SELECT * FROM customer WHERE altname LIKE ?";
          const customer = record.load({
            type: record.Type.CUSTOMER,
            id: data.id
          });
          result = customer.getValue('subsidiary');
          break;
          
        case 'classification':
          const classification = record.load({
            type: record.Type.CLASSIFICATION,
            id: data.id
          });
          result = classification.getValue('custrecord_ga_agy_division');
          break;
          
        default:
          scriptContext.response.write(JSON.stringify({ error: 'Unsupported type' }));
          return;
      }

      scriptContext.response.write(JSON.stringify({ result }));
    }

    return { onRequest }

  });
