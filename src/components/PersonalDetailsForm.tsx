
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface PersonalDetailsFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <User className="w-5 h-5 ml-2" />
        פרטים אישיים
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">שם פרטי *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onInputChange('firstName', e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">שם משפחה *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onInputChange('lastName', e.target.value)}
            required
            className="mt-1"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">כתובת אימייל *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">מספר טלפון *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            required
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
