/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/record', 'N/log', 'N/https'], function (record, log, https) {
  function onRequest(context) {

    try {
      var data = JSON.parse(context.request.body);

      // Create a new estimate record
      var estimateRecord = record.create({
        type: record.Type.ESTIMATE,
        isDynamic: true
      });

      // Set values (replace with data from SPFx form)
      estimateRecord.setValue({
        fieldId: 'custbody_ga_customer_for_sales',
        value: data.customerId // Customer ID passed from the form
      });

      estimateRecord.setValue({
        fieldId: 'entity',
        value: data.customerId // Customer ID passed from the form
      });

      estimateRecord.setValue({
        fieldId: 'department',
        value: data.department // Customer ID passed from the form
      });

      estimateRecord.setValue({
        fieldId: 'location',
        value: data.location // Customer ID passed from the form
      });

      estimateRecord.setValue({
        fieldId: 'class',
        value: data.class // Customer ID passed from the form
      });

      estimateRecord.selectNewLine({ sublistId: 'item' });
      estimateRecord.setCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'item',
        value: data.itemId // Item ID passed from the form
      });
      estimateRecord.setCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'quantity',
        value: data.quantity // Quantity passed from the form
      });
      estimateRecord.setCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'rate',
        value: data.rate // Rate passed from the form
      });
      estimateRecord.commitLine({ sublistId: 'item' });

      // Save the estimate
      var estimateId = estimateRecord.save();
      log.debug('Estimate Created', 'Estimate ID: ' + estimateId);

      // Respond with success
      context.response.write('Estimate created successfully. Estimate ID: ' + estimateId);

      var fileid = 110897; //test file test2.pdf

      record.attach({
        record: {
          type: 'file',
          id: fileid
        },
        to: {
          type: record.Type.ESTIMATE,
          id: estimateId
        }
      });

    } catch (e) {
      context.response.write('Error creating estimate: ' + e.toString());
    }
  }

  return {
    onRequest: onRequest
  };
}); 