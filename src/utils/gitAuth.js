import { GithubAuthProvider } from "firebase/auth";

const provider = new GithubAuthProvider();

provider.addScope('repo', 'user');

provider.setCustomParameters({
  'allow_signup': 'false'
});

export default provider;