
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
    'יצירת כוח קניה מול הספקים והורדת מחירים',
    'הדרכות וקורסים',
    'תמיכה עסקית',
    'הדרכה בשיווק ופרסום ברשתות',
    'כנסים ואירועי ענף',
    'שיתופי פעולה בקהילה'
  ];

  return (
    <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-900">
        מה חשוב לך שהקהילה תעסוק בו? (ניתן לבחור מספר אפשרויות)
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {communityFocusOptions.map((option, index) => (
          <div key={option} className="flex items-center space-x-2 space-x-reverse p-2 rounded-md hover:bg-blue-100 transition-all duration-200 transform hover:scale-105">
            <Checkbox
              id={option}
              checked={formData.communityFocus.includes(option)}
              onCheckedChange={(checked) => onCheckboxChange(option, checked as boolean, 'communityFocus')}
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
            <Label htmlFor={option} className="text-sm cursor-pointer hover:text-blue-700 transition-colors">{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFocusForm;
