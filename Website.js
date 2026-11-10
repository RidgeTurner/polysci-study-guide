import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  BookOpen, 
  ListFilter,
  BarChart2,
  RefreshCw,
  Check,
  X,
  HelpCircle,
  Flag,
  Sparkles
} from 'lucide-react';

// Raw Master Question Data (125 items exact from POLS 101 tests)
const MASTER_QUESTIONS = [
  // UNIT 1: Foundations (1-15)
  {
    id: 1,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "Political Science is",
    options: [
      "the systematic study of only the policies of governments",
      "the study of the use of science in the government",
      "the study of science through the eyes of politicians",
      "the systematic study of government and politics"
    ],
    correctAnswer: "the systematic study of government and politics"
  },
  {
    id: 2,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "The biggest barrier to political thinking is",
    options: [
      "a lack of effort on the part of women",
      "a lack of effort by those who don’t listen to the news",
      "a lack of effort by the working class",
      "a lack of effort on the part of Americans"
    ],
    correctAnswer: "a lack of effort on the part of Americans"
  },
  {
    id: 3,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "What is the foundation of American identity?",
    options: [
      "Racial identities",
      "American beliefs/ideals",
      "Ethnic identities",
      "Familial identities"
    ],
    correctAnswer: "American beliefs/ideals"
  },
  {
    id: 4,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "The widely shared and deep-seated beliefs of its people about politics is",
    options: [
      "politics",
      "political ideals",
      "political belief",
      "political culture"
    ],
    correctAnswer: "political culture"
  },
  {
    id: 5,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "America’s cultural beliefs are idealistic because",
    options: [
      "there is no guarantee that what we seek is what we will have",
      "they are basic ideals",
      "they are based on guaranteed ideals",
      "they are part of an ingrained culture"
    ],
    correctAnswer: "there is no guarantee that what we seek is what we will have"
  },
  {
    id: 6,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "The idea that there are lawful restrictions on the government’s power in a constitutional document is",
    options: [
      "constitutional documentation",
      "majoritarianism",
      "constitutional monarchy",
      "constitutionalism"
    ],
    correctAnswer: "constitutionalism"
  },
  {
    id: 7,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "Based on the reading and discussion, why is income redistribution from one income class to a lower income class problematic in America?",
    options: [
      "It creates anger in America",
      "It creates too high of taxes",
      "It creates class envy",
      "It clashes with the core values of determining one’s own economic future"
    ],
    correctAnswer: "It clashes with the core values of determining one’s own economic future"
  },
  {
    id: 8,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "In addition to an independent judiciary and a firm attachment to private property rights, what has helped make legal action a means of asserting rights and protecting interests for the people?",
    options: [
      "The Supreme Court",
      "The Declaration of Independence",
      "The Bill of Rights",
      "The President"
    ],
    correctAnswer: "The Bill of Rights"
  },
  {
    id: 9,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "John Stuart Mill argued that a person's opinion is strongest when:",
    options: [
      "Most citizens agree with it",
      "It survives examination against opposing views",
      "It reflects personal values",
      "It is emotionally compelling"
    ],
    correctAnswer: "It survives examination against opposing views"
  },
  {
    id: 10,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "The chapter suggests that \"echo chambers\" contribute to:",
    options: [
      "More balanced political judgment",
      "Reduced polarization",
      "Greater exposure to opposing views",
      "Increased misinformation"
    ],
    correctAnswer: "Increased misinformation"
  },
  {
    id: 11,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "Which document most clearly articulated the principle that governments derive powers from the consent of the governed?",
    options: [
      "Articles of Confederation",
      "Bill of Rights",
      "Declaration of Independence",
      "Federalist Papers"
    ],
    correctAnswer: "Declaration of Independence"
  },
  {
    id: 12,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "Individualism emphasizes:",
    options: [
      "Collective ownership",
      "Self-sufficiency and initiative",
      "Government dependency",
      "Class solidarity"
    ],
    correctAnswer: "Self-sufficiency and initiative"
  },
  {
    id: 13,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "The chapter presents slavery primarily as evidence of:",
    options: [
      "Economic modernization",
      "A contradiction between ideals and reality",
      "Federalism",
      "Constitutionalism"
    ],
    correctAnswer: "A contradiction between ideals and reality"
  },
  {
    id: 14,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "Harold Lasswell defined politics as:",
    options: [
      "Rule of law",
      "Collective action",
      "Protection of rights",
      "Who gets what, when, and how"
    ],
    correctAnswer: "Who gets what, when, and how"
  },
  {
    id: 15,
    unitId: 1,
    unitName: "Foundations of American Government",
    question: "Majoritarianism occurs when:",
    options: [
      "Officials respond to majority preferences",
      "Interest groups dominate policy",
      "Judicial rulings determine policy",
      "Corporations control politics"
    ],
    correctAnswer: "Officials respond to majority preferences"
  },

  // UNIT 2: The Constitution & Founding (16-30)
  {
    id: 16,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "The Colonial Charters granted",
    options: [
      "voting rights to women",
      "freedom to white men",
      "rights of an Englishman",
      "freedom to all"
    ],
    correctAnswer: "rights of an Englishman"
  },
  {
    id: 17,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "The Revolutionary War occurred primarily because colonists were opposed to",
    options: [
      "Britain’s military policies",
      "Britain’s approach to shipping",
      "Britain’s policies on Native Americans",
      "Britain’s taxation practices"
    ],
    correctAnswer: "Britain’s taxation practices"
  },
  {
    id: 18,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "The first Continental Congress responded to the following concerns:",
    options: [
      "all of the above",
      "trial by local juries",
      "taxation",
      "military occupation"
    ],
    correctAnswer: "all of the above"
  },
  {
    id: 19,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "Locke’s ideas about natural rights included the following:",
    options: [
      "Life, liberty and economic stability",
      "Life, liberty and property",
      "Life, liberty and the pursuit of happiness",
      "Life, liberty and happiness"
    ],
    correctAnswer: "Life, liberty and property"
  },
  {
    id: 20,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "A constitution is",
    options: [
      "a document that says what Congress will do",
      "a fundamental law/framework that defines how the government will operate and will be organized",
      "a fundamental law that defines foreign policy",
      "a document that is a regular law"
    ],
    correctAnswer: "a fundamental law/framework that defines how the government will operate and will be organized"
  },
  {
    id: 21,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "The system that prevents government institutions/branches from acting without the support of other government institutions/branches or to have their actions stopped is known as",
    options: [
      "shared powers",
      "checks and balances",
      "separation of powers",
      "removal powers"
    ],
    correctAnswer: "checks and balances"
  },
  {
    id: 22,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "Those who support the ratification of the Constitution were known as",
    options: [
      "constitutionalists",
      "Federalists",
      "regulators",
      "Anti-Federalists"
    ],
    correctAnswer: "Federalists"
  },
  {
    id: 23,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "Progressive reformers viewed primary elections as a way to",
    options: [
      "Eliminate political parties",
      "Give voters greater influence over nominations",
      "Increase party boss control",
      "Expand judicial review"
    ],
    correctAnswer: "Give voters greater influence over nominations"
  },
  {
    id: 24,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "\"Tyranny of the majority\" refers to",
    options: [
      "Elected judges dominating politics",
      "Federal power over states",
      "Popular majorities violating minority rights",
      "Minority rule over government"
    ],
    correctAnswer: "Popular majorities violating minority rights"
  },
  {
    id: 25,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "Congress's ability to override presidential vetoes illustrates",
    options: [
      "Federalism",
      "Judicial review",
      "Legislative checks on executive authority",
      "Popular sovereignty"
    ],
    correctAnswer: "Legislative checks on executive authority"
  },
  {
    id: 26,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "The delegates at Philadelphia exceeded their formal instructions by",
    options: [
      "Drafting a new constitution rather than revising the Articles",
      "Creating a monarchy",
      "Abolishing state governments",
      "Refusing to discuss commerce"
    ],
    correctAnswer: "Drafting a new constitution rather than revising the Articles"
  },
  {
    id: 27,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "According to the chapter, Shays' Rebellion influenced constitutional change because it:",
    options: [
      "Revealed the inability of existing institutions to maintain order",
      "Ended slavery debates",
      "Demonstrated the strength of Congress",
      "Created political parties"
    ],
    correctAnswer: "Revealed the inability of existing institutions to maintain order"
  },
  {
    id: 28,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "The concept of inalienable rights was used by revolutionary leaders primarily to:",
    options: [
      "Justify state supremacy",
      "Legitimize resistance to tyrannical government",
      "Reduce voting rights",
      "Oppose representative assemblies"
    ],
    correctAnswer: "Legitimize resistance to tyrannical government"
  },
  {
    id: 29,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "Which weakness of the Articles of Confederation most directly hindered development of a national economy?",
    options: [
      "Inability to regulate interstate commerce",
      "Lack of a presidency",
      "Lack of local governments",
      "Lack of judicial review"
    ],
    correctAnswer: "Inability to regulate interstate commerce"
  },
  {
    id: 30,
    unitId: 2,
    unitName: "The Constitution & Founding",
    question: "Why did many Americans support weak national authority after independence?",
    options: [
      "They sought direct democracy only",
      "They opposed commerce regulation",
      "They feared reproducing monarchical power",
      "They rejected representative institutions"
    ],
    correctAnswer: "They feared reproducing monarchical power"
  },

  // UNIT 3: Federalism (31-46)
  {
    id: 31,
    unitId: 3,
    unitName: "Federalism",
    question: "A government where the power is divided between a central government and regional governments, where the regional governments serve as administrative units of the national government, having no real power of their own is known as a",
    options: [
      "federal-unitary government",
      "unitary government",
      "federal government",
      "constitutional government"
    ],
    correctAnswer: "unitary government"
  },
  {
    id: 32,
    unitId: 3,
    unitName: "Federalism",
    question: "The Dred Scott case addressed which issue?",
    options: [
      "Slave Ownership",
      "Citizenship of African Americans",
      "Slavery",
      "The right to vote for African Americans"
    ],
    correctAnswer: "Citizenship of African Americans"
  },
  {
    id: 33,
    unitId: 3,
    unitName: "Federalism",
    question: "The ruling that Congress had the power to create national banks based on the Necessary and Proper Clause came from what court case?",
    options: [
      "McCulloch v Maryland",
      "Marbury v Madison",
      "Texas v Johnson",
      "Gibbons v Ogden"
    ],
    correctAnswer: "McCulloch v Maryland"
  },
  {
    id: 34,
    unitId: 3,
    unitName: "Federalism",
    question: "Under the 10th Amendment rights are _______________________ for the states and the people.",
    options: [
      "Reviewed",
      "Delegated",
      "Reserved",
      "Reversed"
    ],
    correctAnswer: "Reserved"
  },
  {
    id: 35,
    unitId: 3,
    unitName: "Federalism",
    question: "McCulloch v Maryland is a landmark court case that addressed which of the following issues?",
    options: [
      "Inherent Powers of Congress",
      "Implied Powers of the President",
      "Implied Powers of Congress",
      "Implied Powers of the Supreme Court"
    ],
    correctAnswer: "Implied Powers of Congress"
  },
  {
    id: 36,
    unitId: 3,
    unitName: "Federalism",
    question: "Article VI houses what information in the Constitution?",
    options: [
      "The Supremacy Clause",
      "The ratification clause",
      "Congressional powers",
      "The amendment process"
    ],
    correctAnswer: "The Supremacy Clause"
  },
  {
    id: 37,
    unitId: 3,
    unitName: "Federalism",
    question: "The section of the Constitution that states that it is the law of the land is known as the",
    options: [
      "National Supremacy Law",
      "Supreme Court Clause",
      "Law of the Land Clause",
      "Supremacy Clause"
    ],
    correctAnswer: "Supremacy Clause"
  },
  {
    id: 38,
    unitId: 3,
    unitName: "Federalism",
    question: "Enumerated powers in the Constitution are powers that are",
    options: [
      "clearly labeled by founding father",
      "clearly numbered for identification",
      "clearly stated or spelled out",
      "reasonably suggested"
    ],
    correctAnswer: "clearly stated or spelled out"
  },
  {
    id: 39,
    unitId: 3,
    unitName: "Federalism",
    question: "Madison expressed his concerns regarding factions and the danger of the tyranny of the majority in what Federalist Paper?",
    options: [
      "No. 51",
      "No. 10",
      "No. 78",
      "No. 84"
    ],
    correctAnswer: "No. 10"
  },
  {
    id: 40,
    unitId: 3,
    unitName: "Federalism",
    question: "The passage of the 14th amendment nullified which court case by defining citizenship?",
    options: [
      "Plessy v. Ferguson",
      "Lopez v. US",
      "Dred Scott",
      "Brown v. Board of Education"
    ],
    correctAnswer: "Dred Scott"
  },
  {
    id: 41,
    unitId: 3,
    unitName: "Federalism",
    question: "The Separate but Equal Doctrine emphasized what idea?",
    options: [
      "Separation and equality of the branches which enhanced federalism",
      "The national and state governments in devolution",
      "If considered equal, separate facilities for the purpose of segregation",
      "Federalism which separated the power between the national government and the states"
    ],
    correctAnswer: "If considered equal, separate facilities for the purpose of segregation"
  },
  {
    id: 42,
    unitId: 3,
    unitName: "Federalism",
    question: "States wishing to disregard federal laws invoked ______________.",
    options: [
      "The Marshall Doctrine",
      "The Madison Doctrine",
      "Rebellion",
      "Nullification"
    ],
    correctAnswer: "Nullification"
  },
  {
    id: 43,
    unitId: 3,
    unitName: "Federalism",
    question: "Implied powers in the Constitution are powers that are",
    options: [
      "clearly stated or spelled out",
      "reasonably suggested",
      "clearly labeled by founding father",
      "clearly numbered for identification"
    ],
    correctAnswer: "reasonably suggested"
  },
  {
    id: 44,
    unitId: 3,
    unitName: "Federalism",
    question: "Another name for the Necessary and Proper Clause is:",
    options: [
      "The Expansion Clause",
      "The Extension Clause",
      "The Elastic Clause",
      "The Congressional Power Clause"
    ],
    correctAnswer: "The Elastic Clause"
  },
  {
    id: 45,
    unitId: 3,
    unitName: "Federalism",
    question: "A government where the power is divided between the central government and regional governments, with each having their own distinct powers is known as a",
    options: [
      "constitutional government",
      "unitary government",
      "federal-unitary government",
      "federal government"
    ],
    correctAnswer: "federal government"
  },
  {
    id: 46,
    unitId: 3,
    unitName: "Federalism",
    question: "The court case that the “Separate but Equal” doctrine came out of was",
    options: [
      "Lopez v. US",
      "Plessy v. Ferguson",
      "Dred Scott",
      "Brown v. Board of Education"
    ],
    correctAnswer: "Plessy v. Ferguson"
  },

  // UNIT 4: Civil Liberties (47-65)
  {
    id: 47,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Specific individual rights like freedom of speech are defined as",
    options: [
      "civil liberties",
      "essential rights",
      "natural rights",
      "civil rights"
    ],
    correctAnswer: "civil liberties"
  },
  {
    id: 48,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The process by which certain of the rights contained in the Bill of Rights become applicable through the Fourteenth Amendment to actions by the state governments is known as",
    options: [
      "selective legal effect",
      "selective incorporation",
      "selective removal",
      "selective reinforcement"
    ],
    correctAnswer: "selective incorporation"
  },
  {
    id: 49,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The right of individual Americans to hold and communicate thoughts of their choosing is known as",
    options: [
      "freedom of expression",
      "freedom of religious exercise",
      "freedom of religion",
      "freedom of legal counsel"
    ],
    correctAnswer: "freedom of expression"
  },
  {
    id: 50,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Government prohibition of speech or publication before it occurs is known as",
    options: [
      "prior restraint",
      "prior conviction",
      "prior publication",
      "prior knowledge"
    ],
    correctAnswer: "prior restraint"
  },
  {
    id: 51,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Roe v. Wade was a court case that revolved around what issue?",
    options: [
      "Right to secrecy",
      "Right to a fair trial",
      "Theft",
      "Abortion"
    ],
    correctAnswer: "Abortion"
  },
  {
    id: 52,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The right to privacy was first recognized in:",
    options: [
      "Roe v. Wade",
      "Lawrence v. Texas",
      "Griswold v. Connecticut",
      "Gideon v. Wainwright"
    ],
    correctAnswer: "Griswold v. Connecticut"
  },
  {
    id: 53,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The exclusionary rule prevents courts from using:",
    options: [
      "Testimony from police",
      "Expert witnesses",
      "Evidence obtained legally",
      "Evidence obtained unconstitutionally"
    ],
    correctAnswer: "Evidence obtained unconstitutionally"
  },
  {
    id: 54,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The Lemon test requires a policy to have:",
    options: [
      "A political purpose",
      "A commercial purpose",
      "A religious purpose",
      "A nonreligious purpose"
    ],
    correctAnswer: "A nonreligious purpose"
  },
  {
    id: 55,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Libel involves:",
    options: [
      "Symbolic actions",
      "Written falsehoods",
      "Spoken falsehoods",
      "Religious expression"
    ],
    correctAnswer: "Written falsehoods"
  },
  {
    id: 56,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Which case prohibited prior restraint on the press in the Pentagon Papers dispute?",
    options: [
      "Miranda v. Arizona",
      "New York Times v. United States",
      "Pentagon v. New York Times",
      "Engel v. Vitale"
    ],
    correctAnswer: "New York Times v. United States"
  },
  {
    id: 57,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Which case addressed flag burning?",
    options: [
      "The Peace Coalition v. Vietnam Veterans of America",
      "American Legion v. New York Times",
      "Texas v. Johnson",
      "Texas v. Eichman"
    ],
    correctAnswer: "Texas v. Johnson"
  },
  {
    id: 58,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Which case ruled that hate speech is protected unless it incites imminent lawless action?",
    options: [
      "Schenck v. United States",
      "Brandenburg v. Ohio",
      "Texas v. Johnson",
      "Gitlow v. New York"
    ],
    correctAnswer: "Brandenburg v. Ohio"
  },
  {
    id: 59,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Select the prongs of the Lemon Test:",
    options: [
      "Government aid should: be secular, endorse religion, allow for government entanglement",
      "Government aid should: not be secular, neither inhibit nor endorse religion, avoid excessive entanglement",
      "Government aid should: be in full support of religious schools, allow for endorsement of religion, be unconcerned about entanglement",
      "Government aid should: be secular, neither inhibit nor endorse religion, avoid excessive entanglement"
    ],
    correctAnswer: "Government aid should: be secular, neither inhibit nor endorse religion, avoid excessive entanglement"
  },
  {
    id: 60,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The right to counsel in state felony cases was guaranteed in:",
    options: [
      "Mapp v. Ohio",
      "Gitlow v. New York",
      "Miranda v. Arizona",
      "Gideon v. Wainwright"
    ],
    correctAnswer: "Gideon v. Wainwright"
  },
  {
    id: 61,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The Brandenburg Test involved the focus on:",
    options: [
      "Imminent and flagrant use of libel",
      "The Clear and Present Danger Test",
      "Imminent and lawless action",
      "The Lemon Test"
    ],
    correctAnswer: "Imminent and lawless action"
  },
  {
    id: 62,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "The exclusionary rule was first applied to the states in:",
    options: [
      "Mapp v. Ohio",
      "Miranda v. Arizona",
      "Gideon v. Wainwright",
      "Weeks v. United States B."
    ],
    correctAnswer: "Mapp v. Ohio"
  },
  {
    id: 63,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Selective incorporation is best described as:",
    options: [
      "Replacing the Bill of Rights with state constitutions",
      "Applying all federal rights to states automatically",
      "Allowing states to choose which rights to follow",
      "Applying specific rights to states through the Fourteenth Amendment"
    ],
    correctAnswer: "Applying specific rights to states through the Fourteenth Amendment"
  },
  {
    id: 64,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "Select the two types of due process:",
    options: [
      "Substantive and preventative",
      "Declarative and substantive",
      "Substantive and procedural",
      "Preventative and declarative"
    ],
    correctAnswer: "Substantive and procedural"
  },
  {
    id: 65,
    unitId: 4,
    unitName: "Civil Liberties",
    question: "What concept is defined as: Equal treatment under the law to ensure that no person is deprived of their right to life, liberty and property.",
    options: [
      "Incorporation of Financial Equality Doctrine",
      "Equal Protection Doctrine",
      "The Declaration of Independence",
      "Due Process"
    ],
    correctAnswer: "Due Process"
  },

  // UNIT 5: Civil Rights (66-85)
  {
    id: 66,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Refers to the right of every person to equal protection under the laws and equal access to society’s opportunities and public facilities.",
    options: [
      "affirmative action",
      "quotas",
      "civil rights",
      "reverse discriminiation"
    ],
    correctAnswer: "civil rights"
  },
  {
    id: 67,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Deliberate efforts to provide full and equal opportunities for traditionally disadvantaged groups is known as",
    options: [
      "quotas",
      "affirmative action",
      "reverse discriminiation",
      "civil rights"
    ],
    correctAnswer: "affirmative action"
  },
  {
    id: 68,
    unitId: 5,
    unitName: "Civil Rights",
    question: "______________ discrimination is discrimination that is based on law",
    options: [
      "de facto",
      "legality",
      "de legalle",
      "de jure"
    ],
    correctAnswer: "de jure"
  },
  {
    id: 69,
    unitId: 5,
    unitName: "Civil Rights",
    question: "______________ discrimination is discrimination that occurs in social interactions.",
    options: [
      "de facto",
      "de legalle",
      "legality",
      "de jure"
    ],
    correctAnswer: "de facto"
  },
  {
    id: 70,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Native Americans gained citizenship when the _____________",
    options: [
      "Native Americans occupied land in ND",
      "Regained lost lands.",
      "Native Americans marched on DC",
      "Indian Citizenship Act was passed"
    ],
    correctAnswer: "Indian Citizenship Act was passed"
  },
  {
    id: 71,
    unitId: 5,
    unitName: "Civil Rights",
    question: "__________ made literacy tests illegal",
    options: [
      "1968 Civil Rights Act",
      "1964 Civil Rights Act",
      "1957 Voting Act",
      "1965 Voting rights Act"
    ],
    correctAnswer: "1965 Voting rights Act"
  },
  {
    id: 72,
    unitId: 5,
    unitName: "Civil Rights",
    question: "What amendment gave women the right to vote",
    options: [
      "16th Amendment",
      "20th Amendment",
      "19th Amendment",
      "15th Amendment"
    ],
    correctAnswer: "19th Amendment"
  },
  {
    id: 73,
    unitId: 5,
    unitName: "Civil Rights",
    question: "A leader in the Hispanic farm workers movement",
    options: [
      "Martin Luther King",
      "Hugo Chavez",
      "John F Kennedy",
      "Ceaser Chavez"
    ],
    correctAnswer: "Ceaser Chavez"
  },
  {
    id: 74,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Loving v. Virginia was a court case regarding",
    options: [
      "literacy tests",
      "interracial marriage",
      "interfaith marriage",
      "affirmative action"
    ],
    correctAnswer: "interracial marriage"
  },
  {
    id: 75,
    unitId: 5,
    unitName: "Civil Rights",
    question: "The central constitutional problem identified by the Court in Brown v. Board of Education was that segregation",
    options: [
      "violated state sovereignty",
      "restricted interstate commerce",
      "created unequal educational opportunities despite claims of equality",
      "exceeded congressional authority"
    ],
    correctAnswer: "created unequal educational opportunities despite claims of equality"
  },
  {
    id: 76,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Which Judicial Test regarding discriminatory laws is the least strict?",
    options: [
      "Economic Scrutiny",
      "Reasonable basis review",
      "Intermediate Scrutiny",
      "Strict Scrutiny"
    ],
    correctAnswer: "Reasonable basis review"
  },
  {
    id: 77,
    unitId: 5,
    unitName: "Civil Rights",
    question: "The real purpose of literacy tests were to",
    options: [
      "Limit voters of racial minority from voting",
      "Determine the literacy of voters",
      "Alert states to voters attempting to vote who could not read",
      "Determine reading level"
    ],
    correctAnswer: "Limit voters of racial minority from voting"
  },
  {
    id: 78,
    unitId: 5,
    unitName: "Civil Rights",
    question: "The Supreme Court's holding in Brown represented a direct rejection of the principle established in",
    options: [
      "Marbury v. Madison",
      "McCulloch v. Maryland",
      "Plessy v. Ferguson",
      "Brown v. Board of Education"
    ],
    correctAnswer: "Plessy v. Ferguson"
  },
  {
    id: 79,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Strict scrutiny requires a governmental policy to be",
    options: [
      "narrowly tailored to achieve a compelling governmental interest",
      "approved by Congress",
      "supported by public opinion",
      "economically efficient"
    ],
    correctAnswer: "narrowly tailored to achieve a compelling governmental interest"
  },
  {
    id: 80,
    unitId: 5,
    unitName: "Civil Rights",
    question: "The Voting Rights Act of 1965 was designed to address barriers to",
    options: [
      "political participation",
      "military service",
      "educational access",
      "commerce"
    ],
    correctAnswer: "political participation"
  },
  {
    id: 81,
    unitId: 5,
    unitName: "Civil Rights",
    question: "The Equal Rights Amendment was intended to provide explicit constitutional protection against discrimination based on",
    options: [
      "gender",
      "religion",
      "disability",
      "age"
    ],
    correctAnswer: "gender"
  },
  {
    id: 82,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Cesar Chavez is most closely associated with efforts to improve",
    options: [
      "farm-worker rights and labor conditions",
      "school desegregation",
      "voting access for women",
      "disability access"
    ],
    correctAnswer: "farm-worker rights and labor conditions"
  },
  {
    id: 83,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Brown's long-term impact is significant because it",
    options: [
      "expanded educational segregation",
      "challenged legal foundations of racial discrimination",
      "eliminated state governments",
      "reduced federal authority"
    ],
    correctAnswer: "challenged legal foundations of racial discrimination"
  },
  {
    id: 84,
    unitId: 5,
    unitName: "Civil Rights",
    question: "Many civil-rights conflicts arise because citizens disagree about",
    options: [
      "the meaning of fairness and equality",
      "legislative procedures",
      "federal court locations",
      "election schedules"
    ],
    correctAnswer: "the meaning of fairness and equality"
  },
  {
    id: 85,
    unitId: 5,
    unitName: "Civil Rights",
    question: "The persistence of civil-rights debates demonstrates that",
    options: [
      "constitutional law never changes",
      "judicial review is unnecessary",
      "equality has already been fully achieved",
      "constitutional interpretation evolves over time"
    ],
    correctAnswer: "constitutional interpretation evolves over time"
  },

  // UNIT 6: Public Opinion (86-105)
  {
    id: 86,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Politically relevant opinions held by ordinary citizens that they express openly",
    options: [
      "Foreign policy socialization",
      "Political Socialization",
      "Public opinion",
      "Public Socialization"
    ],
    correctAnswer: "Public opinion"
  },
  {
    id: 87,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Primary agents of political socialization are distinguished by:",
    options: [
      "Their legal authority.",
      "Their direct involvement in elections.",
      "Their influence during early development.",
      "Their control of media outlets."
    ],
    correctAnswer: "Their influence during early development."
  },
  {
    id: 88,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "An economic liberal would agree with",
    options: [
      "government should leave the distribution of economic benefits to the workings of the free market or to individuals to distribute their own wealth",
      "would use government to promote traditional values",
      "would leave life choices to the individual",
      "government should use its power to help the economically disadvantaged."
    ],
    correctAnswer: "government should use its power to help the economically disadvantaged."
  },
  {
    id: 89,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Religious institutions influence politics primarily by:",
    options: [
      "Administering elections.",
      "Writing legislation.",
      "Providing military leadership.",
      "Shaping moral values and political attitudes."
    ],
    correctAnswer: "Shaping moral values and political attitudes."
  },
  {
    id: 90,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Which function of education is most relevant to democratic citizenship?",
    options: [
      "Endorsing political candidates",
      "Limiting political debate",
      "Teaching campaign finance law",
      "Transmitting civic norms and political knowledge"
    ],
    correctAnswer: "Transmitting civic norms and political knowledge"
  },
  {
    id: 91,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Extraordinary events often have lasting effects on public opinion because:",
    options: [
      "They eliminate ideological conflict.",
      "They affect only elected officials.",
      "They are quickly forgotten.",
      "They alter existing political attitudes and priorities."
    ],
    correctAnswer: "They alter existing political attitudes and priorities."
  },
  {
    id: 92,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "What is identified in your reading as a problem with polls?",
    options: [
      "People may not understand the poll",
      "They are often given at poor times",
      "People may lie during the poll",
      "People may not take them"
    ],
    correctAnswer: "People may lie during the poll"
  },
  {
    id: 93,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Public opinion frequently contains contradictions because:",
    options: [
      "Citizens hold competing values simultaneously.",
      "Political beliefs must remain consistent.",
      "Citizens reject all information.",
      "Polling is unnecessary."
    ],
    correctAnswer: "Citizens hold competing values simultaneously."
  },
  {
    id: 94,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Media influence is significant because:",
    options: [
      "Media determines election outcomes.",
      "Most citizens experience politics indirectly through media coverage.",
      "Media replace government institutions.",
      "Citizens personally observe most national events."
    ],
    correctAnswer: "Most citizens experience politics indirectly through media coverage."
  },
  {
    id: 95,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Crosscutting groups has what effect on peoples views?",
    options: [
      "They may be more closed off to views as they feel threatened.",
      "They may invite others to crosscutting groups",
      "It may give them pluralistic views",
      "It may cause them to change their views as they are exposed to new ideas."
    ],
    correctAnswer: "It may cause them to change their views as they are exposed to new ideas."
  },
  {
    id: 96,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "General belief about the role and purpose of government is",
    options: [
      "Ideology",
      "Government Ideology Theory",
      "Government Role Theory",
      "Government Socialization Theory"
    ],
    correctAnswer: "Ideology"
  },
  {
    id: 97,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "A social conservative would agree with",
    options: [
      "would use government to promote traditional values",
      "would leave life choices to the individual",
      "government should leave the distribution of economic benefits to the workings of the free market or to individuals to distribute their own wealth",
      "government should use its power to help the economically disadvantaged."
    ],
    correctAnswer: "would use government to promote traditional values"
  },
  {
    id: 98,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "The religious right is identified in your book as what group of people?",
    options: [
      "All church goers",
      "Born Again Christians",
      "Catholics",
      "Jews"
    ],
    correctAnswer: "Born Again Christians"
  },
  {
    id: 99,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "A social liberal would agree with",
    options: [
      "government should leave the distribution of economic benefits to the workings of the free market or to individuals to distribute their own wealth",
      "would leave life choices to the individual",
      "government should use its power to help the economically disadvantaged.",
      "would use government to promote traditional values"
    ],
    correctAnswer: "would leave life choices to the individual"
  },
  {
    id: 100,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Political socialization is important in political science because it explains:",
    options: [
      "The legal process for elections.",
      "The behavior of political candidates only.",
      "The process through which people acquire political beliefs.",
      "The structure of government institutions."
    ],
    correctAnswer: "The process through which people acquire political beliefs."
  },
  {
    id: 101,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Political ideology serves as:",
    options: [
      "A system for organizing political beliefs.",
      "A legal requirement for voting.",
      "A campaign finance tool.",
      "A substitute for public opinion."
    ],
    correctAnswer: "A system for organizing political beliefs."
  },
  {
    id: 102,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Secondary agents of socialization become particularly important because:",
    options: [
      "They eliminate ideological conflict.",
      "They expose individuals to perspectives beyond the family.",
      "They replace family influence entirely.",
      "They are controlled by government."
    ],
    correctAnswer: "They expose individuals to perspectives beyond the family."
  },
  {
    id: 103,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "An economic conservative would agree with",
    options: [
      "would leave life choices to the individual",
      "government should use its power to help the economically disadvantaged.",
      "would use government to promote traditional values",
      "government should leave the distribution of economic benefits to the workings of the free market or to individuals to distribute their own wealth"
    ],
    correctAnswer: "government should leave the distribution of economic benefits to the workings of the free market or to individuals to distribute their own wealth"
  },
  {
    id: 104,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Party identification is best understood as:",
    options: [
      "An ideological position only.",
      "Legal registration status.",
      "Membership in a campaign organization.",
      "A long-term psychological attachment to a political party."
    ],
    correctAnswer: "A long-term psychological attachment to a political party."
  },
  {
    id: 105,
    unitId: 6,
    unitName: "Public Opinion & Socialization",
    question: "Why do policymakers monitor public opinion?",
    options: [
      "Courts demand polling results.",
      "Public opinion determines judicial rulings.",
      "Public support affects political survival.",
      "It is constitutionally required daily."
    ],
    correctAnswer: "Public support affects political survival."
  },

  // UNIT 7: Political Participation (106-125)
  {
    id: 106,
    unitId: 7,
    unitName: "Political Participation",
    question: "Registration is",
    options: [
      "a voter provides information according to state law so that their names can appear on the official list of eligible voters.",
      "the sum of face-to-face interactions",
      "a belief that a person should participate in public affairs",
      "a way for concerned citizens to actively express their position or opposition to government policy"
    ],
    correctAnswer: "a voter provides information according to state law so that their names can appear on the official list of eligible voters."
  },
  {
    id: 107,
    unitId: 7,
    unitName: "Political Participation",
    question: "Social Capital is",
    options: [
      "a way for concerned citizens to actively express their position or opposition to government policy",
      "a belief that a person should participate in public affairs",
      "a voter provides information according to state law so that their names can appear on the official list of eligible voters.",
      "the sum of face-to-face interactions"
    ],
    correctAnswer: "the sum of face-to-face interactions"
  },
  {
    id: 108,
    unitId: 7,
    unitName: "Political Participation",
    question: "Civic Duty is",
    options: [
      "a belief that a person should participate in public affairs",
      "a way for concerned citizens to actively express their position or opposition to government policy",
      "a voter provides information according to state law so that their names can appear on the official list of eligible voters.",
      "the sum of face-to-face interactions"
    ],
    correctAnswer: "a belief that a person should participate in public affairs"
  },
  {
    id: 109,
    unitId: 7,
    unitName: "Political Participation",
    question: "Political movements are",
    options: [
      "a belief that a person should participate in public affairs",
      "the sum of face-to-face interactions",
      "a way for concerned citizens to actively express their position or opposition to government policy",
      "a voter provides information according to state law so that their names can appear on the official list of eligible voters."
    ],
    correctAnswer: "a way for concerned citizens to actively express their position or opposition to government policy"
  },
  {
    id: 110,
    unitId: 7,
    unitName: "Political Participation",
    question: "Individuals often are able to learn about candidates online, as well as issues. This is known as",
    options: [
      "virtual participation",
      "web presence",
      "virtual dissidence",
      "web knowledge"
    ],
    correctAnswer: "virtual participation"
  },
  {
    id: 111,
    unitId: 7,
    unitName: "Political Participation",
    question: "Low levels of civic duty or poor civic attitudes could be due to",
    options: [
      "Alienation and refusal to participate",
      "Apathy and alienation",
      "Apathy and laziness",
      "Alienation and laziness"
    ],
    correctAnswer: "Apathy and alienation"
  },
  {
    id: 112,
    unitId: 7,
    unitName: "Political Participation",
    question: "What is one reason that young adults might be less likely to vote",
    options: [
      "They may not understand the issues without parental input",
      "They are unable to understand the issues",
      "They relocate often and may have to reregister to vote at each election.",
      "They are in college"
    ],
    correctAnswer: "They relocate often and may have to reregister to vote at each election."
  },
  {
    id: 113,
    unitId: 7,
    unitName: "Political Participation",
    question: "Which scenario best demonstrates political participation?",
    options: [
      "Watching a sporting event",
      "Reading a novel at home",
      "Attending a town hall meeting to discuss local policies",
      "Completing homework"
    ],
    correctAnswer: "Attending a town hall meeting to discuss local policies"
  },
  {
    id: 114,
    unitId: 7,
    unitName: "Political Participation",
    question: "A political scientist studying voter ID laws would most likely focus on the tension between:",
    options: [
      "Security and access",
      "Liberty and federalism",
      "Congress and the courts",
      "Parties and interest groups"
    ],
    correctAnswer: "Security and access"
  },
  {
    id: 115,
    unitId: 7,
    unitName: "Political Participation",
    question: "A citizen who believes their actions can influence government demonstrates:",
    options: [
      "Political apathy",
      "Political alienation",
      "Political polarization",
      "Political efficacy"
    ],
    correctAnswer: "Political efficacy"
  },
  {
    id: 116,
    unitId: 7,
    unitName: "Political Participation",
    question: "Low voter turnout can create concerns about democratic representation because:",
    options: [
      ". Some groups' interests may be represented more than others.",
      "Congress loses authority.",
      "Political parties may disappear.",
      "Elections become unconstitutional."
    ],
    correctAnswer: ". Some groups' interests may be represented more than others."
  },
  {
    id: 117,
    unitId: 7,
    unitName: "Political Participation",
    question: "The concept of civic duty suggests that citizens vote primarily because:",
    options: [
      "Voting improves economic conditions.",
      "Participation is viewed as a responsibility of citizenship.",
      "Government benefits depend on voting.",
      "Parties require participation."
    ],
    correctAnswer: "Participation is viewed as a responsibility of citizenship."
  },
  {
    id: 118,
    unitId: 7,
    unitName: "Political Participation",
    question: "Why do many political scientists view education as one of the strongest predictors of participation?",
    options: [
      "Education eliminates political disagreement.",
      "Education determines party membership.",
      "Education automatically registers voters.",
      "Education increases political awareness and civic skills."
    ],
    correctAnswer: "Education increases political awareness and civic skills."
  },
  {
    id: 119,
    unitId: 7,
    unitName: "Political Participation",
    question: "Virtual participation differs from traditional forms of participation because it:",
    options: [
      "Eliminates political activism.",
      "Requires government employment.",
      "Occurs only during elections.",
      "Relies heavily on digital communication technologies."
    ],
    correctAnswer: "Relies heavily on digital communication technologies."
  },
  {
    id: 120,
    unitId: 7,
    unitName: "Political Participation",
    question: "Which factor is most strongly associated with lower turnout?",
    options: [
      "Strong party attachment",
      "Civic duty",
      "Political interest",
      "Political apathy"
    ],
    correctAnswer: "Political apathy"
  },
  {
    id: 121,
    unitId: 7,
    unitName: "Political Participation",
    question: "Political participation is best understood as:",
    options: [
      "Only voting in elections.",
      "Any action intended to influence government or public policy.",
      "Membership in a political party.",
      "Government employment."
    ],
    correctAnswer: "Any action intended to influence government or public policy."
  },
  {
    id: 122,
    unitId: 7,
    unitName: "Political Participation",
    question: "A citizen who donates money, volunteers for campaigns, and attends public meetings demonstrates:",
    options: [
      "Political alienation.",
      "Judicial activism.",
      "Political apathy.",
      "High political participation."
    ],
    correctAnswer: "High political participation."
  },
  {
    id: 123,
    unitId: 7,
    unitName: "Political Participation",
    question: "Which reform is most likely to increase political participation?",
    options: [
      "Expanding voter registration opportunities",
      "Restricting absentee voting",
      "Reducing polling locations",
      "Shortening voting hours"
    ],
    correctAnswer: "Expanding voter registration opportunities"
  },
  {
    id: 124,
    unitId: 7,
    unitName: "Political Participation",
    question: "Supporters of voter ID laws argue that these laws:",
    options: [
      "Increase campaign donations",
      "Prevent voter fraud",
      "Increase party competition",
      "Reduce campaign costs"
    ],
    correctAnswer: "Prevent voter fraud"
  },
  {
    id: 125,
    unitId: 7,
    unitName: "Political Participation",
    question: "The Twenty-Sixth Amendment lowered the voting age to:",
    options: [
      "21",
      "16",
      "17",
      "18"
    ],
    correctAnswer: "18"
  }
];

// Helper algorithm to shuffle an array securely (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Prepare dataset with dynamically randomized answer choice order
function prepareShuffledQuizData() {
  return MASTER_QUESTIONS.map(q => {
    // Shuffle the four options
    const shuffledOptions = shuffleArray(q.options);
    return {
      ...q,
      shuffledOptions
    };
  });
}

const UNITS = [
  { id: 0, name: "All 125 Questions", range: [1, 125] },
  { id: 1, name: "Unit 1: Foundations", range: [1, 15] },
  { id: 2, name: "Unit 2: The Constitution", range: [16, 30] },
  { id: 3, name: "Unit 3: Federalism", range: [31, 46] },
  { id: 4, name: "Unit 4: Civil Liberties", range: [47, 65] },
  { id: 5, name: "Unit 5: Civil Rights", range: [66, 85] },
  { id: 6, name: "Unit 6: Public Opinion", range: [86, 105] },
  { id: 7, name: "Unit 7: Participation", range: [106, 125] }
];

export default function App() {
  // State for quiz questions with randomized options
  const [quizQuestions, setQuizQuestions] = useState(() => prepareShuffledQuizData());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOptionText }
  const [isCompleted, setIsCompleted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { questionId: boolean }

  // Filtered dataset according to active Unit dropdown
  const filteredQuestions = useMemo(() => {
    if (selectedUnit === 0) return quizQuestions;
    const unitObj = UNITS.find(u => u.id === selectedUnit);
    if (!unitObj) return quizQuestions;
    return quizQuestions.filter(
      q => q.id >= unitObj.range[0] && q.id <= unitObj.range[1]
    );
  }, [quizQuestions, selectedUnit]);

  // Adjust current index if unit selection changes out of bounds
  useEffect(() => {
    setCurrentIdx(0);
  }, [selectedUnit]);

  const currentQuestion = filteredQuestions[currentIdx] || filteredQuestions[0];

  // Reshuffle all options and reset answers
  const handleShuffleAndReset = () => {
    setQuizQuestions(prepareShuffledQuizData());
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  const handleSelectOption = (optionText) => {
    if (!currentQuestion) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionText
    }));
  };

  const toggleFlag = (qId) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Score Calculations
  const totalAnswered = Object.keys(userAnswers).length;
  const correctCount = useMemo(() => {
    return quizQuestions.reduce((count, q) => {
      return userAnswers[q.id] === q.correctAnswer ? count + 1 : count;
    }, 0);
  }, [userAnswers, quizQuestions]);

  const percentageScore = totalAnswered > 0 ? Math.round((correctCount / MASTER_QUESTIONS.length) * 100) : 0;

  // Breakdown score per unit
  const unitBreakdown = useMemo(() => {
    return UNITS.filter(u => u.id !== 0).map(u => {
      const uQuestions = MASTER_QUESTIONS.filter(q => q.id >= u.range[0] && q.id <= u.range[1]);
      const uAnswered = uQuestions.filter(q => userAnswers[q.id] !== undefined);
      const uCorrect = uQuestions.filter(q => userAnswers[q.id] === q.correctAnswer);
      return {
        unitId: u.id,
        name: u.name,
        total: uQuestions.length,
        answered: uAnswered.length,
        correct: uCorrect.length,
        pct: uQuestions.length ? Math.round((uCorrect.length / uQuestions.length) * 100) : 0
      };
    });
  }, [userAnswers]);

  if (!currentQuestion && !isCompleted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center p-6">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-emerald-400" />
          <p className="text-lg">Loading POLS 101 Practice Test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wide">POLS 101 Practice Test</h1>
              <p className="text-xs text-slate-400">125 Questions • Full Trimester Review</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Score Badge */}
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Score: <strong className="text-emerald-400">{correctCount}</strong> / {MASTER_QUESTIONS.length}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{percentageScore}%</span>
            </div>

            {/* Reshuffle & Reset Button */}
            <button
              onClick={handleShuffleAndReset}
              title="Reshuffle option positions & restart test"
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Shuffle & Reset</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="max-w-5xl mx-auto mt-2 bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(totalAnswered / MASTER_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        
        {/* Controls Toolbar: Unit Filter & Direct Jump */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Unit Dropdown Selector */}
          <div className="flex items-center gap-2 flex-1">
            <ListFilter className="w-4 h-4 text-emerald-400 shrink-0" />
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">Unit:</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {UNITS.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} {u.id !== 0 && `(Q${u.range[0]}-${u.range[1]})`}
                </option>
              ))}
            </select>
          </div>

          {/* Jump to Question Number */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 shrink-0">Jump to Q:</span>
            <select
              value={currentIdx}
              onChange={(e) => setCurrentIdx(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors max-w-[140px]"
            >
              {filteredQuestions.map((q, idx) => {
                const isAns = userAnswers[q.id] !== undefined;
                const isRight = userAnswers[q.id] === q.correctAnswer;
                let symbol = isAns ? (isRight ? "✓" : "✗") : "•";
                return (
                  <option key={q.id} value={idx}>
                    Q{q.id} {symbol}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Toggle Summary View Button */}
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-colors border ${
              isCompleted 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 hover:bg-emerald-400' 
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>{isCompleted ? "Back to Quiz Cards" : "View Score Summary"}</span>
          </button>
        </div>

        {/* View Mode: Summary Screen OR Active Question Card */}
        {isCompleted ? (
          /* SUMMARY SCORE & REVIEW SCREEN */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 animate-fadeIn">
            {/* Header Result */}
            <div className="text-center space-y-3">
              <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Trimester Practice Summary</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Review your final unit breakdown and study your missed questions below.
              </p>
            </div>

            {/* Overall Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Score</span>
                <div className="text-3xl font-black text-emerald-400 mt-1">{percentageScore}%</div>
                <span className="text-xs text-slate-400">{correctCount} of {MASTER_QUESTIONS.length} Correct</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completion</span>
                <div className="text-3xl font-black text-indigo-400 mt-1">
                  {Math.round((totalAnswered / MASTER_QUESTIONS.length) * 100)}%
                </div>
                <span className="text-xs text-slate-400">{totalAnswered} of {MASTER_QUESTIONS.length} Answered</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Flagged</span>
                <div className="text-3xl font-black text-amber-400 mt-1">
                  {Object.values(flaggedQuestions).filter(Boolean).length}
                </div>
                <span className="text-xs text-slate-400">Questions Saved for Review</span>
              </div>
            </div>

            {/* Unit Breakdown Bars */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                <span>Unit Performance Breakdown</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unitBreakdown.map(u => (
                  <div key={u.unitId} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-200">{u.name}</span>
                      <span className="font-bold text-emerald-400">{u.correct} / {u.total} ({u.pct}%)</span>
                    </div>
                    <div className="bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${u.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missed Questions List */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Missed & Unanswered Questions Review</span>
              </h3>

              {quizQuestions.filter(q => userAnswers[q.id] !== q.correctAnswer).length === 0 ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-6 rounded-2xl text-center text-sm">
                  🎉 Fantastic job! You have answered all completed questions correctly.
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {quizQuestions
                    .filter(q => userAnswers[q.id] !== q.correctAnswer)
                    .map(q => {
                      const userChoice = userAnswers[q.id];
                      return (
                        <div key={q.id} className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-sm space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                              Question {q.id} • {q.unitName}
                            </span>
                            {flaggedQuestions[q.id] && (
                              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                                <Flag className="w-3 h-3" /> Flagged
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-slate-100">{q.question}</p>
                          <div className="grid grid-cols-1 gap-1.5 text-xs pt-1">
                            <div className="text-rose-400 flex items-center gap-1.5">
                              <X className="w-3.5 h-3.5 shrink-0" />
                              <span>Your Choice: {userChoice || "Unanswered"}</span>
                            </div>
                            <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
                              <Check className="w-3.5 h-3.5 shrink-0" />
                              <span>Correct Answer: {q.correctAnswer}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Back to Quiz Action */}
            <div className="text-center pt-4">
              <button
                onClick={() => setIsCompleted(false)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-emerald-500/20"
              >
                Return to Quiz Drilling
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION CARD DRILLING VIEW */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex-1 flex flex-col justify-between">
            {/* Card Header Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="px-3 py-1 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {currentQuestion.unitName}
                </span>
                
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Question <strong className="text-slate-200">{currentIdx + 1}</strong> of {filteredQuestions.length}</span>
                  <button
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      flaggedQuestions[currentQuestion.id]
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title="Flag question for later review"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQuestion.id}. {currentQuestion.question}
              </h2>
            </div>

            {/* 4 Shuffled Multiple-Choice Options */}
            <div className="grid grid-cols-1 gap-3 my-4">
              {currentQuestion.shuffledOptions.map((optText, index) => {
                const choiceLabel = String.fromCharCode(65 + index); // A, B, C, D
                const userSelected = userAnswers[currentQuestion.id];
                const isSelected = userSelected === optText;
                const isCorrect = optText === currentQuestion.correctAnswer;
                const hasAnswered = userSelected !== undefined;

                // Dynamic Styling for Feedback
                let optionStyle = "bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50";
                let badgeStyle = "bg-slate-800 text-slate-400 border-slate-700";

                if (hasAnswered) {
                  if (isCorrect) {
                    // Correct Answer styling (Green)
                    optionStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-100 shadow-md shadow-emerald-950/20";
                    badgeStyle = "bg-emerald-500 text-slate-950 font-bold border-emerald-400";
                  } else if (isSelected && !isCorrect) {
                    // Incorrect Selected choice styling (Red)
                    optionStyle = "bg-rose-950/40 border-rose-500/80 text-rose-100";
                    badgeStyle = "bg-rose-500 text-white font-bold border-rose-400";
                  } else {
                    // Other unselected options when revealed
                    optionStyle = "bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(optText)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group relative ${optionStyle}`}
                  >
                    {/* Letter Badge (A/B/C/D) */}
                    <span className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}>
                      {choiceLabel}
                    </span>

                    {/* Choice Text */}
                    <span className="flex-1 text-sm sm:text-base pt-0.5 leading-snug">
                      {optText}
                    </span>

                    {/* Answer Status Icon */}
                    {hasAnswered && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Answer Explanation / Status Box */}
            {userAnswers[currentQuestion.id] !== undefined && (
              <div className={`p-4 rounded-2xl border text-sm flex items-start gap-3 ${
                userAnswers[currentQuestion.id] === currentQuestion.correctAnswer
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                {userAnswers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-400 font-semibold">Correct!</strong>
                      <span className="text-xs text-emerald-200/80">Nice work. That matches the official key.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-rose-400 font-semibold">Incorrect</strong>
                      <span className="text-xs text-rose-200/80">
                        The correct answer is: <u className="font-semibold text-white">{currentQuestion.correctAnswer}</u>
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Navigation Bottom Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-400 hidden sm:block">
                Question {currentQuestion.id} / {MASTER_QUESTIONS.length}
              </div>

              <button
                onClick={() => {
                  if (currentIdx < filteredQuestions.length - 1) {
                    setCurrentIdx(prev => prev + 1);
                  } else {
                    setIsCompleted(true);
                  }
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/10"
              >
                <span>{currentIdx === filteredQuestions.length - 1 ? "Finish Test" : "Next Question"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-900 bg-slate-950">
        POLS 101 Trimester Practice Quiz Engine • Answer positions dynamically shuffled on reset
      </footer>
    </div>
  );
}