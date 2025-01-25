import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";
import ContactForm from "@/components/pageAssembly/ContactForm";

const pages = [{ name: "Contact", href: "/contact", current: true }];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full h-full bg-[#e4e4e4]">
      <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
        <BreadcrumbNavigation pages={pages} />
        <ContactForm />
      </div>
    </div>
  );
}
