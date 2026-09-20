import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface LessonSection {
  title: string;
  content: string[];
}

interface LessonData {
  number: number;
  title: string;
  theme: string;
  coreMessage: string;
  sections: LessonSection[];
}

@Component({
  selector: 'app-lesson',
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss'
})
export class Lesson implements OnInit {

lesson: LessonData | null = null;

lessons: Record<number, LessonData> = {

    1: {
      number: 1,

      title: 'Where Money Comes From',

      theme:
        'Understanding how money is created and why credit matters.',

      coreMessage:
        'Money is not just printed and handed out. Most money is created when banks lend it. Credit allows money to move through the economy and create opportunity.',

      sections: [
        {
          title: 'Introduction',
          content: [
            'Today we are going to talk about something most people never learn in school: where money actually comes from.',
            'Understanding lending is important because the financial system gives people opportunities to start businesses, buy homes, and build wealth.',
            'Discussion Question: Where do you think money comes from?'
          ]
        },

        {
          title: 'Part 1: The Federal Reserve',
          content: [
            'In the United States, the financial system starts with an institution called the Federal Reserve, often called the Fed.',
            'The Federal Reserve is the country’s central bank.',
            'The Fed does not normally lend directly to everyday consumers. The banking system connects central banking, commercial banks, businesses, and individuals.',
            'Use the lesson’s banking-system diagram and discussion to explain how money moves through the financial system.'
          ]
        },

        {
          title: 'Part 2: How Lending Creates Money',
          content: [
            'Banks play a major role in money creation through lending.',
            'The lesson uses a $1,000 business-loan example to demonstrate how borrowed money can be spent, deposited, and continue circulating through the banking system.',
            'Money continues moving through the economy as people borrow, spend, earn, and deposit.'
          ]
        },

        {
          title: 'Part 3: Why Interest Exists',
          content: [
            'Interest is the price of borrowing money.',
            'Lenders take the risk that borrowers may not repay what they borrowed.',
            'Interest compensates lenders for providing money and taking on risk.',
            'Discussion Question: What happens when someone borrows money but does not pay it back?'
          ]
        },

        {
          title: 'Part 4: Why Credit Matters',
          content: [
            'Credit represents trust within the financial system.',
            'Access to credit can help people start businesses, buy homes, invest in education, and purchase equipment for work.',
            'Credit can also work against someone when debt is mismanaged.',
            'Key Message: Credit can open doors, but it can also close them.'
          ]
        },

        {
          title: 'Understanding Credit Scores',
          content: [
            'A credit score is a number used to represent how likely someone is to repay borrowed money.',
            'The lesson describes five important areas: payment history, amount of debt, length of credit history, types of credit, and new credit applications.',
            'Responsible financial habits over time can help strengthen a person’s credit profile.'
          ]
        },

        {
          title: 'Class Activity: Monopoly Credit Edition',
          content: [
            'The activity uses Monopoly to simulate banks, loans, debt, interest, and financial decision-making.',
            'Participants make borrowing and spending decisions while seeing how those decisions affect their financial position.',
            'The purpose is not simply to win. The activity is designed to demonstrate how credit and debt work and why managing money carefully matters.'
          ]
        },

        {
          title: 'Debrief',
          content: [
            'Who borrowed the most money?',
            'Who played it safe?',
            'Did anyone lose property because they could not pay?',
            'What decisions helped people succeed?',
            'Final Takeaway: Understanding how money is created and how credit works is the first step toward controlling your financial future.'
          ]
        }
      ]
    },

    2: {
  number: 2,

  title: 'The Time Value of Money & Investing',

  theme:
    'Understanding why money today is worth more than money tomorrow and why investing matters.',

  coreMessage:
    'Money grows when given time. Small amounts invested consistently can grow into large amounts. Waiting makes wealth harder to build.',

  sections: [
    {
      title: 'Introduction',
      content: [
        'In the last class, we learned how money is created through lending and credit. Today we are going to talk about something just as important: time.',
        'Time can either help your money grow or work against you.',
        'Discussion Question: If you were offered $100 today or $100 three years from now, which would you choose and why?'
      ]
    },

    {
      title: 'Part 1: Opportunity Cost',
      content: [
        'Opportunity cost is about what you give up when you make one choice instead of another.',
        'Financial decisions often require balancing what you can do with money today against what that money may provide in the future.',
        'Keeping some money available can also create flexibility when opportunities arise.'
      ]
    },

    {
      title: 'Part 2: Money Can Grow Over Time',
      content: [
        'Money has the ability to grow when it is saved or invested.',
        'For example, if $100 grows by 10%, it becomes $110. If it grows another 10%, the next period of growth is based on $110 rather than only the original $100.',
        'This is called compounding: growth builds on previous growth.',
        'Key Message: Money earns money, which can then earn more money.'
      ]
    },

    {
      title: 'Inflation & Why Waiting Costs Money',
      content: [
        'Prices tend to rise over time.',
        'When prices rise but money does not grow, that money loses purchasing power.',
        'This is one reason simply holding money may not accomplish long-term financial goals.',
        'Discussion Question: What are some things that cost more today than they did in the past?'
      ]
    },

    {
      title: 'Why People Invest',
      content: [
        'Investing means putting money into something with the expectation that it will grow in value or produce income in the future.',
        'People may invest in businesses, stocks, real estate, education, and job skills.',
        'Investing is not about getting rich quickly. The lesson emphasizes giving money time to grow.',
        'Key Message: Small amounts plus time can create significant growth.'
      ]
    },

    {
      title: 'Types of Investments',
      content: [
        'Stocks represent ownership in a company and may increase or decrease in value.',
        'Bonds are similar to loans made to governments or companies in exchange for repayment and interest.',
        'Real estate involves ownership of property that may appreciate or generate rental income.',
        'Businesses can produce income and increase in value but require effort and decision-making.',
        'Skills and education can increase earning ability and create additional career opportunities.'
      ]
    },

    {
      title: 'Understanding Risk & Diversification',
      content: [
        'Risk means uncertainty. Different investments involve different levels of uncertainty and potential reward.',
        'Some investments may grow steadily, while others may change quickly or lose value.',
        'Diversification means using a mix of investments rather than relying on only one.',
        'Balancing different investments can reduce the impact of one poor-performing investment.'
      ]
    },

    {
      title: 'Activity: The Investment Race',
      content: [
        'Each team begins with the same amount of money and each round represents one year.',
        'Teams choose among safe, moderate, and risky investment options while deciding how much cash to keep available.',
        'Economic events can force teams to adjust their strategies.',
        'The goal is to finish with a strong financial position while understanding the relationship between risk, patience, and decision-making.'
      ]
    },

    {
      title: 'Class 2 Debrief',
      content: [
        'Which strategy worked best?',
        'Did anyone take large risks?',
        'Did anyone balance safety and risk?',
        'How did unexpected events affect your decisions?',
        'Final Takeaway: Investing is about making consistent decisions over time.'
      ]
    }
  ]
},

3: {
  number: 3,

  title: 'Asset Management & Wealth Building',

  theme:
    'Understanding how wealth is built through ownership, financial habits, and decision-making.',

  coreMessage:
    'Wealth is not determined by income alone. Wealth is built by owning assets and managing debt responsibly.',

  sections: [
    {
      title: 'Introduction',
      content: [
        'Class 1 introduced credit. Class 2 explained how time can help money grow. Class 3 brings those ideas together to examine wealth building.',
        'Income is important, but income alone does not create wealth. Ownership plays an important role.',
        'Discussion Question: What do you think wealthy people own?'
      ]
    },

    {
      title: 'Part 1: Assets vs. Liabilities',
      content: [
        'Assets are things that help you financially.',
        'Liabilities are things that cost you financially.',
        'Examples of assets in the lesson include education, job skills, savings, business tools, and investments.',
        'Examples of liabilities include high-interest debt, unnecessary expenses, and items that lose value quickly.',
        'Discussion Question: Can something be both an asset and a liability depending on how it is used?'
      ]
    },

    {
      title: 'Part 2: Wealth Is Built Gradually',
      content: [
        'Wealth usually does not happen quickly.',
        'Consistent habits can include saving regularly, learning valuable skills, avoiding unnecessary debt, investing consistently, and improving decision-making.',
        'Key Message: Wealth is often the result of repeated good decisions.',
        'Small decisions repeated over time can produce large results.'
      ]
    },

    {
      title: 'Part 3: Using Credit to Build Assets',
      content: [
        'Credit can be used strategically to help build assets.',
        'Examples include borrowing money to start a business, learn a skill, or purchase equipment for work.',
        'Credit can become dangerous when it is used primarily for consumption that does not improve a person’s financial position.',
        'Key Message: Credit should be used carefully and strategically.'
      ]
    },

    {
      title: 'Activity: My Wealth Blueprint',
      content: [
        'Participants create a simple plan for building financial stability over time.',
        'The activity asks participants to consider skills they would like to build, work that interests them, and financial habits they want to improve.',
        'The focus is not how much money someone has today. The focus is the direction of their future financial decisions.'
      ]
    },

    {
      title: 'Class 3 Debrief',
      content: [
        'Identify one asset you would like to build.',
        'Identify one financial habit you would like to improve.',
        'Key Message: Wealth begins with decisions, not income level.',
        'Final Takeaway: Understanding credit, time, and assets gives you more control over your financial opportunities.'
      ]
    }
  ]
}
  };

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const lessonNumber = Number(
      this.route.snapshot.paramMap.get('number')
    );

    this.lesson =
      this.lessons[lessonNumber] ?? null;
  }
}