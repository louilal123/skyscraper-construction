// src/data/homeContent.ts
import {
    HomeModernIcon,
    PencilSquareIcon,
    BoltIcon,
    WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

// ── Services (only 4) ──
export const services = [
    {
        title: 'General Construction',
        description: 'Full design-and-build for homes and commercial spaces.',
        includes: 'Structural, finishing, permits & supervision',
        icon: HomeModernIcon,
        image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        title: 'Architectural Design',
        description: 'Floor plans, 3D renders, and building design services.',
        includes: 'Site analysis, design drafting, permit-ready plans',
        icon: PencilSquareIcon,
        image: 'https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        title: 'Electrical Installation',
        description: 'Complete wiring, panel upgrades, and lighting systems.',
        includes: 'Load computation, wiring, outlets & fixtures',
        icon: BoltIcon,
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        title: 'Renovations & Additions',
        description: 'Room extensions, home upgrades, and remodeling works.',
        includes: 'Demolition, structural changes, full finishing',
        icon: WrenchScrewdriverIcon,
        image: 'https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

// ── Process Steps ──
import {
    ChatBubbleLeftRightIcon,
    MapPinIcon,
    DocumentCheckIcon,
    TruckIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';

export const processSteps = [
    { step: '01', title: 'Free Consultation', desc: 'Tell us about your project — scope, budget, and timeline. No commitment required.', icon: ChatBubbleLeftRightIcon },
    { step: '02', title: 'Site Visit', desc: 'We visit your site to assess conditions and take measurements.', icon: MapPinIcon },
    { step: '03', title: 'Design & Costing', desc: 'We prepare plans and a detailed cost breakdown with no hidden charges.', icon: DocumentCheckIcon },
    { step: '04', title: 'Construction', desc: 'Work begins. You receive regular updates throughout the project.', icon: TruckIcon },
    { step: '05', title: 'Turnover', desc: 'Final walkthrough, punch list, and keys handed over to you.', icon: KeyIcon },
];

// ── Testimonials ──
export const testimonials = [
    {
        name: 'Renaldo M.',
        location: 'Boac, Marinduque',
        text: 'Maganda ang trabaho nila. Hindi nag-overpromise, nagdeliver talaga ng on time. Maayos din ang communication nila sa amin throughout the project.',
        project: 'Residential House',
        rating: 5,
    },
    {
        name: 'Fe Santos',
        location: 'Buenavista, Marinduque',
        text: 'Ang tindera ko nagrekomenda sa kanila. Na-surprise ako kasi exact sa budget, walang dagdag-dagdag na unexpected na gastos. Gagamitin ko ulit sila for my next project.',
        project: 'Commercial Space Renovation',
        rating: 5,
    },
    {
        name: 'Jun dela Cruz',
        location: 'Sta. Cruz, Marinduque',
        text: 'Very professional. They explained everything clearly, from the materials down to the cost. Yung mga workers nila maayos din mag-trabaho.',
        project: 'House Addition',
        rating: 5,
    },
];

// ── FAQs ──
export const faqs = [
    {
        q: 'How much does it cost to build a house in Marinduque?',
        a: 'It depends on the size, materials, and design. As a rough guide, basic residential construction starts at around ₱15,000–₱20,000 per sqm. We provide a detailed cost breakdown before any work begins — no guesswork.',
    },
    {
        q: 'Do you offer free consultations?',
        a: 'Yes. Initial consultations are free. We discuss your project, budget, and timeline — no commitment required. If youre ready to proceed, we schedule a site visit.',
    },
    {
        q: 'What is your payment terms?',
        a: 'We require 30% down payment to mobilize and start construction. The remaining balance is paid in agreed tranches tied to project milestones — so you only pay as work progresses.',
    },
    {
        q: 'Are you licensed to operate in Marinduque?',
        a: 'Yes. We are PCAB (Philippine Contractors Accreditation Board) licensed and SEC registered. You can request copies of our licenses before signing any contract.',
    },
    {
        q: 'How long does a typical house construction take?',
        a: 'A standard single-story residential house usually takes 3 to 6 months depending on size and complexity. We provide a realistic project schedule upfront and keep you updated throughout.',
    },
    {
        q: 'Can you handle the building permits?',
        a: 'Yes. We assist in preparing the documents needed for building permit applications. Our team coordinates with local government offices to make the process smoother for you.',
    },
    {
        q: 'Do you work outside Marinduque?',
        a: 'Our primary service area is Marinduque, but we do take select projects in nearby provinces. Contact us to discuss your location and project details.',
    },
];