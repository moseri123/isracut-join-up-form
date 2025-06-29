
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
      const scriptUrl = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "הרשמה בוצעה בהצלחה!",
          description: "תודה על הצטרפותך לקהילת המספרות של ישראל",
        });
        
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
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "שגיאה בשליחה",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4 animate-fade-in" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <Scissors className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors duration-300">
            קהילת המספרות של ישראל
          </h1>
          <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500 animate-bounce" />
            הצטרפו לקהילה המקצועית המובילה במדינה
            <Sparkles className="w-5 h-5 text-purple-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </p>
        </div>

        <BenefitsCard />

        <Card className="shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-2xl text-center text-gray-900 hover:text-purple-700 transition-colors">
              טופס הצטרפות
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              אנא מלאו את הפרטים הבאים כדי להצטרף לקהילה
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <PersonalDetailsForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <BusinessDetailsForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <CommunityFocusForm 
                  formData={formData}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <NotesForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
                <TermsDialog 
                  formData={formData}
                  onBooleanChange={handleBooleanChange}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: '1.2s' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שולח...' : 'הצטרף לקהילה'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
