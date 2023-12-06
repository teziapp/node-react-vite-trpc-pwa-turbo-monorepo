
export const getUserLicense = (
  userCheckType: 'email' | 'mobile_number', 
  userCheckValue: string | number, 
  project_id: number
) => ({
  og_id: 1,
  subscription_end_date: '',
  subscription_status: ''
});