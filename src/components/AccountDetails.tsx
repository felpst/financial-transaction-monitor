import { useAccountStore } from '../store/accountStore';

function AccountDetails() {
  const { accounts, selectedAccountId } = useAccountStore();
  const selectedAccount = accounts.find(acc => acc.accountId === selectedAccountId);

  if (!selectedAccount) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Account Details</h2>
        <p className="text-gray-500 italic">Select an account to view details</p>
      </div>
    );
  }

  const details = [
    { label: 'Account Name', value: selectedAccount.accountName },
    { label: 'Account ID', value: selectedAccount.accountId, mono: true },
    { label: 'Currency', value: selectedAccount.currency },
    { label: 'Country', value: selectedAccount.country },
    { label: 'Address', value: selectedAccount.address, fullWidth: true },
    { label: 'Phone', value: selectedAccount.phoneNumber },
    { label: 'Email', value: selectedAccount.email },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Account Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {details.map(({ label, value, mono, fullWidth }) => (
          <div key={label} className={fullWidth ? 'col-span-full' : undefined}>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className={`mt-1 text-sm text-gray-900 ${mono ? 'font-mono' : ''}`}>
              {value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountDetails; 