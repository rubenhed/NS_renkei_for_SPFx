/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/record', 'N/log'], function (record, log) {
  function onRequest(context) {
      try {
              var customerId = 24557;

              var customer = record.load({ type: record.Type.CUSTOMER, id: customerId });
              var fieldValues = {};
              var fields = customer.getFields();

              fields.forEach(function (field) {
                  fieldValues[field] = customer.getValue(field);
              });

              context.response.write({ output: JSON.stringify(fieldValues) });
      } catch (error) {
          log.error({ title: 'Error in Suitelet', details: error });
          context.response.write({
              output: JSON.stringify({ error: error.message })
          });
      }
  }

  return { onRequest: onRequest };
});
