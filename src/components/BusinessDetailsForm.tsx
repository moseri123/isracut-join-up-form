
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2 } from "lucide-react";

interface BusinessDetailsFormProps {
  formData: {
    businessName: string;
    specialization: string[];
  };
  onInputChange: (field: string, value: string) => void;
  onCheckboxChange: (option: string, checked: boolean, field: string) => void;
}

const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({ 
  formData, 
  onInputChange, 
  onCheckboxChange 
}) => {
  const specializations = [
    'מספרה ועיצוב שיער גברים',
    'מספרה ועיצוב שיער נשים',
    'מספרה ועיצוב שיער ילדים'
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Building2 className="w-5 h-5 ml-2" />
        פרטי עסק
      </h3>
      <div>
        <Label htmlFor="businessName">שם העסק *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => onInputChange('businessName', e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label>התמחות במספרה * (ניתן לבחור מספר אפשרויות)</Label>
        <div className="mt-2 grid md:grid-cols-2 gap-3">
          {specializations.map((spec) => (
            <div key={spec} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={spec}
                checked={formData.specialization.includes(spec)}
                onCheckedChange={(checked) => onCheckboxChange(spec, checked as boolean, 'specialization')}
              />
              <Label htmlFor={spec} className="text-sm">{spec}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;
