/*global chrome*/

export const getInstallationId = () => chrome.storage.local.get('git:glance:installationId');
export const removeGitToken = id => chrome.storage.local.remove('git:glance:installationId');
export const setInstallationId = id => chrome.storage.local.set({'git:glance:installationId': id}, function () { console.log('set id')});