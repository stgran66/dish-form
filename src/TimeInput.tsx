import { usePatternFormat, NumberFormatBase } from 'react-number-format';

export const TimeInput = (props: any) => {
  const { format, ...rest } = usePatternFormat({
    ...props,
    format: '##:##:##',
  });

  const _format = (val: any) => {
    const hh = val.substring(0, 2);
    let mm = val.substring(2, 4);
    let ss = val.substring(4, 6);

    if (mm.length === 1 && mm[0] > 6) {
      mm = `0${mm[0]}`;
    } else if (mm.length === 2) {
      // set the lower and upper boundary
      if (Number(mm) > 60) {
        mm = '60';
      }
    }

    if (ss.length === 1 && ss[0] > 6) {
      ss = `0${ss[0]}`;
    } else if (ss.length === 2) {
      // set the lower and upper boundary
      if (Number(ss) > 60) {
        ss = '60';
      }
    }

    return format(`${hh}${mm}${ss}`);
  };

  return <NumberFormatBase format={_format} {...rest} />;
};
