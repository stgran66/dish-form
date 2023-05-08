import { usePatternFormat, NumberFormatBase } from 'react-number-format';

export const TimeInput = (props: any) => {
  const { format, ...rest } = usePatternFormat({
    ...props,
    format: '##:##:##',
  });

  const _format = (val: any) => {
    let hh = val.substring(0, 2);
    let mm = val.substring(2, 4);
    let ss = val.substring(4, 6);

    // Check hours to be from 0 to 23
    if (hh.length === 1 && hh[0] > 2) {
      hh = `0${hh[0]}`;
    } else if (hh.length === 2 && Number(hh) > 23) {
      hh = '23';
    }

    // Check minutes to be from 0 to 59
    if (mm.length === 1 && mm[0] >= 6) {
      mm = `0${mm[0]}`;
    } else if (mm.length === 2 && Number(mm) > 59) {
      mm = '59';
    }

    // Check seconds to be from 0 to 59
    if (ss.length === 1 && ss[0] >= 6) {
      ss = `0${ss[0]}`;
    } else if (ss.length === 2 && Number(ss) > 59) {
      ss = '59';
    }
    // Return formatted time
    return format(`${hh}${mm}${ss}`);
  };

  return <NumberFormatBase format={_format} {...rest} value={props.value} />;
};
