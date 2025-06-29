
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, User, Scissors, Building2, X } from "lucide-react";

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

  const specializations = [
    'מספרה ועיצוב שיער גברים',
    'מספרה ועיצוב שיער נשים',
    'מספרה ועיצוב שיער ילדים'
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
                  <Label>התמחות במספרה * (ניתן לבחור מספר אפשרויות)</Label>
                  <div className="mt-2 grid md:grid-cols-2 gap-3">
                    {specializations.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={spec}
                          checked={formData.specialization.includes(spec)}
                          onCheckedChange={(checked) => handleCheckboxChange(spec, checked as boolean, 'specialization')}
                        />
                        <Label htmlFor={spec} className="text-sm">{spec}</Label>
                      </div>
                    ))}
                  </div>
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
                        onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean, 'communityFocus')}
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
                  onCheckedChange={(checked) => handleBooleanChange('agreeToTerms', checked as boolean)}
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
                      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white" dir="rtl">
                        <DialogHeader className="relative pb-4">
                          <button
                            className="absolute left-4 top-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 z-10"
                            onClick={(e) => e.preventDefault()}
                          >
                            <X className="w-6 h-6 text-gray-600" />
                          </button>
                          <DialogTitle className="text-3xl font-bold text-center text-gray-900 pr-12">
                            תקנון קהילת המספרות של ישראל
                          </DialogTitle>
                          <DialogDescription className="text-center text-gray-600 text-lg">
                            תקנון זה נקבע בהתאם לחוקי מדינת ישראל ולתקנות הרלוונטיות
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 text-sm text-right px-2">
                          <section className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-blue-800">סעיף 1 - מטרות הקהילה ויעדיה</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>קהילת המספרות של ישראל מטרתה לקדם את מקצוע המספרות במדינת ישראל, לחזק את הקשרים המקצועיים בין המספרים והמספרות בכל רחבי המדינה, ולספק פלטפורמה איכותית לשיתוף ידע, ניסיון והתפתחות מקצועית מתמדת.</p>
                              <p>הקהילה פועלת לקידום סטנדרטים מקצועיים גבוהים, לקידום חדשנות בתחום, ולטיפוח תרבות של למידה וצמיחה מקצועית רציפה.</p>
                            </div>
                          </section>
                          
                          <section className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-green-800">סעיף 2 - חברות בקהילה ותנאי הצטרפות</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>חברות בקהילה פתוחה לכל מספר או מספרת בעל/ת רישיון מקצועי תקף במדינת ישראל, או לכל מי שפועל בתחום המספרות באופן חוקי ומוכר.</p>
                              <p>החברות כפופה לאישור ועדת ההנהלה ולעמידה מלאה בתקנון זה ובכללי ההתנהגות המקצועית הנדרשים.</p>
                              <p>חברי הקהילה מחויבים לשמור על כבוד המקצוע ולפעול בהתאם לאתיקה המקצועית המקובלת.</p>
                            </div>
                          </section>
                          
                          <section className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-purple-800">סעיף 3 - זכויות וחובות החברים</h3>
                            <div className="space-y-3 text-gray-700">
                              <div>
                                <h4 className="font-semibold text-purple-700 mb-1">זכויות החברים:</h4>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                  <li>השתתפות פעילה בכל הפעילויות והאירועים של הקהילה</li>
                                  <li>קבלת מידע מקצועי עדכני ורלוונטי</li>
                                  <li>השתתפות בקבלת החלטות חשובות הנוגעות לקהילה</li>
                                  <li>גישה לרשת קשרים מקצועית ובסיס נתונים של חברי הקהילה</li>
                                  <li>הנחות על קורסים, סדנאות וכנסים מקצועיים</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-purple-700 mb-1">חובות החברים:</h4>
                                <ul className="list-disc list-inside space-y-1 mr-4">
                                  <li>שמירה על כבוד הזולת ועל אווירה מכבדת ומקצועית</li>
                                  <li>הימנעות מפרסום פוגעני, לא ראוי או שאינו קשור למטרות הקהילה</li>
                                  <li>פעילות בהתאם לאתיקה המקצועית ולחוקי מדינת ישראל</li>
                                  <li>שמירה על סודיות מקצועית כאשר נדרש</li>
                                </ul>
                              </div>
                            </div>
                          </section>
                          
                          <section className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-yellow-800">סעיף 4 - פרטיות ושמירת מידע אישי</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>הקהילה מתחייבת לשמור על פרטיות החברים בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, ולתקנות הגנת הפרטיות העדכניות ביותר.</p>
                              <p>מידע אישי של החברים לא יועבר לגורמים חיצוניים ללא הסכמה מפורשת ובכתב של החבר הרלוונטי, למעט במקרים חריגים הנדרשים על פי חוק.</p>
                              <p>החברים זכאים לעיין במידע האישי הנשמר עליהם ולבקש תיקון או מחיקה של מידע לא מדויק.</p>
                            </div>
                          </section>
                          
                          <section className="bg-red-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-red-800">סעיף 5 - משמעת, תלונות והליכי ערעור</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>הפרת התקנון או התנהגות שאינה הולמת את רוח הקהילה עלולה להוביל להליכי משמעת, כולל התראות, השעיה זמנית או סילוק מוחלט מהקהילה.</p>
                              <p>כל תלונה תיבדק בצורה הוגנת ויסודית על ידי ועדת משמעת מיוחדת, ותינתן זכות טיעון מלאה לכל הצדדים המעורבים.</p>
                              <p>החבר הנתבע זכאי לייצוג ולהליך ערעור בפני ועדת ערעורים עצמאית.</p>
                              <p>החלטות ועדת המשמעת יתקבלו ברוב קולות ויוקלטו בכתב עם נימוקים מפורטים.</p>
                            </div>
                          </section>
                          
                          <section className="bg-indigo-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-indigo-800">סעיף 6 - ניהול כספי ושקיפות</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>כל הכספים והתרומות של הקהילה ינוהלו בשקיפות מלאה ובהתאם לכללי הנהלת חשבונות תקינה.</p>
                              <p>דוח כספי שנתי יוצג לחברי הקהילה ויהיה זמין לעיון לכל המעוניינים.</p>
                              <p>החברים זכאים לקבל מידע על הוצאות הקהילה ועל אופן הקצאת המשאבים.</p>
                            </div>
                          </section>
                          
                          <section className="bg-teal-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-teal-800">סעיף 7 - שינויים בתקנון ותהליכי קבלת החלטות</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>שינויים בתקנון יעשו רק באישור של לפחות 60% מהחברים הפעילים בקהילה, ובהתאם לעקרונות הדמוקרטיה במדינת ישראל.</p>
                              <p>הצעות לשינוי התקנון יפורסמו לחברים לפחות 30 יום לפני המועד הקבוע לדיון ולהצבעה.</p>
                              <p>החלטות חשובות אחרות יתקבלו ברוב רגיל של החברים הנוכחים בישיבה, כאשר קוורום מינימלי הוא 25% מהחברים.</p>
                            </div>
                          </section>
                          
                          <section className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-xl mb-3 text-gray-800">סעיף 8 - פירוק הקהילה וחלוקת נכסים</h3>
                            <div className="space-y-2 text-gray-700">
                              <p>במקרה של פירוק הקהילה, החלטה כזו תתקבל ברוב של 75% מהחברים בהצבעה חשאית.</p>
                              <p>נכסי הקהילה יחולקו לצדקה או לארגונים עם מטרות דומות, בהתאם להחלטת החברים.</p>
                              <p>המידע האישי של החברים יימחק או יועבר בהסכמתם לגוף ממשיך מתאים.</p>
                            </div>
                          </section>
                          
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mt-6">
                            <p className="text-center text-gray-700 font-medium">
                              תקנון זה נכנס לתוקף מיום אישורו והוא מחייב את כל חברי הקהילה.
                              <br />
                              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
                            </p>
                          </div>
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
