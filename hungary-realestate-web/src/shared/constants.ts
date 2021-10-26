export const PropertyTypes: Record<string, string> = {
  1: 'flat',
  2: 'house',
  3: 'townhouse',
};

export const Message = {
  Success: {
    PropertyCreated: 'The property has been successfully published.',
  },
  Error: {
    Common: 'Sorry, an error occurred. Please try again later.',
    LoginFail: 'The username or password is incorrect.',
  },
};
