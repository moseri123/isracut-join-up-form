
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Scissors, Sparkles } from "lucide-react";
import PersonalDetailsForm from './PersonalDetailsForm';
import BusinessDetailsForm from './BusinessDetailsForm';
import CommunityFocusForm from './CommunityFocusForm';
import NotesForm from './NotesForm';
import TermsDialog from './TermsDialog';
import BenefitsCard from './BenefitsCard';
import SuccessDialog from './SuccessDialog';

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    specialization: [],
    communityFocus: [],
    notes: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [memberNumber, setMemberNumber] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (field: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (option: string, checked: boolean, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], option]
        : prev[field].filter(item => item !== option)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "שגיאה",
        description: "יש לאשר את התקנון כדי להמשיך",
        variant: "destructive"
      });
      return;
    }

    if (formData.specialization.length === 0) {
      toast({
        title: "שגיאה",
        description: "יש לבחור לפחות התמחות אחת",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwWrOYZfL0ZJmPCfG6YLbPXRS_ZZxLQanXizg_vFs-D8C-E2C1nj6av_BFGuSdLnXw/exec';
      
      console.log('שולח נתונים לגוגל סקריפט:', formData);
      console.log('URL של הסקריפט:', scriptUrl);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('תגובה מהשרת - סטטוס:', response.status);
      console.log('תגובה מהשרת - headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('תוצאה מהשרת:', result);

      if (result.success) {
        setMemberNumber(result.memberNumber);
        setShowSuccessDialog(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          specialization: [],
          communityFocus: [],
          notes: '',
          agreeToTerms: false
        });

        toast({
          title: "הטופס נשלח בהצלחה!",
          description: `מספר החבר שלך: ${result.memberNumber}`,
        });
      } else {
        throw new Error(result.error || 'שגיאה לא ידועה מהשרת');
      }
    } catch (error) {
      console.error('שגיאה בשליחת הטופס:', error);
      
      let errorMessage = "אנא נסה שוב מאוחר יותר";
      
      if (error.name === 'AbortError') {
        errorMessage = "הבקשה ארכה יותר מדי זמן - אנא נסה שוב";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "אין חיבור לאינטרנט או בעיה ברשת";
      } else if (error.message.includes('HTTP error')) {
        errorMessage = "שגיאה בשרת - אנא נסה שוב מאוחר יותר";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "שגיאה בשליחת הטופס",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    setMemberNumber('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4 animate-fade-in" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            קהילת המספרות של ישראל
          </h1>
          <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            הצטרפו לקהילה המקצועית המובילה במדינה
            <Sparkles className="w-5 h-5 text-purple-500" />
          </p>
        </div>

        <BenefitsCard />

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-2xl text-center text-gray-900">
              טופס הצטרפות
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              אנא מלאו את הפרטים הבאים כדי להצטרף לקהילה
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalDetailsForm 
                formData={formData}
                onInputChange={handleInputChange}
              />

              <BusinessDetailsForm 
                formData={formData}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />

              <CommunityFocusForm 
                formData={formData}
                onCheckboxChange={handleCheckboxChange}
              />

              <NotesForm 
                formData={formData}
                onInputChange={handleInputChange}
              />

              <TermsDialog 
                formData={formData}
                onBooleanChange={handleBooleanChange}
              />

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שולח...' : 'הצטרף לקהילה'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <SuccessDialog 
          isOpen={showSuccessDialog}
          onClose={handleSuccessClose}
          memberNumber={memberNumber}
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
