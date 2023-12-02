export const CreationUserIdentityServiceFail = (error: unknown) => ({
  code: 'UIF-001',
  message: 'Creation User Identity Service Fail',
  shortMessage: 'creationUserIdentityServiceFail',
  details: error,
})
