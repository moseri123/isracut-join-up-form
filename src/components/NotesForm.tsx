
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
    <div>
      <Label htmlFor="notes">הערות נוספות</Label>
      <Textarea
        id="notes"
        value={formData.notes}
        onChange={(e) => onInputChange('notes', e.target.value)}
        placeholder="ספרו לנו קצת על עצמכם, הניסיון שלכם, או כל דבר אחר שתרצו לשתף..."
        className="mt-1 min-h-[100px] resize-none"
      />
    </div>
  );
};

export default NotesForm;
