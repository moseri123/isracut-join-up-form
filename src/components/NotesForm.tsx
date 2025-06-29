
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesFormProps {
  formData: {
    notes: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const NotesForm: React.FC<NotesFormProps> = ({ formData, onInputChange }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-all duration-200">
      <Label htmlFor="notes" className="text-lg font-semibold text-gray-900">הערות נוספות</Label>
      <Textarea
        id="notes"
        value={formData.notes}
        onChange={(e) => onInputChange('notes', e.target.value)}
        placeholder="ספרו לנו קצת על עצמכם, הניסיון שלכם, או כל שאלה או בקשה..."
        className="mt-2 min-h-[100px] resize-none border-green-300 focus:border-green-500 focus:ring-green-500 hover:border-green-400 transition-all duration-200"
      />
    </div>
  );
};

export default NotesForm;
