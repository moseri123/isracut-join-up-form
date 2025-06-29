import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface TermsDialogProps {
  formData: {
    agreeToTerms: boolean;
  };
  onBooleanChange: (field: string, value: boolean) => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({ formData, onBooleanChange }) => {
  return (
    <div className="flex items-start space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
      <Checkbox
        id="agreeToTerms"
        checked={formData.agreeToTerms}
        onCheckedChange={(checked) => onBooleanChange('agreeToTerms', checked as boolean)}
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
  );
};

export default TermsDialog;
