export const formatDataToString = (data: any): string => {
  return JSON.stringify(data, null, 2);
};

export const formatDataFromString = (dataString: string): any => {
  try {
    return JSON.parse(dataString);
  } catch (error) {
    console.error('Failed to parse data string:', error);
    return null;
  }
};

export const formatData = (input: any, toString: boolean = true): any => {
  if (toString) {
    return formatDataToString(input);
  } else {
    return formatDataFromString(input);
  }
};
