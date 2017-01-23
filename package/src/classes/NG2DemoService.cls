global with sharing class NG2DemoService implements ng2.GatewayInterface {

	global static Map<String, Object> exec(String method, Object payload) {
		Map<String, Object> outData = new Map<String, Object>();

		if (method == 'getAccounts') {
			List<Account> accounts = [SELECT Id, Name FROM Account ORDER BY CreatedDate DESC LIMIT 10000];
			outData.put('accounts', accounts);

		} else {
			outData.put('error', 'Method "'+method+'" not found.');
		}

		return outData;

	}

}