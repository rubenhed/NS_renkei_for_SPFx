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
          value: item.itemId
        });

        estimateRecord.setCurrentSublistValue({
          sublistId: 'item',
          fieldId: 'quantity',
          value: item.quantity
        });

        estimateRecord.setCurrentSublistValue({
          sublistId: 'item',
          fieldId: 'rate',
          value: item.rate
        });

        estimateRecord.commitLine({ sublistId: 'item' });
      })

      return estimateRecord.save();
    }

    const fileUpload = (data, estimateId) => {
      data.name = `${estimateId}_${data.name}`;
      data.description = `File attached to Estimate(見積) with ID: ${estimateId}`;

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

      const estimateId = createEstimate(data.estimate);

      if (data.file.contents) {
        const fileId = fileUpload(data.file, estimateId);
        attachFile(fileId, estimateId);
      }

      scriptContext.response.write(JSON.stringify({ estimateId }));
    }

    return { onRequest }

  });
