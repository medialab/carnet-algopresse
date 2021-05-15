

import debounce from 'lodash/debounce';
import {useState, useEffect, useMemo} from 'react';

export default function DebouncedInput({
  value: propsValue,
  onChange: propsOnChange,
  ...rest
}) {
  const [value, setValue] = useState(propsValue);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const propagateChange = useMemo(() => debounce(propsOnChange, 300), [propsOnChange]);

  const handleChange = e => {
    setValue(e.target.value);
    propagateChange(e.target.value);
  }
  return (
    <input
      value={value}
      onChange={handleChange}
      {...rest}
    />
  )
}