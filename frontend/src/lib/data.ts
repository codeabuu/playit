
// Mock data for youth sports campaigns
export interface Campaign {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  daysLeft: number;
  teamNeeds: string[];
  story: string;
  location: string;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    title: "East Side Eagles Basketball Team",
    description: "Help the Eagles get new uniforms and equipment for the upcoming season.",
    fullDescription: "The East Side Eagles basketball team has been bringing our community together for over 10 years. Most of our players come from low-income families and need support to continue playing.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800",
    goalAmount: 5000,
    raisedAmount: 3750,
    daysLeft: 14,
    teamNeeds: [
      "New uniforms for 15 players",
      "Basketball shoes for players who can't afford them",
      "Practice equipment and balls",
      "Tournament registration fees"
    ],
    story: "The East Side Eagles basketball team was founded in 2012 to give kids in our neighborhood a safe place to play and develop their skills. Most of our players come from families that can't afford the high costs of youth sports. Your donation will help us provide uniforms, shoes, and equipment so these talented kids can focus on their game, not their circumstances.\n\nLast year, despite having worn-out uniforms and sharing limited equipment, the Eagles made it to the district finals. Imagine what they could achieve with proper support! Every donation helps these young athletes build confidence, teamwork skills, and healthy habits that last a lifetime.",
    location: "East Side Community Center, Athletic City"
  },
  {
    id: 2,
    title: "Riverside Runners Track Team",
    description: "Send our track team to the state championship - they've earned it!",
    fullDescription: "The Riverside Runners have qualified for the state championship! Help us cover travel expenses, accommodations, and entry fees for 12 dedicated athletes.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80&w=800",
    goalAmount: 3500,
    raisedAmount: 2100,
    daysLeft: 7,
    teamNeeds: [
      "Transportation to state championship (300 miles away)",
      "Two nights of hotel accommodations",
      "Meals for 12 athletes and 2 coaches",
      "Championship registration fees"
    ],
    story: "The Riverside Runners track team has worked incredibly hard this season, with early morning practices and weekend training sessions. Their dedication has paid off - they've qualified for the state championship! Unfortunately, our school has a limited athletics budget and can't cover the costs of sending the team to compete.\n\nMany of these athletes have never had the opportunity to compete at this level before. For some, strong performances could lead to college scholarship opportunities. We don't want financial constraints to hold them back from showcasing their talents and representing our community on the state level.",
    location: "Riverside High School, Athletic City"
  },
  {
    id: 3,
    title: "Westlake Warriors Soccer Equipment",
    description: "Help us replace worn-out soccer gear for our growing youth program.",
    fullDescription: "The Westlake Warriors youth soccer program has doubled in size! We need to replace old equipment and purchase additional gear to accommodate all our young players.",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800",
    goalAmount: 2800,
    raisedAmount: 950,
    daysLeft: 21,
    teamNeeds: [
      "20 new soccer balls",
      "Two portable goals for practice",
      "Training cones and agility ladders",
      "First aid kits and water bottle sets"
    ],
    story: "The Westlake Warriors soccer program has grown from 30 to 60 children in just one year! This growth is exciting, but it has stretched our resources to the limit. We're currently using worn-out equipment that should have been replaced years ago.\n\nOur volunteer coaches are amazing, but they can't create equipment out of thin air. Many families in our program can't afford the high costs of club soccer, so we keep our fees minimal and rely on community support to provide a quality experience. Your donation will directly impact young players who are developing not just soccer skills but also confidence, teamwork, and healthy habits.",
    location: "Westlake Community Fields, Athletic City"
  },
  {
    id: 4,
    title: "Northside Knights Baseball Fund",
    description: "Support inner-city youth baseball players with equipment and field time.",
    fullDescription: "The Northside Knights give kids from our city's most underserved neighborhoods a chance to play baseball, learn teamwork, and have fun in a safe environment.",
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=800",
    goalAmount: 4500,
    raisedAmount: 3150,
    daysLeft: 10,
    teamNeeds: [
      "Baseball gloves for players who can't afford them",
      "Batting helmets and catcher's gear",
      "Field rental fees for practices and games",
      "Uniforms for 18 players"
    ],
    story: "The Northside Knights baseball program was created to give inner-city kids a productive after-school activity and a sense of belonging. Many of our players have never had the opportunity to play organized sports before joining our team.\n\nYour support helps us provide equipment, uniforms, and field time so every child can participate regardless of their family's financial situation. Beyond baseball skills, our players develop discipline, teamwork, and confidence that translate to improved performance in school and better decision-making off the field. The Knights program has become a vital part of our community, with former players returning as volunteer coaches and mentors.",
    location: "Northside Park, Athletic City"
  }
];

// Testimonials
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "SportsAid helped our basketball team get new uniforms when we couldn't afford them. Now our team feels proud to represent our school!",
    author: "Michael Johnson",
    role: "Team Captain, East Side Eagles",
    image: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?auto=format&fit=crop&q=80&w=120"
  },
  {
    quote: "The support we received through this platform changed everything for our girls soccer team. We finally have proper equipment to practice with.",
    author: "Sarah Williams",
    role: "Coach, Westlake Warriors",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120"
  },
  {
    quote: "Thanks to generous donors, our track team made it to the state championships for the first time ever! These experiences build character and open doors.",
    author: "David Rodriguez",
    role: "Athletic Director, Riverside High School",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
  }
];

// Impact stats
export interface ImpactStat {
  value: string;
  label: string;
  description: string;
}

export const impactStats: ImpactStat[] = [
  {
    value: "42",
    label: "Teams Supported",
    description: "Youth teams across the region have received funding"
  },
  {
    value: "875",
    label: "Young Athletes",
    description: "Kids who can now participate in sports programs"
  },
  {
    value: "$157K",
    label: "Funds Raised",
    description: "100% of donations go directly to youth sports programs"
  },
  {
    value: "20+",
    label: "Communities",
    description: "Local neighborhoods benefiting from youth sports"
  }
];

// FAQ items
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "How do I know the money will go to the sports teams?",
    answer: "100% of your donation (minus payment processing fees) goes directly to the team's account. We verify each campaign and provide updates on how the funds are used."
  },
  {
    question: "Can I donate to a specific need instead of a general fund?",
    answer: "Yes! Each campaign lists specific needs. In the donation form, you can leave a note specifying which need you'd like your donation to support."
  },
  {
    question: "Are my donations tax-deductible?",
    answer: "Yes, all donations are tax-deductible as we operate under a 501(c)(3) nonprofit status. You will receive a receipt for tax purposes after your donation."
  },
  {
    question: "How can my team apply for funding?",
    answer: "Visit our 'Submit a Campaign' page to apply. We review applications weekly and will contact you with any questions before listing your campaign."
  },
  {
    question: "Can I make a recurring donation?",
    answer: "Yes! When making a donation, simply check the 'Make this a monthly donation' box to support youth sports on an ongoing basis."
  }
];
