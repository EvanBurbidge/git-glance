
export const getInstallationId = () => localStorage.getItem('git:glance:installationId');
export const setInstallationId = id => localStorage.setItem('git:glance:installationId', id);