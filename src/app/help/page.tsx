'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Video,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

const faqs = [
  {
    question: 'How do I add a new user to the system?',
    answer:
      'To add a new user, navigate to the Users page and click the "Add User" button in the top right corner. Fill in the required information including name, email, and role, then click Save.',
  },
  {
    question: 'How can I export data from the dashboard?',
    answer:
      'You can export data by clicking the "Export" button available on most pages. Data can be exported in CSV or Excel format. For custom exports, go to the Analytics page and use the advanced export options.',
  },
  {
    question: 'What do the different user roles mean?',
    answer:
      'Admin: Full access to all features including user management. Manager: Can view reports and manage orders but cannot modify system settings. User: Limited access to view-only features.',
  },
  {
    question: 'How do I change my password?',
    answer:
      'Go to Settings > Security. Enter your current password and your new password twice to confirm. Click "Update Password" to save the changes.',
  },
  {
    question: 'Can I customize the dashboard layout?',
    answer:
      'Yes! Go to Settings > Appearance to customize the theme, accent colors, and sidebar style. You can also rearrange widgets on the main dashboard by dragging them.',
  },
  {
    question: 'How do I set up two-factor authentication?',
    answer:
      'Navigate to Settings > Security and scroll to the Two-Factor Authentication section. Click "Enable 2FA" and follow the instructions to set up an authenticator app.',
  },
];

const resources = [
  {
    icon: Book,
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    link: '#',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for common tasks',
    link: '#',
  },
  {
    icon: FileText,
    title: 'Release Notes',
    description: 'Latest updates and feature releases',
    link: '#',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with other users and share tips',
    link: '#',
  },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">How can we help?</h1>
        <p className="text-muted-foreground mt-2">
          Search our documentation, FAQs, or contact support
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Quick Resources */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <Card
            key={resource.title}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <resource.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {resource.description}
              </p>
              <a
                href={resource.link}
                className="text-sm text-primary flex items-center gap-1 hover:underline"
              >
                Learn more
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4 text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No FAQs found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Can't find what you're looking for?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    support@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">
                    Available 9am-6pm EST
                  </p>
                </div>
              </div>

              <Button className="w-full">Start a Conversation</Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-emerald-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dashboard</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-emerald-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-emerald-600">Operational</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t text-center">
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  View status page
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
