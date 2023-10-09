import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRef } from "react";

// TODO: MOVE TO GLOBAL CONST
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props<T> = {
  values: T[];
  currentValue: T[];
  onChange: (event: SelectChangeEvent<any>) => void;
  name: string;
  label: string;
};

export default function SytledMultiselect<T extends string>({
  currentValue,
  values,
  onChange,
  name,
  label,
}: Props<T>) {
  const action: any = useRef(null);
  const baseRef: any = useRef(null);
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        ref={baseRef}
        labelId={name}
        multiple
        name={name}
        value={currentValue}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={currentValue.includes(value)} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
