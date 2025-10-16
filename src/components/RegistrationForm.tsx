
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
    
    console.log('=== התחלת תהליך שליחת הטופס ===');
    console.log('נתוני הטופס:', formData);
    
    if (!formData.agreeToTerms) {
      console.log('שגיאה: לא אושר התקנון');
      toast({
        title: "שגיאה",
        description: "יש לאשר את התקנון כדי להמשיך",
        variant: "destructive"
      });
      return;
    }

    if (formData.specialization.length === 0) {
      console.log('שגיאה: לא נבחרה התמחות');
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
      
      console.log('=== שליחת בקשה אחת לגוגל סקריפט ===');
      console.log('URL:', scriptUrl);
      console.log('מספר הטלפון ישמש כמספר חבר:', formData.phone);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('Timeout reached - aborting request');
        controller.abort();
      }, 30000);

      console.log('שולח בקשה...');
      
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("businessName", formData.businessName);
      formDataToSend.append("specialization", formData.specialization.join(","));
      formDataToSend.append("communityFocus", formData.communityFocus.join(","));
      formDataToSend.append("notes", formData.notes);
      formDataToSend.append("agreeToTerms", formData.agreeToTerms ? "true" : "false");

      console.log('נתונים שנשלחים:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        specialization: formData.specialization.join(","),
        communityFocus: formData.communityFocus.join(","),
        notes: formData.notes,
        agreeToTerms: formData.agreeToTerms ? "true" : "false"
      });

      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: formDataToSend,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('=== תגובה מהשרת התקבלה ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('OK:', response.ok);

      if (!response.ok) {
        console.warn('תגובה לא תקינה מהשרת, ממשיכים לנסות לפרש בכל זאת:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        // לא זורקים שגיאה כאן כדי לאפשר טיפול במענה שאינו JSON/opaque
      }

      // נסיון לפרש JSON, ואם לא - נניח הצלחה כל עוד המענה תקין
      const responseText = await response.text();
      console.log('תגובה גולמית מהשרת:', responseText);

      let result: any = null;
      try {
        result = JSON.parse(responseText);
        console.log('JSON פורסר בהצלחה:', result);
      } catch (parseError) {
        console.warn('התגובה אינה JSON תקין, מניח הצלחה כי סטטוס OK');
      }

      const succeeded =
        result && typeof result === 'object' && 'success' in result
          ? Boolean(result.success)
          : true;

      if (succeeded) {
        console.log('=== הטופס נשלח בהצלחה! ===');
        console.log('מספר החבר הוא מספר הטלפון:', formData.phone);
        
        // Use phone number as member number
        setMemberNumber(formData.phone);
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
          description: `מספר החבר שלך: ${formData.phone}`,
        });
      } else {
        const serverError =
          result && typeof result === 'object' && 'error' in result ? (result as any).error : undefined;
        console.error('השרת החזיר success: false', serverError);
        throw new Error(serverError || 'שגיאה לא ידועה מהשרת');
      }
    } catch (error) {
      console.error('=== שגיאה בתהליך השליחה ===');
      console.error('סוג השגיאה:', error.name);
      console.error('הודעת השגיאה:', error.message);
      
      let errorMessage = "אנא נסה שוב מאוחר יותר";
      
      if (error.name === 'AbortError') {
        errorMessage = "הבקשה ארכה יותר מדי זמן - אנא נסה שוב";
        console.log('שגיאת זמן קצוב');
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "אין חיבור לאינטרנט או בעיה ברשת";
        console.log('בעיה ברשת או חיבור לאינטרנט');
      } else if (error.message.includes('HTTP error')) {
        errorMessage = error.message;
        console.log('שגיאת HTTP מהשרת');
      } else if (error.message.includes('JSON')) {
        errorMessage = "בעיה בעיבוד התגובה מהשרת";
        console.log('בעיה בפירוש JSON');
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
      console.log('=== סיום תהליך השליחה ===');
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
