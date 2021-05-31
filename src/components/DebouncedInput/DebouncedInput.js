

import debounce from 'lodash/debounce';
import {useState, useEffect, useMemo} from 'react';
import Textarea from 'react-textarea-autosize';

export default function DebouncedInput({
  value: propsValue,
  onChange: propsOnChange,
  type = 'input',
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
  if (type === 'input') {
    return (
      <input
        value={value}
        onChange={handleChange}
        {...rest}
      />
    );
  }
  return (
    <Textarea
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
}