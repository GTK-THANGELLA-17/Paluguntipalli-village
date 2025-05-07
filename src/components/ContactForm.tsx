
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ContactForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced topic options with more choices
  const subjectOptions = [
    { value: "village_info", label: t("Village Information Request") },
    { value: "event_inquiry", label: t("Event Information") },
    { value: "tourism", label: t("Tourism Query") },
    { value: "heritage", label: t("Cultural Heritage Information") },
    { value: "agriculture", label: t("Agricultural Information") },
    { value: "history", label: t("Historical Information") },
    { value: "community_service", label: t("Community Service") },
    { value: "local_business", label: t("Local Business Inquiry") },
    { value: "accommodation", label: t("Accommodation Options") },
    { value: "transportation", label: t("Transportation Query") },
    { value: "suggestion", label: t("Suggestion for Improvement") },
    { value: "website_issue", label: t("Website Issue Report") },
    { value: "other", label: t("Other") }
  ];

  // Form schema validation
  const formSchema = z.object({
    name: z.string().min(2, { message: t("Name must be at least 2 characters.") }),
    email: z.string().email({ message: t("Please enter a valid email.") }),
    subject: z.string().min(1, { message: t("Please select a subject.") }),
    message: z.string().min(10, { message: t("Message must be at least 10 characters.") }),
  });

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:imgtk17@gmail.com?subject=${encodeURIComponent(
        `[${values.subject}] Contact Form Submission`
      )}&body=${encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
      )}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      toast({
        title: t("Form submitted"),
        description: t("Your email client should open with your message."),
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("Error"),
        description: t("There was a problem opening your email client."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
          <h3 className="text-xl font-medium mb-4 dark:text-[#403E43]">{t("Contact Us")}</h3>
          <p className="text-gray-600 dark:text-[#403E43] mb-6">
            {t("Fill out this form to request information or share your feedback about the village.")}
          </p>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#403E43]">{t("Your Name")}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t("Enter your name")} 
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-[#403E43] hover:border-forest dark:hover:border-slate transition-colors duration-300" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#403E43]">{t("Your Email")}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={t("Enter your email")} 
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-[#403E43] hover:border-forest dark:hover:border-slate transition-colors duration-300" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#403E43]">{t("Topic")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-[#403E43] hover:border-forest dark:hover:border-slate transition-colors duration-300">
                      <SelectValue placeholder={t("What is your inquiry about?")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    {subjectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="dark:text-[#403E43] hover:bg-forest/20 dark:hover:bg-slate/20">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#403E43]">{t("Your Message")}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t("Please share details about your inquiry...")} 
                    className="min-h-[150px] dark:bg-gray-800 dark:border-gray-700 dark:text-[#403E43] hover:border-forest dark:hover:border-slate transition-colors duration-300" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-forest dark:bg-[#252525] text-white dark:text-white dark:hover:bg-black/80 hover:scale-105 transition-all duration-300" 
            disabled={isSubmitting}
          >
            {isSubmitting ? t("Sending...") : t("Send Message")}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;
