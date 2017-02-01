global with sharing class NG2DemoService implements ng2.GatewayInterface {

	global static Map<String, Object> exec(String method, Object payload) {
		Map<String, Object> outData = new Map<String, Object>();
		Map<String, Object> inData = (Map<String, Object>)payload;
		try {
			if (method == 'getObjectsMetadata') {
				List<String> objectTypes = (List<String>)JSON.deserialize(
							JSON.serialize(inData.get('objectTypes')),
							List<String>.class);
				Map<String, MetadataDTO> metaList = new Map<String, MetadataDTO>();
				for (String ot : objectTypes) {
					metaList.put(ot, new MetadataDTO(ot));
				}
				outData.put('meta', metaList);
			} else if (method == 'getAccounts') {
				List<Account> accounts = [SELECT Id, Name, CreatedDate FROM Account ORDER BY CreatedDate DESC LIMIT 10000];
				outData.put('accounts', accounts);

			} else {
				outData.put('error', 'Method "'+method+'" not found.');
			}
		} catch(Exception e) {
			outData.put('error', e.getMessage());
			outData.put('stack', e.getStackTraceString());
		}

		return outData;

	}

	public static Map<String, Schema.DescribeFieldResult> getFieldMetadata(String objectType) {
		Schema.DescribeSObjectResult dsr = Schema.getGlobalDescribe().get(objectType).getDescribe();
		Map<String,Schema.DescribeFieldResult> finalMap = new Map<String, Schema.DescribeFieldResult>();
		Map<String, Schema.SObjectField> objectFields = dsr.fields.getMap();
		for(String field : objectFields.keySet()){
			Schema.DescribeFieldResult dr = objectFields.get(field).getDescribe();
			finalMap.put(field, dr);
		}
		return finalMap;
	}

	public class MetadataDTO {
		CustomObjectDescription objectDescription;
		//List<RecordType> recordTypes;
		Map<String, Schema.DescribeFieldResult> fields;
		MetadataDTO(String objectType) {
			objectDescription = new CustomObjectDescription(objectType);
			fields = getFieldMetadata(objectType);
		}
	}

	public class CustomObjectDescription {
		String name;
		String label;
		String labelPlural;
		String prefix;
		List<Schema.RecordTypeInfo> recordTypes;
		Boolean isAccessible;
		Boolean isCreateable;
		Boolean isCustom;
		Boolean isCustomSetting;
		Boolean isDeletable;
		Boolean isQueryable;
		Boolean isSearchable;
		Boolean isUpdateable;
		CustomObjectDescription(String objectType) {
			Schema.DescribeSObjectResult dsr = Schema.getGlobalDescribe().get(objectType).getDescribe();
			name = dsr.getName();
			label = dsr.getLabel();
			labelPlural = dsr.getLabelPlural();
			prefix = dsr.getKeyPrefix();
			recordTypes = dsr.getRecordTypeInfos();
			isAccessible = dsr.isAccessible();
			isCreateable = dsr.isCreateable();
			isCustom = dsr.isCustom();
			isCustomSetting = dsr.isCustomSetting();
			isDeletable = dsr.isDeletable();
			isQueryable = dsr.isQueryable();
			isSearchable = dsr.isSearchable();
			isUpdateable = dsr.isUpdateable();
		}
	}

}