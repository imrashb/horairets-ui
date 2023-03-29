// eslint-disable-next-line import/prefer-default-export
export const areArraysSame = (a, b) => (!a && !b) || (a?.length === b?.length
&& a?.every((v) => b?.includes(v)));
