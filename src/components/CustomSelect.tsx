import * as Select from "@radix-ui/react-select";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder = "Chọn...",
  className = "",
}: CustomSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={`w-full flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 hover:border-emerald-500/50 transition-colors outline-none data-[state=open]:border-emerald-500 ${className}`}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-slate-400">
          <IconChevronDown size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-slate-900 border border-slate-800 rounded-xl shadow-lg z-50 w-[var(--radix-select-trigger-width)]"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex items-center px-3 py-2 text-sm text-slate-100 rounded-lg outline-none cursor-pointer hover:bg-slate-800 data-[highlighted]:bg-slate-800 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-black"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <IconCheck size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
