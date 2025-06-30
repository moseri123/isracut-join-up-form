
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CheckCircle } from "lucide-react";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberNumber: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose, memberNumber }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="text-center" dir="rtl">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <AlertDialogTitle className="text-2xl text-green-600">
            הצטרפת בהצלחה לקהילה!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg space-y-2">
            <div className="font-semibold text-gray-900">
              מספר החבר שלך הוא: <span className="text-blue-600 font-bold">{memberNumber}</span>
            </div>
            <div className="text-sm text-gray-600">
              נא לשמור את מספר החבר לשימוש עתידי
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction 
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          סגור
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
