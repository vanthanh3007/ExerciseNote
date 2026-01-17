import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import CustomCalendar from "./CustomCalendar";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dateIso: string) => void;
}

export default function CreateSessionModal({
  isOpen,
  onClose,
  onSave,
}: CreateSessionModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(new Date());
    }
  }, [isOpen]);

  const handleSave = () => {
    if (selectedDate) {
      onSave(selectedDate.toISOString());
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Container: Centered on desktop, Bottom on Mobile */}
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <DialogPanel className="w-full sm:w-auto bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl transition-all overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-100">Thêm bài tập</h3>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <IconX size={20} />
            </button>
          </div>

          <div className="custom-datepicker-wrapper">
            <CustomCalendar
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              showTimeSelect
              inline
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="Pp"
            />
          </div>
          
          <button
            onClick={handleSave}
            className="w-full bg-emerald-600 text-black py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-6 shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all"
          >
            <IconCheck size={20} />
            <span>Xác nhận</span>
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
