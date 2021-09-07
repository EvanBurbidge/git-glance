import { GithubAuthProvider } from "firebase/auth";

const provider = new GithubAuthProvider();

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

export default provider;