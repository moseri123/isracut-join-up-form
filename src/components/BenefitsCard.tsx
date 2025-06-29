
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const BenefitsCard: React.FC = () => {
  const benefits = [
    "גישה לידע מקצועי מתקדם",
    "הזדמנויות עסקיות ושיתופי פעולה",
    "הדרכות וקורסים בהנחות מיוחדות",
    "תמיכה מקצועית ועסקית",
    "רשת קשרים עם מספרים מכל הארץ",
    "עדכונים על כנסים ואירועי ענף"
  ];

  return (
    <Card className="mb-6 border-0 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl text-center">מה הקהילה תיתן לך?</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <Check className="w-5 h-5 text-green-500" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
