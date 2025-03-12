/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

//https://6317455-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2208&deploy=1&compid=6317455_SB1&ns-at=AAEJ7tMQxyimjYBRdu6XxAFpMBY3EaxiZu7EsRPgy3PrV1IhXsU
define(['N/record', 'N/file'],
  (record, file) => {

    const createEstimate = (data) => {
      const estimateRecord = record.create({
        type: record.Type.ESTIMATE,
        isDynamic: true
      });

      estimateRecord.setValue({
        fieldId: 'custbody_ga_customer_for_sales',
        value: data.customerId
      });

      estimateRecord.setValue({
        fieldId: 'entity',
        value: data.customerId
      });

      estimateRecord.setValue({
        fieldId: 'department',
        value: data.departmentId
      });

      estimateRecord.setValue({
        fieldId: 'class',
        value: data.classificationId
      });

      estimateRecord.setValue({
        fieldId: 'location',
        value: data.locationId
      });

      data.items.forEach(item => {
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
      })

      return estimateRecord.save();
    }

    const fileUpload = (data) => {
      const fileObj = file.create({
        name: data.name,
        fileType: data.fileType,
        contents: data.contents,
        description: data.description,
        encoding: data.encoding,
        folder: data.folderID,
        isOnline: data.isOnline
      });

      return fileObj.save();
    }

    const attachFile = (fileId, estimateId) => {
      record.attach({
        record: {
          type: 'file',
          id: fileId
        },
        to: {
          type: record.Type.ESTIMATE,
          id: estimateId
        }
      });
    }

    const onRequest = (scriptContext) => {
      const data = JSON.parse(scriptContext.request.body);

      const estimateId = createEstimate(data.estimate);

      if (data.file.contents) {
        const fileId = fileUpload(data.file);
        attachFile(fileId, estimateId);
      }

      scriptContext.response.write(JSON.stringify({ estimateId }));
    }

    return { onRequest }

  });
