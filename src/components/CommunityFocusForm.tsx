
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CommunityFocusFormProps {
  formData: {
    communityFocus: string[];
  };
  onCheckboxChange: (option: string, checked: boolean, field: string) => void;
}

const CommunityFocusForm: React.FC<CommunityFocusFormProps> = ({ 
  formData, 
  onCheckboxChange 
}) => {
  const communityFocusOptions = [
    'שיתוף ידע מקצועי',
    'הזמנות ומבצעים משותפים',
    'הדרכות וקורסים',
    'תמיכה עסקית',
    'רשתות חברתיות מקצועיות',
    'כנסים ואירועי ענף'
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        מה חשוב לך שהקהילה תעסוק בו? (ניתן לבחור מספר אפשרויות)
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {communityFocusOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id={option}
              checked={formData.communityFocus.includes(option)}
              onCheckedChange={(checked) => onCheckboxChange(option, checked as boolean, 'communityFocus')}
            />
            <Label htmlFor={option} className="text-sm">{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFocusForm;
