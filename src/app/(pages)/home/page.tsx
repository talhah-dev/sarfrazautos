import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";
import BranchesSection from "@/components/home/branches-section";

const navigationData = [
    { title: "Home", href: "/", isActive: true },
    { title: "Wholesale Portal", href: "/login", isActive: false },
    { title: "Register Shop", href: "/signup", isActive: false },
    { title: "Admin", href: "/admin/login", isActive: false },
];

export default function HomePage() {
    return (
        <>
            <Navbar navigationData={navigationData} />
            <main className="-mt-20">
                <HeroSection />
                <BranchesSection />
            </main>
        </>
    );
}