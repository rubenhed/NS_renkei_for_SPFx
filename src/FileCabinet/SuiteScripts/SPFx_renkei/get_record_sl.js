/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

//https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2209&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQIi0jfOnlwySoM-3-NKYjDHPPqlkBBTjswP-P9ys2RBI
define(['N/record'],

  (record) => {
    const onRequest = (scriptContext) => {
      const data = JSON.parse(scriptContext.request.body);

      switch ( data.type ) {
        case 'customer':
          const customer = record.load({
            type: record.Type.CUSTOMER,
            id: data.id
          });
          const subsidiaryId = customer.getValue('subsidiary');
          
          const subsidiary = record.load({
            type: record.Type.SUBSIDIARY,
            id: subsidiaryId
          });

          const subsidiaryName = subsidiary.getValue('name');

          scriptContext.response.write(JSON.stringify({ subsidiaryId, subsidiaryName }));
          break;
          
        case 'classification':
          const classification = record.load({
            type: record.Type.CLASSIFICATION,
            id: data.id
          });

          const departmentId = classification.getValue('custrecord_ga_agy_division');

          const department = record.load({
            type: record.Type.DEPARTMENT,
            id: departmentId
          });

          const departmentName = department.getValue('name');

          scriptContext.response.write(JSON.stringify({ departmentId, departmentName }));
          break;
          
        default:
          scriptContext.response.write(JSON.stringify({ error: 'Unsupported type' }));
          return;
      }

      
    }

    return { onRequest }

  });
