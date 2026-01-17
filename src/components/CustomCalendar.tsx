import React, { ComponentProps } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale/vi";

// Create a custom locale based on 'vi' but with short day names
const customVi = {
  ...vi,
  localize: {
    ...vi.localize,
    day: (n: number) => {
      // 0 = Sunday (CN), 1 = Monday (2), ... 6 = Saturday (7)
      if (n === 0) return "CN";
      return `${n + 1}`;
    },
  },
};

// Register under a specific name
registerLocale("vi-custom", customVi as any);

type CustomCalendarProps = ComponentProps<typeof DatePicker>;

export default function CustomCalendar(props: CustomCalendarProps) {
  return (
    <div className="custom-calendar-root">
      <DatePicker
        locale="vi-custom"
        calendarStartDay={1} // Monday start
        {...props}
      />
    </div>
  );
}
