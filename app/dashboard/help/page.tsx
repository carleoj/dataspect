import { Card } from "@/components/ui/card";
import { Faq } from "@/components/help/faq";

const SUPPORT_EMAIL = "jimroep@gmail.com";

export default function HelpPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-sm text-gray-600">
        Answers to common questions about uploading, reading and managing your datasets.
      </p>

      <Faq />

      {SUPPORT_EMAIL && (
        <Card title="Still stuck?">
          <p className="text-sm text-gray-600">
            Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-gray-900 underline underline-offset-2">
              {SUPPORT_EMAIL}
            </a>{" "}
            and include the name of the dataset you’re having trouble with.
          </p>
        </Card>
      )}
    </div>
  );
}