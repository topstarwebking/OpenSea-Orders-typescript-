import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function BasicDateTimePicker({ value, onValueChanged }: PropsType) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props: any) => <TextField {...props} />}
        value={value}
        onChange={(newValue: any) => {
          onValueChanged(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

interface PropsType {
  value: Date | null,
  onValueChanged: (value: Date) => void
}
