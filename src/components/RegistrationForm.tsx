
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, User, Scissors, Building2, Mail, Phone, FileText } from "lucide-react";

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    specialization: '',
    communityFocus: [],
    notes: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializations = [
    'חיתוך וסטיילינג',
    'צביעה ובליטש',
    'טיפולי קרטין ותחליקים',
    'תסרוקות כלה ואירועים',
    'השתלות שיער',
    'טיפולי קרקפת',
    'עיצוב גבות וריסים',
    'כל התחומים'
  ];

  const communityFocusOptions = [
    'שיתוף ידע מקצועי',
    'הזמנות ומבצעים משותפים',
    'הדרכות וקורסים',
    'תמיכה עסקית',
    'רשתות חברתיות מקצועיות',
    'כנסים ואירועי ענף'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      communityFocus: checked 
        ? [...prev.communityFocus, option]
        : prev.communityFocus.filter(item => item !== option)
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

    setIsSubmitting(true);
    
    try {
      // Google Apps Script URL - replace with actual URL
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
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          businessName: '',
          specialization: '',
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
            <Scissors className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            קהילת המספרות של ישראל
          </h1>
          <p className="text-lg text-gray-600">
            הצטרפו לקהילה המקצועית המובילה במדינה
          </p>
        </div>

        <Card className="mb-6 border-0 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">מה הקהילה תיתן לך?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-500" />
                <span>גישה לידע מקצועי מתקדם</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-500" />
                <span>הזדמנויות עסקיות ושיתופי פעולה</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-500" />
                <span>הדרכות וקורסים בהנחות מיוחדות</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-500" />
                <span>תמיכה מקצועית ועסקית</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-500" />
                <span>רשת קשרים עם מספרים מכל הארץ</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Check className="w-5 h-5 text-green-500" />
                <span>עדכונים על כנסים ואירועי ענף</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">
              טופס הצטרפות
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              אנא מלאו את הפרטים הבאים כדי להצטרף לקהילה
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
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
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">שם משפחה *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Business Details */}
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
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>התמחות במספרה *</Label>
                  <RadioGroup
                    value={formData.specialization}
                    onValueChange={(value) => handleInputChange('specialization', value)}
                    className="mt-2 grid md:grid-cols-2 gap-2"
                  >
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value={spec} id={spec} />
                        <Label htmlFor={spec} className="text-sm">{spec}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Community Focus */}
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
                        onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">הערות נוספות</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="ספרו לנו קצת על עצמכם, הניסיון שלכם, או כל דבר אחר שתרצו לשתף..."
                  className="mt-1 min-h-[100px] resize-none"
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                />
                <div className="text-sm">
                  <Label htmlFor="agreeToTerms" className="cursor-pointer">
                    אני מאשר/ת ומסכים/ה ל
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-blue-600 underline mr-1">
                          תקנון הקהילה
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">תקנון קהילת המספרות של ישראל</DialogTitle>
                          <DialogDescription>
                            תקנון זה נקבע בהתאם לחוקי מדינת ישראל
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-sm text-right">
                          <section>
                            <h3 className="font-semibold text-lg mb-2">סעיף 1 - מטרות הקהילה</h3>
                            <p>קהילת המספרות של ישראל מטרתה לקדם את מקצוע המספרות, לחזק את הקשרים המקצועיים בין המספרים בישראל, ולספק פלטפורמה לשיתוף ידע והתפתחות מקצועית.</p>
                          </section>
                          
                          <section>
                            <h3 className="font-semibold text-lg mb-2">סעיף 2 - חברות בקהילה</h3>
                            <p>חברות בקהילה פתוחה לכל מספר/ת בעל/ת רישיון תקף במדינת ישראל. החברות כפופה לאישור ההנהלה ולעמידה בתקנון זה.</p>
                          </section>
                          
                          <section>
                            <h3 className="font-semibold text-lg mb-2">סעיף 3 - זכויות וחובות החברים</h3>
                            <p>חברי הקהילה זכאים להשתתף בכל הפעילויות, לקבל מידע מקצועי, ולהשתתף בקבלת החלטות. על החברים לשמור על כבוד הזולת, להימנע מפרסום פוגעני, ולפעול בהתאם לאתיקה המקצועית.</p>
                          </section>
                          
                          <section>
                            <h3 className="font-semibold text-lg mb-2">סעיף 4 - פרטיות ושמירת מידע</h3>
                            <p>הקהילה מתחייבת לשמור על פרטיות החברים בהתאם לחוק הגנת הפרטיות, התשמ"א-1981. מידע אישי לא יועבר לגורמים חיצוניים ללא הסכמה מפורשת.</p>
                          </section>
                          
                          <section>
                            <h3 className="font-semibold text-lg mb-2">סעיף 5 - משמעת ותלונות</h3>
                            <p>הפרת התקנון עלולה להוביל להשעיה או לסילוק מהקהילה. כל תלונה תיבדק בצורה הוגנת ותינתן זכות טיעון לנתבע.</p>
                          </section>
                          
                          <section>
                            <h3 className="font-semibold text-lg mb-2">סעיף 6 - שינויים בתקנון</h3>
                            <p>שינויים בתקנון יעשו רק באישור רוב החברים ובהתאם לנהלי הדמוקרטיה בישראל.</p>
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>
                    *
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold transition-all duration-200"
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
