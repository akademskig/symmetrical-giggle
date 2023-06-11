const clientFormFields = [
  {
    label: 'Name*',
    id: 'name',
    required: true,
    defaultValue: '',
    type: 'text',
  },
  {
    label: 'Birth Date*',
    id: 'birthDate',
    required: true,
    defaultValue: '1990-06-15',
    type: 'date',
  },
  {
    label: 'City*',
    id: 'city',
    required: true,
    defaultValue: '',
    type: 'text',
  },
  {
    label: 'Vehicle Power*',
    id: 'vehiclePower',
    required: true,
    defaultValue: '',
    type: 'number',
  },
  {
    label: 'Voucher',
    id: 'voucher',
    required: false,
    defaultValue: 0,
    type: 'number',
  },
  {
    label: 'Price Match',
    id: 'priceMatch',
    required: false,
    defaultValue: 0,
    type: 'number',
  },
];

export default clientFormFields;
