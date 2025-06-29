
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const BenefitsCard: React.FC = () => {
  const benefits = [
    "כוח אל מול הספקים",
    "הזדמנויות עסקיות ושיתופי פעולה",
    "רשת המקשרת את כל המספרות בארץ",
    "תמיכה מקצועית ועסקית מחברי הקהילה",
    "המלצה וייעוץ לקהילה על מוצרים שרכשתם",
    "עדכונים על כנסים ואירועי ענף"
  ];

  return (
    <Card className="mb-6 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl text-center">איך הקהילה יכולה לתרום לכולנו?</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse hover:bg-green-50 p-2 rounded-md transition-all duration-200">
              <Check className="w-5 h-5 text-green-500" />
              <span className="hover:text-green-700 transition-colors">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsCard;
