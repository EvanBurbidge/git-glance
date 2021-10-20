import { OAuthProvider } from "firebase/auth";

export const getProviderInstance = (providerName = '') => {

  const provider = new OAuthProvider(providerName);

  provider.addScope('repo');
  provider.addScope('public_repo');
  provider.addScope('user');
  provider.addScope('repo:status');
  provider.addScope('repo_deployment');
  provider.addScope('read:repo_hook');
  provider.addScope('read:org');
  provider.addScope('read:public_key');
  provider.addScope('read:gpg_key');

  provider.setCustomParameters({
    'allow_signup': 'false'
  });
  
  return provider;

}
